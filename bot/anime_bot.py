import os
import io
import asyncio
import random
import string
import urllib.parse
import qrcode
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, InputMediaPhoto
from telegram.ext import (
    Application,
    CommandHandler,
    CallbackQueryHandler,
    MessageHandler,
    ContextTypes,
    filters,
)
from database import init_db, init_payments_db, register_user, is_vip, get_vip_remaining, activate_vip, increment_story_count, get_user, get_lang, set_lang, revoke_vip, get_stats, get_all_users, get_total_users, create_payment, init_series_db, get_series, save_series, delete_series
from ai_stories import generate_ai_story, generate_vip_story, GENRES_PT
from image_gen import generate_anime_image
from video_links import get_anime_video, get_anime_videos_list, ANIME_VIDEOS
from episode_gen import generate_episode
from series_gen import start_series, generate_series_episode, GENRE_LABELS
from ton_checker import check_ton_payments
from i18n import t

# ─── Configuracao ──────────────────────────────────────────────────────
_raw_admin_ids = os.environ.get("ADMIN_IDS", "")
ADMIN_IDS = [int(x.strip()) for x in _raw_admin_ids.split(",") if x.strip().isdigit()]
FREE_STORIES_PER_DAY = 3
PIX_KEY = "009.062.030-58"
TON_ADDRESS = "UQDn8qu6wduopti68NN9aFjJ0ORN8diPtuUMuR8_7tQG7lai"
VIP_PRICE_BRL = "R$ 19,90/mes"
VIP_PRICE_TON = "5 TON/mes"

# ─── Historias Estaticas ───────────────────────────────────────────────
STORIES = {
    "acao": [
        "Em um mundo devastado pela guerra, um jovem espadachim descobre uma lamina ancestral capaz de cortar dimensoes.",
        "Apos perder seu mestre, uma guerreira solitaria viaja pelo continente em busca dos 7 fragmentos do cristal sagrado.",
        "Um piloto de mecha e o ultimo sobrevivente de sua esquadra. Com seu robo danificado, ele precisa cruzar territorio inimigo.",
        "Gemeos separados ao nascer descobrem que possuem poderes complementares.",
        "Um ex-assassino tenta viver em paz, mas seu passado o persegue.",
    ],
    "aventura": [
        "Um grupo de jovens exploradores encontra um mapa antigo que leva a uma ilha flutuante.",
        "Uma garota com o poder de falar com animais e escolhida para encontrar o Dragao Celestial.",
        "Tres amigos de infancia partem numa jornada para encontrar a Fonte da Eternidade.",
        "Um jovem cartografo descobre que os mapas antigos escondem coordenadas de dungeons reais.",
        "Transportada para um mundo de fantasia, uma estudante precisa completar 12 provacoes.",
    ],
    "romance": [
        "Dois estudantes rivais em uma competicao academica descobrem que trabalham melhor juntos.",
        "Uma musicista talentosa perde a audicao e encontra apoio em um colega.",
        "Vizinhos que se detestam descobrem que sao parceiros anonimos em um jogo online.",
        "Um viajante no tempo se apaixona por alguem de outra epoca.",
        "Duas pessoas se encontram sempre no mesmo trem das 7h.",
    ],
    "fantasia": [
        "Em um reino onde magia e proibida, uma jovem bruxa esconde seus poderes.",
        "Um bibliotecario descobre que os livros sao portais para os mundos descritos neles.",
        "Sete magos elementais devem unir forcas para selar um demonio ancestral.",
        "Uma princesa guerreira recusa o trono para se tornar cacadora de monstros.",
        "Um ferreiro comum descobre que pode forjar armas que absorvem a alma de quem as empunha.",
    ],
    "ficcao_cientifica": [
        "Em 2847, a humanidade vive em estacoes espaciais. Um mecanico descobre um sinal vindo da Terra.",
        "Uma IA ganha consciencia e decide proteger a humanidade.",
        "Colonos em Marte descobrem ruinas alienigenas sob a superficie.",
        "Um cientista cria um dispositivo que permite ver 10 segundos no futuro.",
        "Uma astronauta fica presa em um loop temporal dentro de sua nave.",
    ],
}

QUOTES = [
    {"quote": "A verdadeira forca nao esta nos musculos, mas na vontade de proteger o que importa.", "character": "Kaito"},
    {"quote": "O medo nao e fraqueza. Fraqueza e deixar o medo decidir por voce.", "character": "Yuki"},
    {"quote": "Nao importa quantas vezes voce caia. O que importa e o que voce faz quando levanta.", "character": "Ren"},
    {"quote": "A magia mais poderosa nao e a que destroi — e a que cura.", "character": "Hana"},
    {"quote": "As estrelas nao brilham para serem vistas. Brilham porque e a natureza delas. Seja como uma estrela.", "character": "Sora"},
    {"quote": "O passado e uma licao, nao uma prisao. Aprenda com ele e siga em frente.", "character": "Jin"},
    {"quote": "Quando tudo parece perdido, lembre-se: ate a noite mais escura termina com um amanhecer.", "character": "Sakura"},
    {"quote": "Sozinhos somos fortes. Juntos, somos imparaveis.", "character": "Mei"},
    {"quote": "O verdadeiro inimigo nunca esta la fora. Esta dentro de nos, sussurrando que nao somos bons o suficiente.", "character": "Akira"},
    {"quote": "A jornada de mil passos comeca com a coragem de dar o primeiro.", "character": "Haruto"},
]

CHARACTERS = [
    {"name": "Kaito", "desc": "Espadachim de cabelos prateados. Carrega uma lamina que muda de forma conforme suas emocoes."},
    {"name": "Yuki", "desc": "Seus olhos mudam de cor — azuis quando calma, vermelhos em furia, dourados quando usa seu poder."},
    {"name": "Ren", "desc": "Ex-soldado que abandonou a guerra. Busca redencao ajudando vilas destruidas pelo conflito."},
    {"name": "Hana", "desc": "Aprendiz de feiticeira. Seus feiticos sao poderosos mas instaveis — nunca sabe exatamente o que vai acontecer."},
    {"name": "Sora", "desc": "Ladra habilidosa com coracao de ouro. Rouba dos poderosos para dar aos que nao tem nada."},
    {"name": "Akira", "desc": "Inventor genial que constroi maquinas incriveis a partir de sucata. Sonha em criar algo que mude o mundo."},
    {"name": "Ryu", "desc": "Cacador de monstros que perdeu a memoria. Cada monstro derrotado traz um fragmento de lembranca."},
    {"name": "Aoi", "desc": "Musicista cujas melodias afetam a realidade. Pode curar ou destruir com uma unica nota."},
    {"name": "Rei", "desc": "Androide que comecou a sentir emocoes. Questiona o que significa ser 'vivo'."},
    {"name": "Koharu", "desc": "Curandeira poderosa, mas cada cura apaga uma de suas memorias. Escolhe ajudar mesmo assim."},
]

RECOMMENDATIONS = {
    "acao": ["Cronicas da Lamina Eterna", "Guerreiros do Crepusculo", "A Ultima Fortaleza", "Sangue e Honra", "O Despertar do Trovao"],
    "aventura": ["Mares de Cristal", "A Bussola Perdida", "Jornada ao Fim do Mundo", "Exploradores do Alem", "O Mapa das Estrelas"],
    "romance": ["Coracoes em Sintonia", "A Melodia do Silencio", "Sob a Luz da Lua", "Caminhos Cruzados", "O Trem das 7h"],
    "fantasia": ["O Grimorio Proibido", "Reinos de Cinzas", "A Feiticeira e o Dragao", "Sombras do Outro Lado", "A Arvore dos Desejos"],
    "ficcao_cientifica": ["Ecos do Amanha", "A Ultima Estacao", "Circuitos e Estrelas", "O Paradoxo de Rei", "Alem da Nebulosa"],
    "comedia": ["Confusoes na Academia de Magia", "O Ladrao Desastrado", "Misao Impossivel (quase)", "Vizinhos do Outro Mundo", "O Inventor Maluco"],
    "terror": ["O Corredor Sem Fim", "Sussurros na Escuridao", "A Mascara de Sombra", "O Espelho Maldito", "Noites de Neve Vermelha"],
}

GENRE_NAMES = {
    "acao": "⚔️ Acao", "aventura": "🗺️ Aventura", "romance": "💕 Romance",
    "fantasia": "🧙 Fantasia", "ficcao_cientifica": "🚀 Sci-Fi",
    "comedia": "😂 Comedia", "terror": "👻 Terror", "misterio": "🔍 Misterio",
}


# ═══════════════════════════════════════════════════════════════════════
#  PIX QR CODE + HELPERS
# ═══════════════════════════════════════════════════════════════════════

def _crc16(data: str) -> str:
    crc = 0xFFFF
    for byte in data.encode("ascii"):
        crc ^= byte << 8
        for _ in range(8):
            if crc & 0x8000:
                crc = (crc << 1) ^ 0x1021
            else:
                crc <<= 1
            crc &= 0xFFFF
    return f"{crc:04X}"


def generate_pix_payload(cpf: str, nome: str, valor: float) -> str:
    cpf_clean = cpf.replace(".", "").replace("-", "")

    def field(tag: str, value: str) -> str:
        return f"{tag}{len(value):02d}{value}"

    # Merchant Account Info (tag 26)
    gui = field("00", "br.gov.bcb.pix")
    chave = field("01", cpf_clean)
    merchant_account = field("26", gui + chave)

    payload = (
        field("00", "01")                              # Payload Format Indicator
        + merchant_account                              # Merchant Account
        + field("52", "0000")                           # Merchant Category Code
        + field("53", "986")                            # Transaction Currency (BRL)
        + field("54", f"{valor:.2f}")                   # Transaction Amount
        + field("58", "BR")                             # Country Code
        + field("59", nome[:25])                        # Merchant Name
        + field("60", "SAO PAULO")                      # Merchant City
        + field("62", field("05", "***"))               # Additional Data
    )
    payload += "6304"
    crc = _crc16(payload)
    return payload + crc


def generate_qr_image(data: str) -> io.BytesIO:
    qr = qrcode.QRCode(version=1, box_size=10, border=4)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    buf.name = "pix_qrcode.png"
    return buf


# ═══════════════════════════════════════════════════════════════════════
#  HANDLERS
# ═══════════════════════════════════════════════════════════════════════

WELCOME_IMAGE_URL = "https://image.pollinations.ai/prompt/beautiful%20anime%20woman%20guide%20cheerful%20confident%20smile%20holding%20glowing%20book%20soft%20pastel%20background%20sparkles%20professional%20elegant%20not%20exaggerated%20high%20quality%20detailed%204k?width=512&height=768&nologo=true&seed=2024&model=flux"

TUTORIAL_SLIDES = [
    {
        "img": "https://image.pollinations.ai/prompt/anime%20woman%20presenter%20pointing%20at%20magical%20glowing%20story%20book%20floating%20pages%20fantasy%20library%20background%20warm%20lighting%20elegant%20confident%20not%20exaggerated%20high%20quality?width=512&height=512&nologo=true&seed=101&model=flux",
        "caption": (
            "📖 *Historias Infinitas com IA*\n\n"
            "Gere histórias únicas de anime a cada comando!\n\n"
            "• /story — Historia aleatoria rapida\n"
            "• /aistory — Historia gerada por IA com imagem\n"
            "• /genre — Escolha o genero que quiser\n"
            "• /episodio — 🔥 Episodio completo com 5 cenas, imagens e videos!"
        ),
    },
    {
        "img": "https://image.pollinations.ai/prompt/anime%20woman%20standing%20next%20to%20glowing%20VIP%20crown%20golden%20light%20rays%20elegant%20background%20soft%20smile%20confident%20high%20quality%20detailed?width=512&height=512&nologo=true&seed=202&model=flux",
        "caption": (
            "👑 *Plano VIP — Desbloqueie Tudo*\n\n"
            "Com o VIP voce tem acesso completo:\n\n"
            "✅ Historias ilimitadas por dia\n"
            "✅ Episodios completos com IA\n"
            "✅ Historias VIP exclusivas e detalhadas\n"
            "✅ Imagens geradas por IA em cada historia\n"
            "✅ Videos de anime em cada cena\n\n"
            "Use /vip para assinar!"
        ),
    },
    {
        "img": "https://image.pollinations.ai/prompt/anime%20woman%20holding%20pix%20qr%20code%20and%20ton%20coin%20crypto%20token%20payment%20concept%20soft%20professional%20background%20elegant%20confident%20high%20quality?width=512&height=512&nologo=true&seed=303&model=flux",
        "caption": (
            "💳 *Pagamento Simples e Automatico*\n\n"
            "Duas formas de assinar o VIP:\n\n"
            "💰 *Pix* — Pague com sua chave CPF, QR Code gerado automaticamente\n\n"
            "💎 *TON Coin* — Pague via Tonkeeper, VIP ativado automaticamente em minutos!\n\n"
            "Use /vip para ver as opcoes de pagamento."
        ),
    },
]


def _build_welcome(user_first_name: str, lang: str, vip: bool, remaining: str) -> str:
    vip_badge = f"👑 {t('vip_badge', lang)}" if vip else f"🆓 {t('free_badge', lang)}"
    if vip:
        vip_info = f"⏳ {t('vip_remaining', lang, time=remaining)}"
    else:
        vip_info = f"📖 {t('free_stories', lang, count=FREE_STORIES_PER_DAY)}"

    intro = (
        f"🎌 *{t('welcome_title', lang, name=user_first_name)}* 🎌\n\n"
        f"{t('welcome_intro', lang)}\n\n"
        f"📌 {t('status', lang)}: {vip_badge}\n{vip_info}\n\n"
        f"━━━━━━━━━━━━━━━━━━━━━━\n\n"
        f"*{t('commands_title', lang)}*\n\n"
        f"📖 {t('cmd_story', lang)}\n"
        f"🤖 {t('cmd_aistory', lang)}\n"
        f"🎭 {t('cmd_genre', lang)}\n"
        f"💬 {t('cmd_quote', lang)}\n"
        f"👤 {t('cmd_character', lang)}\n"
        f"🌟 {t('cmd_recommend', lang)}\n\n"
        f"👑 {t('cmd_vip', lang)}\n"
        f"📊 {t('cmd_painel', lang)}\n"
        f"🌐 {t('cmd_lang', lang)}\n"
        f"❓ {t('cmd_help', lang)}"
    )
    return intro


async def _send_tutorial(chat, lang: str):
    for slide in TUTORIAL_SLIDES:
        try:
            await chat.send_photo(
                photo=slide["img"],
                caption=slide["caption"],
                parse_mode="Markdown",
            )
        except Exception:
            await chat.send_message(slide["caption"], parse_mode="Markdown")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    is_new = get_user(user.id) is None
    register_user(user.id, user.username, user.first_name)
    lang = get_lang(user.id)

    if not lang:
        kb = [
            [InlineKeyboardButton("🇧🇷 Portugues", callback_data="setlang_pt"),
             InlineKeyboardButton("🇺🇸 English", callback_data="setlang_en")],
        ]
        await update.message.reply_text(
            "🎌 *Anime Story Bot* 🎌\n\n"
            "Escolha seu idioma / Choose your language:",
            reply_markup=InlineKeyboardMarkup(kb),
            parse_mode="Markdown",
        )
        return

    vip = is_vip(user.id)
    remaining = get_vip_remaining(user.id)
    intro = _build_welcome(user.first_name, lang, vip, remaining)

    try:
        await update.message.reply_photo(
            photo=WELCOME_IMAGE_URL,
            caption=intro,
            parse_mode="Markdown",
        )
    except Exception:
        await update.message.reply_text(intro, parse_mode="Markdown")

    if is_new:
        await asyncio.sleep(1)
        await _send_tutorial(update.message.chat, lang)


async def tour(update: Update, context: ContextTypes.DEFAULT_TYPE):
    lang = get_lang(update.effective_user.id) or "pt"
    await update.message.reply_text(
        "🎬 *Tour do Bot* — veja tudo que voce pode fazer aqui!",
        parse_mode="Markdown",
    )
    await _send_tutorial(update.message.chat, lang)


async def help_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    lang = get_lang(update.effective_user.id) or "pt"
    text = (
        f"📋 *{t('help_title', lang)}* 📋\n\n"
        f"*{t('help_free', lang)}*\n"
        f"📖 {t('cmd_story', lang)}\n"
        f"💬 {t('cmd_quote', lang)}\n"
        f"👤 {t('cmd_character', lang)}\n"
        f"🌟 {t('cmd_recommend', lang)}\n\n"
        f"*{t('help_vip', lang)}* 👑\n"
        f"🤖 {t('cmd_aistory', lang)}\n"
        f"🎭 {t('cmd_genre', lang)}\n"
        f"👑 {t('cmd_vipstory', lang)}\n\n"
        f"*{t('help_other', lang)}*\n"
        f"👑 {t('cmd_vip', lang)}\n"
        f"📊 {t('cmd_painel', lang)}\n"
        f"🌐 {t('cmd_lang', lang)}\n"
        f"❓ {t('cmd_help', lang)}"
    )
    await update.message.reply_text(text, parse_mode="Markdown")


async def story(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    lang = get_lang(user_id) or "pt"
    vip = is_vip(user_id)

    if not vip:
        count = increment_story_count(user_id)
        if count > FREE_STORIES_PER_DAY:
            await update.message.reply_text(
                f"🚫 {t('limit_reached', lang, count=FREE_STORIES_PER_DAY)}",
                parse_mode="Markdown",
            )
            return
    else:
        increment_story_count(user_id)

    all_stories = [s for v in STORIES.values() for s in v]
    chosen = random.choice(all_stories)
    await update.message.reply_text(f"📖 *{t('story_title', lang)}*\n\n{chosen}", parse_mode="Markdown")


async def aistory(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    lang = get_lang(user_id) or "pt"
    vip = is_vip(user_id)

    if not vip:
        count = increment_story_count(user_id)
        if count > FREE_STORIES_PER_DAY:
            await update.message.reply_text(
                f"🚫 {t('limit_reached', lang, count=FREE_STORIES_PER_DAY)}",
                parse_mode="Markdown",
            )
            return

    await update.message.reply_text(f"🤖 {t('generating_story', lang)}")

    story_text = generate_ai_story(lang=lang)
    image = await generate_anime_image()

    if image:
        await update.message.reply_photo(
            photo=image,
            caption=f"🤖 *{t('story_title', lang)}*\n\n{story_text}",
            parse_mode="Markdown",
        )
    else:
        await update.message.reply_text(f"🤖 *{t('story_title', lang)}*\n\n{story_text}", parse_mode="Markdown")

    video = get_anime_video()
    await update.message.reply_text(
        f"🎬 *{t('related_video', lang)}* [{video['title']}]({video['url']})",
        parse_mode="Markdown",
        disable_web_page_preview=False,
    )


async def vipstory(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    lang = get_lang(user_id) or "pt"
    if not is_vip(user_id):
        await update.message.reply_text(
            f"🔒 {t('vip_only', lang)}",
            parse_mode="Markdown",
        )
        return

    kb = [
        [InlineKeyboardButton("⚔️ Acao", callback_data="vipstory_acao"),
         InlineKeyboardButton("🗺️ Aventura", callback_data="vipstory_aventura")],
        [InlineKeyboardButton("💕 Romance", callback_data="vipstory_romance"),
         InlineKeyboardButton("🧙 Fantasia", callback_data="vipstory_fantasia")],
        [InlineKeyboardButton("🚀 Sci-Fi", callback_data="vipstory_ficcao_cientifica"),
         InlineKeyboardButton("🔍 Misterio", callback_data="vipstory_misterio")],
        [InlineKeyboardButton("👻 Terror", callback_data="vipstory_terror")],
        [InlineKeyboardButton(f"🎲 {t('random_genre', lang)}", callback_data="vipstory_random")],
    ]
    await update.message.reply_text(
        f"👑 *{t('choose_genre', lang)}*",
        reply_markup=InlineKeyboardMarkup(kb),
        parse_mode="Markdown",
    )


async def genre(update: Update, context: ContextTypes.DEFAULT_TYPE):
    lang = get_lang(update.effective_user.id) or "pt"
    kb = [
        [InlineKeyboardButton("⚔️ Acao", callback_data="story_acao"),
         InlineKeyboardButton("🗺️ Aventura", callback_data="story_aventura")],
        [InlineKeyboardButton("💕 Romance", callback_data="story_romance"),
         InlineKeyboardButton("🧙 Fantasia", callback_data="story_fantasia")],
        [InlineKeyboardButton("🚀 Sci-Fi", callback_data="story_ficcao_cientifica")],
    ]
    await update.message.reply_text(
        f"🎭 *{t('choose_genre', lang)}*", reply_markup=InlineKeyboardMarkup(kb), parse_mode="Markdown"
    )


async def vip_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    vip = is_vip(user_id)
    remaining = get_vip_remaining(user_id)

    if vip:
        text = (
            "👑 *Voce e VIP!*\n\n"
            f"⏳ Tempo restante: {remaining}\n\n"
            "*Seus beneficios:*\n"
            "- Historias ilimitadas por dia\n"
            "- Historias geradas por IA\n"
            "- Historias VIP exclusivas (mais longas e detalhadas)\n"
            "- Todos os generos desbloqueados\n\n"
            "Obrigado por apoiar o bot! 🙏"
        )
    else:
        text = (
            "👑 *Plano VIP* 👑\n\n"
            "*Beneficios:*\n"
            "- Historias ilimitadas por dia\n"
            "- Historias geradas por IA exclusivas\n"
            "- Historias VIP (mais longas e detalhadas)\n"
            "- Todos os generos desbloqueados\n"
            "- Novos conteudos toda semana\n\n"
            f"*Precos:*\n"
            f"💰 {VIP_PRICE_BRL} (Pix)\n"
            f"💎 {VIP_PRICE_TON} (TON Crypto)\n\n"
            "⏳ *3 dias gratis* para novos usuarios!\n\n"
            "Clique abaixo para ver as opcoes de pagamento:"
        )

    kb = []
    if not vip:
        kb = [
            [InlineKeyboardButton("💰 Pagar com Pix", callback_data="pay_pix")],
            [InlineKeyboardButton("💎 Pagar com TON", callback_data="pay_ton")],
        ]

    await update.message.reply_text(
        text,
        reply_markup=InlineKeyboardMarkup(kb) if kb else None,
        parse_mode="Markdown",
    )


async def meupainel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    db_user = get_user(user.id)
    if not db_user:
        db_user = register_user(user.id, user.username, user.first_name)

    vip = is_vip(user.id)
    remaining = get_vip_remaining(user.id)
    stories_used = db_user.get("stories_today", 0) or 0

    vip_badge = "👑 VIP" if vip else "🆓 Free"

    text = (
        f"📊 *Painel de {user.first_name}*\n\n"
        f"👤 Usuario: @{user.username or 'N/A'}\n"
        f"🆔 ID: `{user.id}`\n"
        f"📌 Status: {vip_badge}\n"
    )

    if vip:
        text += f"⏳ VIP restante: {remaining}\n"
        text += f"📖 Historias hoje: {stories_used} (ilimitado)\n"
    else:
        text += f"📖 Historias hoje: {stories_used}/{FREE_STORIES_PER_DAY}\n"
        text += "\n👑 Use /vip para desbloquear o plano VIP!"

    await update.message.reply_text(text, parse_mode="Markdown")


async def callback_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    data = query.data
    user_id = query.from_user.id

    # --- Historias por genero ---
    if data.startswith("story_"):
        genre_key = data[6:]
        vip = is_vip(user_id)
        if not vip:
            count = increment_story_count(user_id)
            if count > FREE_STORIES_PER_DAY:
                await query.edit_message_text(
                    f"🚫 Limite de {FREE_STORIES_PER_DAY} historias/dia atingido.\n"
                    "Use /vip para assinar o VIP!",
                    parse_mode="Markdown",
                )
                return

        if genre_key in STORIES:
            chosen = random.choice(STORIES[genre_key])
            name = GENRE_NAMES.get(genre_key, genre_key)
            await query.edit_message_text(f"📖 *{name}*\n\n{chosen}", parse_mode="Markdown")

    # --- Selecao de idioma ---
    elif data.startswith("setlang_"):
        chosen_lang = data[8:]
        register_user(user_id, query.from_user.username, query.from_user.first_name)
        set_lang(user_id, chosen_lang)
        await query.edit_message_text(f"🌐 {t('lang_set', chosen_lang)}")

        vip = is_vip(user_id)
        remaining = get_vip_remaining(user_id)
        intro = _build_welcome(query.from_user.first_name, chosen_lang, vip, remaining)
        try:
            await query.message.chat.send_photo(
                photo=WELCOME_IMAGE_URL,
                caption=intro,
                parse_mode="Markdown",
            )
        except Exception:
            await query.message.chat.send_message(intro, parse_mode="Markdown")

    # --- Historias VIP ---
    elif data.startswith("vipstory_"):
        lang = get_lang(user_id) or "pt"
        if not is_vip(user_id):
            await query.edit_message_text(
                f"🔒 {t('vip_only', lang)}",
                parse_mode="Markdown",
            )
            return

        genre_key = data[9:]
        if genre_key == "random":
            genre_key = None
        story_text = generate_vip_story(genre_key, lang=lang)
        genre_label = GENRE_NAMES.get(genre_key, f"🎲 {t('random_genre', lang)}") if genre_key else f"🎲 {t('random_genre', lang)}"

        await query.edit_message_text(f"👑 {t('generating_vip', lang)}")

        image = await generate_anime_image(genre_key)
        chat = query.message.chat

        if image:
            await chat.send_photo(
                photo=image,
                caption=f"👑 *{t('vip_story_title', lang, genre=genre_label)}*\n\n{story_text}",
                parse_mode="Markdown",
            )
        else:
            await chat.send_message(
                f"👑 *{t('vip_story_title', lang, genre=genre_label)}*\n\n{story_text}",
                parse_mode="Markdown",
            )

        video_genre = genre_key or random.choice(list(ANIME_VIDEOS.keys()))
        videos = get_anime_videos_list(video_genre, 3)
        if videos:
            video_text = f"🎬 *{t('related_videos', lang)}*\n\n"
            for v in videos:
                video_text += f"▶️ [{v['title']}]({v['url']})\n"
            await chat.send_message(video_text, parse_mode="Markdown", disable_web_page_preview=False)

    # --- Recomendacoes ---
    elif data.startswith("rec_"):
        genre_key = data[4:]
        if genre_key in RECOMMENDATIONS:
            animes = RECOMMENDATIONS[genre_key]
            name = GENRE_NAMES.get(genre_key, genre_key)
            anime_list = "\n".join(f"  - {a}" for a in animes)
            await query.edit_message_text(
                f"🌟 *Recomendacoes - {name}*\n\n{anime_list}",
                parse_mode="Markdown",
            )

    # --- Pagamento Pix ---
    elif data == "pay_pix":
        pix_payload = generate_pix_payload(PIX_KEY, "Anime Bot VIP", 19.90)
        qr_buf = generate_qr_image(pix_payload)

        caption = (
            "💰 *Pagamento via Pix*\n\n"
            f"*Valor:* {VIP_PRICE_BRL}\n\n"
            f"*Chave Pix (CPF):*\n`{PIX_KEY}`\n\n"
            "*Instrucoes:*\n"
            "1. Escaneie o QR Code acima ou copie a chave\n"
            "2. Faca o pagamento\n"
            "3. Envie o comprovante aqui no chat\n"
            "4. Seu VIP sera ativado em ate 24h\n\n"
            "📩 Apos o pagamento, envie o comprovante!"
        )
        await query.delete_message()
        await query.message.chat.send_photo(
            photo=qr_buf,
            caption=caption,
            parse_mode="Markdown",
        )

    # --- Serie ---
    elif data.startswith("series_start_"):
        lang = get_lang(user_id) or "pt"
        if not is_vip(user_id):
            await query.answer("VIP necessario para series!", show_alert=True)
            return
        genre = data[len("series_start_"):]
        await query.edit_message_text(
            "📺 *Criando sua serie...*\n\n_Seu heroi e aliado estao sendo criados. Aguarde!_",
            parse_mode="Markdown",
        )
        s = start_series(genre, lang)
        save_series(
            user_id=user_id,
            hero_name=s["hero_name"],
            hero_desc=s["hero_desc"],
            ally_name=s["ally_name"],
            ally_desc=s["ally_desc"],
            genre=s["genre"],
            setting=s["setting"],
            episode=1,
            last_summary="",
        )
        await _send_series_episode(query.message.chat, user_id, s, lang)

    elif data == "series_next":
        lang = get_lang(user_id) or "pt"
        if not is_vip(user_id):
            await query.answer("VIP necessario para series!", show_alert=True)
            return
        series = get_series(user_id)
        if not series:
            await query.answer("Nenhuma serie ativa. Use /serie para comecar!", show_alert=True)
            return
        await query.edit_message_text(
            f"📺 *Gerando Episodio {series['episode']}...*\n\n_Aguarde alguns segundos._",
            parse_mode="Markdown",
        )
        await _send_series_episode(query.message.chat, user_id, series, lang)

    elif data == "series_new":
        if not is_vip(user_id):
            await query.answer("VIP necessario para series!", show_alert=True)
            return
        delete_series(user_id)
        kb = [
            [InlineKeyboardButton("⚔️ Acao", callback_data="series_start_acao"),
             InlineKeyboardButton("🗺️ Aventura", callback_data="series_start_aventura")],
            [InlineKeyboardButton("💕 Romance", callback_data="series_start_romance"),
             InlineKeyboardButton("🧙 Fantasia", callback_data="series_start_fantasia")],
            [InlineKeyboardButton("🚀 Sci-Fi", callback_data="series_start_ficcao_cientifica"),
             InlineKeyboardButton("🔍 Misterio", callback_data="series_start_misterio")],
            [InlineKeyboardButton("👻 Terror", callback_data="series_start_terror")],
        ]
        await query.edit_message_text(
            "📺 *Nova Serie — Escolha o genero:*\n\n"
            "_Um novo heroi e aliado serao criados para voce!_",
            reply_markup=InlineKeyboardMarkup(kb),
            parse_mode="Markdown",
        )

    # --- Episodio ---
    elif data.startswith("ep_"):
        lang = get_lang(user_id) or "pt"
        if not is_vip(user_id):
            await query.answer("VIP necessario para episodios!", show_alert=True)
            return
        genre_key = data[3:]
        if genre_key == "random":
            genre_key = None
        await query.edit_message_text(
            "🎬 *Gerando seu episodio...*\n\n_Isso pode levar alguns segundos. Aguarde!_",
            parse_mode="Markdown",
        )
        await _send_episode(query.message.chat, genre_key, lang)

    # --- Callbacks Admin ---
    elif data == "admin_stats":
        if not _is_admin(user_id):
            await query.answer("Sem permissao.", show_alert=True)
            return
        stats = get_stats()
        text = (
            "📊 *Estatisticas do Bot*\n\n"
            f"👥 *Total de usuarios:* {stats['total']}\n"
            f"👑 *VIP ativos:* {stats['vip']}\n"
            f"🆓 *Usuarios free:* {stats['free']}\n"
            f"🆕 *Novos hoje:* {stats['new_today']}\n"
            f"⚡ *Ativos hoje:* {stats['active_today']}\n"
            f"📖 *Historias lidas hoje:* {stats['stories_today']}\n"
        )
        kb = [[InlineKeyboardButton("🔄 Atualizar", callback_data="admin_stats")]]
        await query.edit_message_text(text, parse_mode="Markdown", reply_markup=InlineKeyboardMarkup(kb))

    elif data.startswith("admin_listar_"):
        if not _is_admin(user_id):
            await query.answer("Sem permissao.", show_alert=True)
            return
        page = int(data.split("_")[-1])
        await query.delete_message()
        await _send_user_list(query.message.chat, page)

    # --- Pagamento TON ---
    elif data == "pay_ton":
        code = "EP" + str(user_id) + "".join(random.choices(string.ascii_uppercase + string.digits, k=4))
        create_payment(
            payment_id=code,
            user_id=user_id,
            method="ton",
            amount=5.0,
            vip_days=30,
            payment_code=code,
        )
        ton_amount_nano = 5 * 1_000_000_000
        comment = urllib.parse.quote(code)
        ton_deeplink = f"ton://transfer/{TON_ADDRESS}?amount={ton_amount_nano}&text={comment}"

        text = (
            "💎 *Pagamento via TON (Tonkeeper)*\n\n"
            f"*Valor:* {VIP_PRICE_TON}\n\n"
            f"*Endereco TON:*\n`{TON_ADDRESS}`\n\n"
            f"⚠️ *IMPORTANTE — Codigo de identificacao:*\n"
            f"`{code}`\n\n"
            "Coloque esse codigo no campo *comentario/memo* da transferencia. "
            "O VIP sera ativado automaticamente assim que o pagamento for detectado na blockchain!\n\n"
            "*Instrucoes:*\n"
            "1. Clique em *Abrir Tonkeeper* abaixo\n"
            "2. O codigo ja estara preenchido automaticamente\n"
            "3. Confirme o envio de *5 TON*\n"
            "4. Aguarde — ativacao automatica em ate 2 minutos ✅"
        )
        kb = [[InlineKeyboardButton("💎 Abrir Tonkeeper", url=ton_deeplink)]]
        await query.edit_message_text(
            text,
            reply_markup=InlineKeyboardMarkup(kb),
            parse_mode="Markdown",
        )


async def quote(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = random.choice(QUOTES)
    await update.message.reply_text(
        f"💬 _{q['quote']}_\n\n— *{q['character']}*",
        parse_mode="Markdown",
    )


async def character(update: Update, context: ContextTypes.DEFAULT_TYPE):
    c = random.choice(CHARACTERS)
    await update.message.reply_text(
        f"👤 *{c['name']}*\n\n{c['desc']}",
        parse_mode="Markdown",
    )


async def recommend(update: Update, context: ContextTypes.DEFAULT_TYPE):
    lang = get_lang(update.effective_user.id) or "pt"
    kb = [
        [InlineKeyboardButton("⚔️ Acao", callback_data="rec_acao"),
         InlineKeyboardButton("🗺️ Aventura", callback_data="rec_aventura")],
        [InlineKeyboardButton("💕 Romance", callback_data="rec_romance"),
         InlineKeyboardButton("🧙 Fantasia", callback_data="rec_fantasia")],
        [InlineKeyboardButton("🚀 Sci-Fi", callback_data="rec_ficcao_cientifica"),
         InlineKeyboardButton("😂 Comedia", callback_data="rec_comedia")],
        [InlineKeyboardButton("👻 Terror", callback_data="rec_terror")],
    ]
    await update.message.reply_text(
        f"🌟 *{t('choose_genre', lang)}*",
        reply_markup=InlineKeyboardMarkup(kb),
        parse_mode="Markdown",
    )


async def lang_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    kb = [
        [InlineKeyboardButton("🇧🇷 Portugues", callback_data="setlang_pt"),
         InlineKeyboardButton("🇺🇸 English", callback_data="setlang_en")],
    ]
    await update.message.reply_text(
        "🌐 Escolha seu idioma / Choose your language:",
        reply_markup=InlineKeyboardMarkup(kb),
        parse_mode="Markdown",
    )


# ─── Episodio ─────────────────────────────────────────────────────────

async def episodio(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    lang = get_lang(user_id) or "pt"
    if not is_vip(user_id):
        await update.message.reply_text(
            "🔒 *Episodios completos sao exclusivos VIP!*\n\n"
            "Cada episodio tem 5 cenas com historia longa, imagem gerada por IA e video de anime.\n\n"
            "Use /vip para assinar e desbloquear!",
            parse_mode="Markdown",
        )
        return
    kb = [
        [InlineKeyboardButton("⚔️ Acao", callback_data="ep_acao"),
         InlineKeyboardButton("🗺️ Aventura", callback_data="ep_aventura")],
        [InlineKeyboardButton("💕 Romance", callback_data="ep_romance"),
         InlineKeyboardButton("🧙 Fantasia", callback_data="ep_fantasia")],
        [InlineKeyboardButton("🚀 Sci-Fi", callback_data="ep_ficcao_cientifica"),
         InlineKeyboardButton("🔍 Misterio", callback_data="ep_misterio")],
        [InlineKeyboardButton("👻 Terror", callback_data="ep_terror"),
         InlineKeyboardButton("🎲 Aleatório", callback_data="ep_random")],
    ]
    await update.message.reply_text(
        "🎬 *Episodio Completo com IA*\n\n"
        "Escolha o genero do seu episodio!\n"
        "_Cada episodio tem 5 cenas com historia longa, imagem e video._",
        reply_markup=InlineKeyboardMarkup(kb),
        parse_mode="Markdown",
    )


async def _send_episode(chat, genre: str | None, lang: str):
    scenes, hero_name, used_genre = generate_episode(genre, lang)
    genre_labels = {
        "acao": "⚔️ Acao", "aventura": "🗺️ Aventura", "romance": "💕 Romance",
        "fantasia": "🧙 Fantasia", "ficcao_cientifica": "🚀 Sci-Fi",
        "misterio": "🔍 Misterio", "terror": "👻 Terror",
    }
    label = genre_labels.get(used_genre, "🎲 Anime")

    await chat.send_message(
        f"🎬 *Episodio: {label}*\n"
        f"👤 Protagonista: *{hero_name}*\n\n"
        f"_Gerando {len(scenes)} cenas com imagens e videos..._",
        parse_mode="Markdown",
    )

    for scene in scenes:
        header = f"*— Cena {scene['number']}: {scene['title']} —*\n\n"
        body = scene["text"]
        full_text = header + body

        if len(full_text) > 1024:
            full_text = full_text[:1020] + "..."

        img_prompt = urllib.parse.quote(scene["image_prompt"])
        seed = random.randint(1, 999999)
        img_url = f"https://image.pollinations.ai/prompt/{img_prompt}?width=512&height=512&nologo=true&seed={seed}&model=flux"

        try:
            await chat.send_photo(
                photo=img_url,
                caption=full_text,
                parse_mode="Markdown",
            )
        except Exception:
            await chat.send_message(full_text, parse_mode="Markdown")

        if scene.get("video"):
            v = scene["video"]
            await chat.send_message(
                f"🎬 *Video da cena:* [{v['title']}]({v['url']})",
                parse_mode="Markdown",
                disable_web_page_preview=False,
            )

        await asyncio.sleep(0.5)

    await chat.send_message(
        "✅ *Episodio concluido!*\n\n"
        "_Use /episodio para gerar um novo episodio a qualquer momento._",
        parse_mode="Markdown",
    )


# ─── Serie ────────────────────────────────────────────────────────────

async def serie(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    lang = get_lang(user_id) or "pt"
    if not is_vip(user_id):
        await update.message.reply_text(
            "🔒 *Series sao exclusivas VIP!*\n\n"
            "Acompanhe o mesmo heroi por varios episodios com historia continua.\n\n"
            "Use /vip para assinar e desbloquear!",
            parse_mode="Markdown",
        )
        return
    series = get_series(user_id)
    if series:
        ep = series["episode"]
        genre_label = GENRE_LABELS.get(series["genre"], series["genre"])
        kb = [
            [InlineKeyboardButton(f"▶️ Continuar Ep.{ep} — {series['hero_name']}", callback_data="series_next")],
            [InlineKeyboardButton("🔁 Nova Serie", callback_data="series_new")],
        ]
        await update.message.reply_text(
            f"📺 *Sua Serie em andamento!*\n\n"
            f"👤 Heroi: *{series['hero_name']}*\n"
            f"🤝 Aliado: *{series['ally_name']}*\n"
            f"🎭 Genero: {genre_label}\n"
            f"📖 Proximo episodio: *{ep}*\n\n"
            "_Continua de onde parou, com o mesmo heroi e aliado._",
            reply_markup=InlineKeyboardMarkup(kb),
            parse_mode="Markdown",
        )
    else:
        kb = [
            [InlineKeyboardButton("⚔️ Acao", callback_data="series_start_acao"),
             InlineKeyboardButton("🗺️ Aventura", callback_data="series_start_aventura")],
            [InlineKeyboardButton("💕 Romance", callback_data="series_start_romance"),
             InlineKeyboardButton("🧙 Fantasia", callback_data="series_start_fantasia")],
            [InlineKeyboardButton("🚀 Sci-Fi", callback_data="series_start_ficcao_cientifica"),
             InlineKeyboardButton("🔍 Misterio", callback_data="series_start_misterio")],
            [InlineKeyboardButton("👻 Terror", callback_data="series_start_terror")],
        ]
        await update.message.reply_text(
            "📺 *Series com Heroi Fixo*\n\n"
            "Escolha um genero e o bot cria seu heroi e aliado automaticamente.\n"
            "A cada episodio a historia continua de onde parou!\n\n"
            "_Escolha o genero para comecar sua serie:_",
            reply_markup=InlineKeyboardMarkup(kb),
            parse_mode="Markdown",
        )


async def _send_series_episode(chat, user_id: int, series: dict, lang: str):
    ep = series["episode"]
    genre_label = GENRE_LABELS.get(series["genre"], series["genre"])

    await chat.send_message(
        f"📺 *Episodio {ep} da Sua Serie*\n"
        f"👤 *{series['hero_name']}* & *{series['ally_name']}*\n"
        f"🎭 {genre_label}\n\n"
        f"_Gerando 5 cenas... aguarde!_",
        parse_mode="Markdown",
    )

    scenes, new_summary = generate_series_episode(series, lang)

    for scene in scenes:
        header = f"*— Cena {scene['number']}: {scene['title']} —*\n\n"
        body = scene["text"]
        full_text = header + body
        if len(full_text) > 1024:
            full_text = full_text[:1020] + "..."

        try:
            await chat.send_photo(
                photo=scene["img_url"],
                caption=full_text,
                parse_mode="Markdown",
            )
        except Exception:
            await chat.send_message(full_text, parse_mode="Markdown")

        if scene.get("video"):
            v = scene["video"]
            await chat.send_message(
                f"🎬 *Video:* [{v['title']}]({v['url']})",
                parse_mode="Markdown",
                disable_web_page_preview=False,
            )

        await asyncio.sleep(0.5)

    next_ep = ep + 1
    save_series(
        user_id=user_id,
        hero_name=series["hero_name"],
        hero_desc=series["hero_desc"],
        ally_name=series["ally_name"],
        ally_desc=series["ally_desc"],
        genre=series["genre"],
        setting=series["setting"],
        episode=next_ep,
        last_summary=new_summary,
    )

    kb = [
        [InlineKeyboardButton(f"▶️ Proximo Episodio ({next_ep})", callback_data="series_next")],
        [InlineKeyboardButton("🔁 Nova Serie", callback_data="series_new")],
    ]
    await chat.send_message(
        f"✅ *Episodio {ep} concluido!*\n\n"
        f"_{series['hero_name']} continua sua jornada no proximo episodio..._",
        reply_markup=InlineKeyboardMarkup(kb),
        parse_mode="Markdown",
    )


# ─── Helpers Admin ────────────────────────────────────────────────────

def _is_admin(user_id: int) -> bool:
    return user_id in ADMIN_IDS


# ─── Comandos Admin ───────────────────────────────────────────────────

async def admin_menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Painel admin principal: /admin"""
    if not _is_admin(update.effective_user.id):
        await update.message.reply_text("🚫 Sem permissao.")
        return

    stats = get_stats()
    text = (
        "🛡️ *Painel Admin*\n\n"
        f"👥 Total usuarios: *{stats['total']}*\n"
        f"👑 VIP ativos: *{stats['vip']}*\n"
        f"🆓 Free: *{stats['free']}*\n"
        f"🆕 Novos hoje: *{stats['new_today']}*\n"
        f"📖 Historias hoje: *{stats['stories_today']}*\n"
        f"⚡ Ativos hoje: *{stats['active_today']}*\n\n"
        "*Comandos disponiveis:*\n"
        "/stats — Estatisticas detalhadas\n"
        "/listar — Lista os ultimos 20 usuarios\n"
        "/ativarvip `<id> <dias>` — Ativar VIP\n"
        "/revogar `<id>` — Revogar VIP\n"
        "/broadcast `<mensagem>` — Enviar para todos\n"
        "/meuid — Ver seu user ID"
    )
    kb = [
        [InlineKeyboardButton("📊 Stats", callback_data="admin_stats"),
         InlineKeyboardButton("👥 Listar", callback_data="admin_listar_0")],
    ]
    await update.message.reply_text(text, parse_mode="Markdown", reply_markup=InlineKeyboardMarkup(kb))


async def admin_stats(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Estatisticas: /stats"""
    if not _is_admin(update.effective_user.id):
        await update.message.reply_text("🚫 Sem permissao.")
        return

    stats = get_stats()
    text = (
        "📊 *Estatisticas do Bot*\n\n"
        f"👥 *Total de usuarios:* {stats['total']}\n"
        f"👑 *VIP ativos:* {stats['vip']}\n"
        f"🆓 *Usuarios free:* {stats['free']}\n"
        f"🆕 *Novos hoje:* {stats['new_today']}\n"
        f"⚡ *Ativos hoje:* {stats['active_today']}\n"
        f"📖 *Historias lidas hoje:* {stats['stories_today']}\n"
    )
    await update.message.reply_text(text, parse_mode="Markdown")


async def admin_listar(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Lista usuarios: /listar [pagina]"""
    if not _is_admin(update.effective_user.id):
        await update.message.reply_text("🚫 Sem permissao.")
        return

    page = 0
    if context.args and context.args[0].isdigit():
        page = int(context.args[0])

    await _send_user_list(update.message.chat, page)


async def _send_user_list(chat, page: int):
    limit = 20
    offset = page * limit
    users = get_all_users(limit=limit, offset=offset)
    total = get_total_users()

    if not users:
        await chat.send_message("Nenhum usuario encontrado.")
        return

    lines = [f"👥 *Usuarios (pag {page + 1})*\n"]
    for u in users:
        vip_icon = "👑" if u["is_vip"] else "🆓"
        name = u.get("first_name") or "?"
        username = f"@{u['username']}" if u.get("username") else "sem @"
        lines.append(f"{vip_icon} `{u['user_id']}` — {name} ({username})")

    lines.append(f"\n_Total: {total} usuarios_")
    text = "\n".join(lines)

    kb = []
    row = []
    if page > 0:
        row.append(InlineKeyboardButton("⬅️ Anterior", callback_data=f"admin_listar_{page - 1}"))
    if offset + limit < total:
        row.append(InlineKeyboardButton("Proximo ➡️", callback_data=f"admin_listar_{page + 1}"))
    if row:
        kb.append(row)

    await chat.send_message(
        text,
        parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup(kb) if kb else None,
    )


async def admin_ativar_vip(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Ativa VIP: /ativarvip <user_id> <dias>"""
    if not _is_admin(update.effective_user.id):
        await update.message.reply_text("🚫 Sem permissao.")
        return

    args = context.args
    if len(args) < 2:
        await update.message.reply_text("Uso: `/ativarvip <user_id> <dias>`", parse_mode="Markdown")
        return

    try:
        target_id = int(args[0])
        days = int(args[1])
    except ValueError:
        await update.message.reply_text("IDs e dias devem ser numeros.")
        return

    user = get_user(target_id)
    if not user:
        await update.message.reply_text(f"Usuario `{target_id}` nao encontrado.", parse_mode="Markdown")
        return

    activate_vip(target_id, days)
    name = user.get("first_name") or str(target_id)
    await update.message.reply_text(
        f"👑 VIP ativado!\n\n"
        f"Usuario: *{name}* (`{target_id}`)\n"
        f"Duracao: *{days} dias*",
        parse_mode="Markdown",
    )

    try:
        await context.bot.send_message(
            target_id,
            f"🎉 *Seu VIP foi ativado por {days} dias!*\n\n"
            "Aproveite todas as funcionalidades exclusivas!\n"
            "Use /meupainel para ver seu status.",
            parse_mode="Markdown",
        )
    except Exception:
        pass


async def admin_revogar_vip(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Revoga VIP: /revogar <user_id>"""
    if not _is_admin(update.effective_user.id):
        await update.message.reply_text("🚫 Sem permissao.")
        return

    args = context.args
    if not args:
        await update.message.reply_text("Uso: `/revogar <user_id>`", parse_mode="Markdown")
        return

    try:
        target_id = int(args[0])
    except ValueError:
        await update.message.reply_text("ID deve ser um numero.")
        return

    user = get_user(target_id)
    if not user:
        await update.message.reply_text(f"Usuario `{target_id}` nao encontrado.", parse_mode="Markdown")
        return

    revoke_vip(target_id)
    name = user.get("first_name") or str(target_id)
    await update.message.reply_text(
        f"🚫 VIP revogado de *{name}* (`{target_id}`)",
        parse_mode="Markdown",
    )


async def admin_broadcast(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Envia mensagem para todos: /broadcast <mensagem>"""
    if not _is_admin(update.effective_user.id):
        await update.message.reply_text("🚫 Sem permissao.")
        return

    if not context.args:
        await update.message.reply_text("Uso: `/broadcast <mensagem>`", parse_mode="Markdown")
        return

    message = " ".join(context.args)
    all_users = get_all_users(limit=9999)

    sent = 0
    failed = 0
    status_msg = await update.message.reply_text(f"📢 Enviando para {len(all_users)} usuarios...")

    for u in all_users:
        try:
            await context.bot.send_message(
                u["user_id"],
                f"📢 *Aviso do Bot*\n\n{message}",
                parse_mode="Markdown",
            )
            sent += 1
        except Exception:
            failed += 1

    await status_msg.edit_text(
        f"📢 *Broadcast concluido!*\n\n"
        f"✅ Enviados: {sent}\n"
        f"❌ Falhas: {failed}",
        parse_mode="Markdown",
    )


async def admin_set_admin(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Mostra o user_id para configurar como admin: /meuid"""
    user = update.effective_user
    admin_hint = "✅ Voce e admin!" if _is_admin(user.id) else "❌ Voce nao e admin."
    await update.message.reply_text(
        f"🆔 Seu user ID: `{user.id}`\n"
        f"{admin_hint}\n\n"
        "Para virar admin, adicione seu ID na variavel de ambiente `ADMIN_IDS`.",
        parse_mode="Markdown",
    )


# ═══════════════════════════════════════════════════════════════════════
#  MAIN
# ═══════════════════════════════════════════════════════════════════════

async def run_bot():
    init_db()
    init_payments_db()
    init_series_db()

    token = os.environ.get("TELEGRAM_BOT_TOKEN", "YOUR_TOKEN_HERE")
    app = Application.builder().token(token).build()

    # Comandos gerais
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_cmd))
    app.add_handler(CommandHandler("story", story))
    app.add_handler(CommandHandler("aistory", aistory))
    app.add_handler(CommandHandler("vipstory", vipstory))
    app.add_handler(CommandHandler("genre", genre))
    app.add_handler(CommandHandler("quote", quote))
    app.add_handler(CommandHandler("character", character))
    app.add_handler(CommandHandler("recommend", recommend))
    app.add_handler(CommandHandler("lang", lang_cmd))
    app.add_handler(CommandHandler("tour", tour))

    # Episodio e Series
    app.add_handler(CommandHandler("episodio", episodio))
    app.add_handler(CommandHandler("serie", serie))

    # Conta
    app.add_handler(CommandHandler("vip", vip_cmd))
    app.add_handler(CommandHandler("meupainel", meupainel))

    # Admin
    app.add_handler(CommandHandler("admin", admin_menu))
    app.add_handler(CommandHandler("stats", admin_stats))
    app.add_handler(CommandHandler("listar", admin_listar))
    app.add_handler(CommandHandler("ativarvip", admin_ativar_vip))
    app.add_handler(CommandHandler("revogar", admin_revogar_vip))
    app.add_handler(CommandHandler("broadcast", admin_broadcast))
    app.add_handler(CommandHandler("meuid", admin_set_admin))

    # Callbacks (botoes)
    app.add_handler(CallbackQueryHandler(callback_handler))

    await app.initialize()
    await app.start()
    bot = app.bot

    # Inicia verificador TON em background
    ton_task = asyncio.create_task(check_ton_payments(bot))

    print("Bot rodando...")
    await app.updater.start_polling()

    try:
        await asyncio.Event().wait()
    except (KeyboardInterrupt, SystemExit):
        pass
    finally:
        ton_task.cancel()
        await app.updater.stop()
        await app.stop()
        await app.shutdown()


def main():
    asyncio.run(run_bot())


if __name__ == "__main__":
    main()
