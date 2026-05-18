import sqlite3
import os
from datetime import datetime, timedelta

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "bot_data.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY,
            username TEXT,
            first_name TEXT,
            registered_at TEXT NOT NULL,
            vip_until TEXT,
            is_vip INTEGER DEFAULT 0,
            trial_used INTEGER DEFAULT 0,
            stories_today INTEGER DEFAULT 0,
            last_story_date TEXT,
            lang TEXT DEFAULT ''
        )
    """)
    try:
        conn.execute("ALTER TABLE users ADD COLUMN lang TEXT DEFAULT ''")
    except Exception:
        pass
    conn.commit()
    conn.close()


def register_user(user_id: int, username: str, first_name: str) -> dict:
    conn = get_db()
    now = datetime.utcnow().isoformat()
    trial_end = (datetime.utcnow() + timedelta(days=3)).isoformat()

    existing = conn.execute("SELECT * FROM users WHERE user_id = ?", (user_id,)).fetchone()
    if existing:
        conn.close()
        return dict(existing)

    conn.execute(
        "INSERT INTO users (user_id, username, first_name, registered_at, vip_until, is_vip, trial_used) "
        "VALUES (?, ?, ?, ?, ?, 1, 0)",
        (user_id, username or "", first_name or "", now, trial_end),
    )
    conn.commit()
    user = conn.execute("SELECT * FROM users WHERE user_id = ?", (user_id,)).fetchone()
    conn.close()
    return dict(user)


def get_user(user_id: int) -> dict | None:
    conn = get_db()
    row = conn.execute("SELECT * FROM users WHERE user_id = ?", (user_id,)).fetchone()
    conn.close()
    return dict(row) if row else None


def is_vip(user_id: int) -> bool:
    user = get_user(user_id)
    if not user:
        return False
    if not user["is_vip"]:
        return False
    if user["vip_until"]:
        vip_end = datetime.fromisoformat(user["vip_until"])
        if datetime.utcnow() > vip_end:
            conn = get_db()
            conn.execute("UPDATE users SET is_vip = 0 WHERE user_id = ?", (user_id,))
            conn.commit()
            conn.close()
            return False
    return True


def get_vip_remaining(user_id: int) -> str:
    user = get_user(user_id)
    if not user or not user["vip_until"]:
        return "Sem VIP"
    vip_end = datetime.fromisoformat(user["vip_until"])
    remaining = vip_end - datetime.utcnow()
    if remaining.total_seconds() <= 0:
        return "Expirado"
    days = remaining.days
    hours = remaining.seconds // 3600
    if days > 0:
        return f"{days}d {hours}h"
    return f"{hours}h"


def activate_vip(user_id: int, days: int = 30):
    conn = get_db()
    now = datetime.utcnow()
    user = get_user(user_id)

    if user and user["vip_until"]:
        current_end = datetime.fromisoformat(user["vip_until"])
        if current_end > now:
            new_end = current_end + timedelta(days=days)
        else:
            new_end = now + timedelta(days=days)
    else:
        new_end = now + timedelta(days=days)

    conn.execute(
        "UPDATE users SET is_vip = 1, vip_until = ?, trial_used = 1 WHERE user_id = ?",
        (new_end.isoformat(), user_id),
    )
    conn.commit()
    conn.close()


def increment_story_count(user_id: int) -> int:
    conn = get_db()
    today = datetime.utcnow().strftime("%Y-%m-%d")
    user = get_user(user_id)

    if not user:
        conn.close()
        return 0

    if user["last_story_date"] != today:
        conn.execute(
            "UPDATE users SET stories_today = 1, last_story_date = ? WHERE user_id = ?",
            (today, user_id),
        )
        conn.commit()
        conn.close()
        return 1
    else:
        new_count = (user["stories_today"] or 0) + 1
        conn.execute(
            "UPDATE users SET stories_today = ? WHERE user_id = ?",
            (new_count, user_id),
        )
        conn.commit()
        conn.close()
        return new_count


def get_story_count(user_id: int) -> int:
    user = get_user(user_id)
    if not user:
        return 0
    today = datetime.utcnow().strftime("%Y-%m-%d")
    if user["last_story_date"] != today:
        return 0
    return user["stories_today"] or 0


def set_lang(user_id: int, lang: str):
    conn = get_db()
    conn.execute("UPDATE users SET lang = ? WHERE user_id = ?", (lang, user_id))
    conn.commit()
    conn.close()


def get_lang(user_id: int) -> str:
    user = get_user(user_id)
    if not user:
        return ""
    return user.get("lang", "") or ""


def revoke_vip(user_id: int):
    conn = get_db()
    conn.execute("UPDATE users SET is_vip = 0, vip_until = NULL WHERE user_id = ?", (user_id,))
    conn.commit()
    conn.close()


def get_stats() -> dict:
    conn = get_db()
    today = datetime.utcnow().strftime("%Y-%m-%d")
    total = conn.execute("SELECT COUNT(*) FROM users").fetchone()[0]
    vip_count = conn.execute(
        "SELECT COUNT(*) FROM users WHERE is_vip = 1 AND (vip_until IS NULL OR vip_until > ?)",
        (datetime.utcnow().isoformat(),),
    ).fetchone()[0]
    active_today = conn.execute(
        "SELECT COUNT(*) FROM users WHERE last_story_date = ?", (today,)
    ).fetchone()[0]
    stories_today = conn.execute(
        "SELECT SUM(stories_today) FROM users WHERE last_story_date = ?", (today,)
    ).fetchone()[0] or 0
    new_today = conn.execute(
        "SELECT COUNT(*) FROM users WHERE registered_at LIKE ?", (f"{today}%",)
    ).fetchone()[0]
    conn.close()
    return {
        "total": total,
        "vip": vip_count,
        "free": total - vip_count,
        "active_today": active_today,
        "stories_today": stories_today,
        "new_today": new_today,
    }


def get_all_users(limit: int = 50, offset: int = 0) -> list:
    conn = get_db()
    rows = conn.execute(
        "SELECT user_id, username, first_name, is_vip, vip_until, stories_today, last_story_date, registered_at "
        "FROM users ORDER BY registered_at DESC LIMIT ? OFFSET ?",
        (limit, offset),
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_total_users() -> int:
    conn = get_db()
    total = conn.execute("SELECT COUNT(*) FROM users").fetchone()[0]
    conn.close()
    return total


# ─── Series ───────────────────────────────────────────────────────────

def init_series_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS user_series (
            user_id INTEGER PRIMARY KEY,
            hero_name TEXT NOT NULL,
            hero_desc TEXT NOT NULL,
            ally_name TEXT NOT NULL,
            ally_desc TEXT NOT NULL,
            genre TEXT NOT NULL,
            setting TEXT NOT NULL,
            episode INTEGER DEFAULT 1,
            last_summary TEXT DEFAULT '',
            updated_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()


def get_series(user_id: int) -> dict | None:
    conn = get_db()
    row = conn.execute("SELECT * FROM user_series WHERE user_id = ?", (user_id,)).fetchone()
    conn.close()
    return dict(row) if row else None


def save_series(user_id: int, hero_name: str, hero_desc: str, ally_name: str, ally_desc: str,
                genre: str, setting: str, episode: int, last_summary: str):
    conn = get_db()
    now = datetime.utcnow().isoformat()
    conn.execute(
        "INSERT OR REPLACE INTO user_series "
        "(user_id, hero_name, hero_desc, ally_name, ally_desc, genre, setting, episode, last_summary, updated_at) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (user_id, hero_name, hero_desc, ally_name, ally_desc, genre, setting, episode, last_summary, now),
    )
    conn.commit()
    conn.close()


def delete_series(user_id: int):
    conn = get_db()
    conn.execute("DELETE FROM user_series WHERE user_id = ?", (user_id,))
    conn.commit()
    conn.close()


# ─── Pagamentos ────────────────────────────────────────────────────────

def init_payments_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS payments (
            payment_id TEXT PRIMARY KEY,
            user_id INTEGER NOT NULL,
            method TEXT NOT NULL,
            amount REAL NOT NULL,
            vip_days INTEGER NOT NULL DEFAULT 30,
            payment_code TEXT,
            confirmed INTEGER DEFAULT 0,
            created_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()


def create_payment(payment_id: str, user_id: int, method: str, amount: float, vip_days: int = 30, payment_code: str = ""):
    conn = get_db()
    now = datetime.utcnow().isoformat()
    conn.execute(
        "INSERT OR REPLACE INTO payments (payment_id, user_id, method, amount, vip_days, payment_code, confirmed, created_at) "
        "VALUES (?, ?, ?, ?, ?, ?, 0, ?)",
        (payment_id, user_id, method, amount, vip_days, payment_code, now),
    )
    conn.commit()
    conn.close()


def get_pending_payment_by_id(payment_id: str) -> dict | None:
    conn = get_db()
    row = conn.execute(
        "SELECT * FROM payments WHERE payment_id = ? AND confirmed = 0", (payment_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def confirm_payment(payment_id: str):
    conn = get_db()
    conn.execute("UPDATE payments SET confirmed = 1 WHERE payment_id = ?", (payment_id,))
    conn.commit()
    conn.close()


def get_pending_ton_payments() -> list:
    conn = get_db()
    rows = conn.execute(
        "SELECT * FROM payments WHERE method = 'ton' AND confirmed = 0"
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]
