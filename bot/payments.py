import os
import mercadopago

MP_ACCESS_TOKEN = os.environ.get("MP_ACCESS_TOKEN", "")
VIP_DAYS = 30
VIP_AMOUNT = 19.90


def is_configured() -> bool:
    return bool(MP_ACCESS_TOKEN)


def _sdk():
    return mercadopago.SDK(MP_ACCESS_TOKEN)


def create_pix_payment(user_id: int, first_name: str) -> dict | None:
    if not MP_ACCESS_TOKEN:
        return None

    sdk = _sdk()
    payment_data = {
        "transaction_amount": VIP_AMOUNT,
        "description": "VIP Anime Bot - 30 dias",
        "payment_method_id": "pix",
        "payer": {
            "email": f"user{user_id}@animebot.com",
            "first_name": (first_name or "User")[:25],
        },
        "metadata": {
            "telegram_user_id": str(user_id),
            "vip_days": VIP_DAYS,
        },
        "notification_url": _webhook_url(),
    }

    result = sdk.payment().create(payment_data)
    if result["status"] != 201:
        return None

    data = result["response"]
    tx = data.get("point_of_interaction", {}).get("transaction_data", {})
    return {
        "payment_id": str(data["id"]),
        "qr_code": tx.get("qr_code", ""),
        "qr_code_base64": tx.get("qr_code_base64", ""),
        "amount": VIP_AMOUNT,
        "vip_days": VIP_DAYS,
        "status": data.get("status", "pending"),
    }


def get_payment_status(payment_id: str) -> str:
    if not MP_ACCESS_TOKEN:
        return "unknown"
    sdk = _sdk()
    result = sdk.payment().get(payment_id)
    if result["status"] != 200:
        return "unknown"
    return result["response"].get("status", "unknown")


def _webhook_url() -> str:
    domains = os.environ.get("REPLIT_DOMAINS", "")
    if domains:
        domain = domains.split(",")[0].strip()
        return f"https://{domain}/webhook/mp"
    return ""
