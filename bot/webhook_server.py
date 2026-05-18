import os
import json
import hmac
import hashlib
import asyncio
from aiohttp import web
from database import get_pending_payment_by_id, confirm_payment, activate_vip
from payments import get_payment_status

MP_ACCESS_TOKEN = os.environ.get("MP_ACCESS_TOKEN", "")
WEBHOOK_PORT = int(os.environ.get("WEBHOOK_PORT", "8080"))


async def handle_mp_webhook(request: web.Request) -> web.Response:
    try:
        body = await request.text()
        data = json.loads(body) if body else {}

        topic = data.get("type") or request.rel_url.query.get("type", "")
        resource_id = data.get("data", {}).get("id") or request.rel_url.query.get("id", "")

        if topic not in ("payment", "merchant_order") or not resource_id:
            return web.Response(status=200, text="ok")

        status = get_payment_status(str(resource_id))
        if status != "approved":
            return web.Response(status=200, text="ok")

        payment = get_pending_payment_by_id(str(resource_id))
        if not payment or payment.get("confirmed"):
            return web.Response(status=200, text="ok")

        confirm_payment(payment["payment_id"])
        activate_vip(payment["user_id"], payment["vip_days"])

        bot = request.app.get("bot")
        if bot:
            asyncio.create_task(_notify_user(bot, payment))

    except Exception as e:
        print(f"Webhook error: {e}")

    return web.Response(status=200, text="ok")


async def _notify_user(bot, payment: dict):
    try:
        await bot.send_message(
            payment["user_id"],
            "🎉 *Pagamento Pix confirmado!*\n\n"
            f"✅ Seu VIP de *{payment['vip_days']} dias* foi ativado!\n\n"
            "Aproveite todos os beneficios exclusivos 👑\n"
            "Use /meupainel para ver seu status.",
            parse_mode="Markdown",
        )
    except Exception:
        pass


async def handle_healthz(request: web.Request) -> web.Response:
    return web.Response(status=200, text="ok")


def create_app(bot=None) -> web.Application:
    app = web.Application()
    app["bot"] = bot
    app.router.add_post("/webhook/mp", handle_mp_webhook)
    app.router.add_get("/healthz", handle_healthz)
    return app


async def start_webhook_server(bot=None):
    app = create_app(bot)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", WEBHOOK_PORT)
    await site.start()
    print(f"Webhook server rodando na porta {WEBHOOK_PORT}")
