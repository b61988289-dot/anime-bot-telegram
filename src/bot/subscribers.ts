import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(__dirname, "../../../data/subscribers.json");

export interface Subscriber {
  telegramId: string;
  username: string;
  firstName: string;
  isVip: boolean;
  vipExpiresAt: string | null;
  language: string;
}

type DB = Record<string, Subscriber>;

function load(): DB {
  try {
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
    if (fs.existsSync(FILE)) {
      return JSON.parse(fs.readFileSync(FILE, "utf8")) as DB;
    }
  } catch {}
  return {};
}

function save(db: DB) {
  try {
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(db, null, 2), "utf8");
  } catch {}
}

let DB: DB = load();

export function register(user: {
  id: number;
  username?: string;
  first_name?: string;
}) {
  const id = String(user.id);
  if (!DB[id]) {
    DB[id] = {
      telegramId: id,
      username: user.username ?? "",
      firstName: user.first_name ?? "",
      isVip: false,
      vipExpiresAt: null,
      language: "PT-BR",
    };
    save(DB);
  }
  return DB[id]!;
}

export function getSubscriber(telegramId: string): Subscriber | undefined {
  return DB[telegramId];
}

export function isVip(telegramId: string): boolean {
  const s = DB[telegramId];
  if (!s?.isVip) return false;
  if (s.vipExpiresAt && new Date(s.vipExpiresAt) < new Date()) {
    s.isVip = false;
    s.vipExpiresAt = null;
    save(DB);
    return false;
  }
  return true;
}

export function setVip(telegramId: string, active: boolean) {
  if (!DB[telegramId]) {
    DB[telegramId] = {
      telegramId,
      username: "",
      firstName: "",
      isVip: false,
      vipExpiresAt: null,
      language: "PT-BR",
    };
  }
  const expires = active
    ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    : null;
  DB[telegramId]!.isVip = active;
  DB[telegramId]!.vipExpiresAt = expires;
  save(DB);
}

export function setLanguage(telegramId: string, lang: string) {
  if (DB[telegramId]) {
    DB[telegramId]!.language = lang;
    save(DB);
  }
}

export function getLanguage(telegramId: string): string {
  return DB[telegramId]?.language ?? "PT-BR";
}

export function allSubscribers(): DB {
  return DB;
}

export function stats() {
  const subs = Object.values(DB);
  return {
    total: subs.length,
    vip: subs.filter((s) => s.isVip).length,
  };
}
