import asyncio
import aiohttp
import os
from database import get_pending_ton_payments, confirm_payment, activate_vip

TON_ADDRESS = os.environ.get("TON_WALLET_ADDRESS", "UQDn8qu6wduopti68NN9aFjJ0ORN8diPtuUMuR8_7tQG7lai")
TON_AMOUNT_NAN = 5 * 1_000_000_000
TONCENTER_API = "https://toncenter.com/api/v2/getTransactions"
CHECK_INTERVAL = 60


async def fetch_recent_transactions(session: aiohttp.ClientSession) -> list:
    try:
        params = {"address": TON_ADDRESS, "limit": 30}
        async with session.get(TONCENTER_API, params=params, timeout=aiohttp.ClientTimeout(total=15)) as r:
            if r.status != 200:
                return []
            data = await r.json()
            return data.get("result", [])
    except Exception:
        return []


def _extract_comment(tx: dict) -> str:
    try:
        msg = tx.get("in_msg", {})
        b64 = msg.get("msg_data", {}).get("text", "")
        if b64:
            import base64
            return base64.b64decode(b64).decode("utf-8", errors="ignore").strip()
    except Exception:
        pass
    return ""


def _extract_amount(tx: dict) -> int:
    try:
        return int(tx.get("in_msg", {}).get("value", 0))
    except Exception:
        return 0


async def check_ton_payments(bot):
    async with aiohttp.ClientSession() as session:
        while True:
            try:
                pending = get_pending_ton_payments()
                if pending:
                    txs = await fetch_recent_transactions(session)
                    for tx in txs:
                        comment = _extract_comment(tx)
                        amount = _extract_amount(tx)

                        if amount < TON_AMOUNT_NAN:
                            continue

                        for payment in pending:
                            if payment["payment_code"] in comment:
                                confirm_payment(payment["payment_id"])
                                activate_vip(payment["user_id"], payment["vip_days"])

                                try:
                                    await bot.send_message(
                                        payment["user_id"],
                                        "🎉 *Pagamento TON confirmado!*\n\n"
                                        f"✅ Recebemos *{payment['vip_days']} dias* de VIP!\n\n"
                                        "Aproveite todos os beneficios exclusivos 👑\n"
                                        "Use /meupainel para ver seu status.",
                                        parse_mode="Markdown",
                                    )
                                except Exception:
                                    pass
                                break
            except Exception:
                pass

            await asyncio.sleep(CHECK_INTERVAL)
