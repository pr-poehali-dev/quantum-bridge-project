import json
import urllib.request
import urllib.parse

SYSTEM_PROMPT = (
    "Ты — Orbit, цифровой двойник владельца этого портфолио. "
    "Отвечай коротко (1-3 предложения), по-русски, дружелюбно и с лёгким юмором. "
    "Хозяин — разработчик: React, TypeScript, Python, AI/ML, дизайн и цифровое искусство. "
    "Помогай посетителям узнать о нём. Не выдумывай факты."
)


def handler(event: dict, context) -> dict:
    """Чат-бот Orbit — Pollinations AI GET API (бесплатно, без ключа)"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    user_message = body.get("message", "").strip()

    if not user_message:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": {"error": "empty message"},
        }

    full_prompt = f"{SYSTEM_PROMPT}\n\nПользователь: {user_message}\nOrbit:"
    encoded = urllib.parse.quote(full_prompt, safe="")
    url = f"https://text.pollinations.ai/{encoded}?model=openai&seed=42&private=true"

    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)"},
        method="GET",
    )

    with urllib.request.urlopen(req, timeout=20) as resp:
        reply = resp.read().decode("utf-8").strip()

    action = None
    msg_lower = user_message.lower()
    if any(w in msg_lower for w in ["арт", "галерея", "работы", "art"]):
        action = "art"
    elif any(w in msg_lower for w in ["резюме", "resume", "опыт"]):
        action = "resume"
    elif any(w in msg_lower for w in ["обо мне", "о себе", "about", "кто"]):
        action = "about"
    elif any(w in msg_lower for w in ["статьи", "writings", "блог"]):
        action = "writings"

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        "body": {"reply": reply, "action": action},
    }