import random
import urllib.parse
from ai_stories import (
    HEROES, HEROES_EN, SETTINGS_FULL, SETTINGS_EN,
    ALLIES, ALLIES_EN,
    GENRE_OPENERS, GENRE_CLOSERS,
)
from video_links import ANIME_VIDEOS

GENRE_LABELS = {
    "acao": "⚔️ Acao", "aventura": "🗺️ Aventura", "romance": "💕 Romance",
    "fantasia": "🧙 Fantasia", "ficcao_cientifica": "🚀 Sci-Fi",
    "misterio": "🔍 Misterio", "terror": "👻 Terror",
}

ARC_CONFLICTS = {
    "pt": [
        ("A Ameaça das Sombras",
         "{hero_name} descobre que uma organização secreta está manipulando eventos nos bastidores do mundo. Com a ajuda de {ally_name}, começa a desvendar os fios dessa conspiração que vai muito mais fundo do que qualquer um poderia imaginar.",
         "Cada pista revelava mais perguntas do que respostas. Mas {hero_name} sabia que desistir agora significaria deixar o mundo à mercê de forças que não compreendiam limites."),

        ("O Preço da Vitória",
         "As consequências das batalhas anteriores chegam com força total. {hero_name} precisa lidar com perdas, reconstruir laços e encontrar forças para continuar — enquanto uma nova ameaça emerge das cinzas do passado.",
         "{ally_name} observava {hero_name} com preocupação. 'Você mudou,' disse. {hero_name} sorriu com cansaço. 'O mundo mudou. Eu só acompanhei.'"),

        ("O Caminho Sem Nome",
         "Uma mensagem misteriosa leva {hero_name} a um lugar que não existe em nenhum mapa — onde as regras do mundo não se aplicam e onde a verdade sobre sua origem finalmente começa a tomar forma.",
         "O que {hero_name} encontrou lá não era o que esperava. Nunca era. Mas desta vez, a surpresa mudou tudo — não apenas o que {hero_name} sabia, mas o que {hero_name} era."),

        ("Aliados e Traidores",
         "Uma traição inesperada força {hero_name} a questionar tudo que construiu até agora. Com quem realmente pode contar? {ally_name} está ao lado, mas mesmo a confiança mais sólida pode rachar sob pressão suficiente.",
         "Algumas guerras não se vencem com força — vencem-se escolhendo com cuidado em quem confiar. {hero_name} aprendeu isso da maneira mais difícil possível."),

        ("O Despertar do Poder",
         "Algo dentro de {hero_name} desperta — um poder que sempre esteve lá, adormecido, esperando o momento certo. Mas poder sem controle é tão perigoso quanto o inimigo. {ally_name} corre contra o tempo para ajudar {hero_name} a dominar o que está emergindo.",
         "A luz que emanava de {hero_name} assustava tanto quanto fascinava. Era antiga. Era poderosa. E estava apenas começando a acordar."),

        ("O Fim de uma Era",
         "O conflito que moldou este mundo por décadas chega ao seu clímax final. {hero_name} e {ally_name} estão no epicentro de uma mudança irreversível — e a escolha que fazem agora ecoará por gerações.",
         "Não havia vitória limpa. Nunca havia. Mas havia esperança — e neste mundo, esperança era suficiente para continuar em frente."),

        ("Raízes e Ruínas",
         "O passado de {hero_name} ressurge de forma inesperada — um rosto familiar, um lugar esquecido, uma memória que muda completamente o entendimento de quem {hero_name} realmente é e de onde veio.",
         "{ally_name} ficou em silêncio por um longo momento após ouvir a história. Então disse: 'Então você não era quem pensávamos.' {hero_name} balançou a cabeça. 'Eu sou quem escolhi ser. Isso é o que importa.'"),

        ("Além do Horizonte",
         "Uma oportunidade única surge: cruzar para um território completamente desconhecido, onde nenhum mapa existe e nenhuma regra se aplica. {hero_name} e {ally_name} partem juntos para o maior desconhecido que já enfrentaram.",
         "O horizonte nunca parecia tão longe — nem tão próximo. E enquanto davam o primeiro passo juntos, ambos souberam: esta seria a aventura que definiria tudo que viria depois."),
    ],
    "en": [
        ("The Shadow Threat",
         "{hero_name} discovers a secret organization manipulating events behind the scenes. With {ally_name}'s help, begins unraveling a conspiracy that runs far deeper than anyone could have imagined.",
         "Every clue raised more questions than answers. But {hero_name} knew that giving up now meant leaving the world at the mercy of forces that understood no limits."),

        ("The Price of Victory",
         "The consequences of past battles arrive in full force. {hero_name} must deal with losses, rebuild bonds, and find the strength to continue — while a new threat emerges from the ashes of the past.",
         "{ally_name} watched {hero_name} with concern. 'You've changed,' they said. {hero_name} smiled tiredly. 'The world changed. I just kept up.'"),

        ("The Nameless Path",
         "A mysterious message leads {hero_name} to a place that exists on no map — where the world's rules don't apply and where the truth about their origins finally begins to take shape.",
         "What {hero_name} found there wasn't what was expected. It never was. But this time, the surprise changed everything — not just what {hero_name} knew, but who {hero_name} was."),

        ("The Awakening",
         "Something inside {hero_name} awakens — a power that was always there, dormant, waiting for the right moment. But power without control is as dangerous as any enemy. {ally_name} races against time to help {hero_name} master what is emerging.",
         "The light emanating from {hero_name} was as terrifying as it was fascinating. It was ancient. It was powerful. And it was only beginning to wake."),
    ],
}

CONTINUATION_BRIDGES = {
    "pt": [
        "Dias se passaram desde os eventos do episódio anterior. {hero_name} havia tido tempo para respirar — mas o descanso, como sempre neste mundo, durou pouco.",
        "O mundo não parou de girar depois do que aconteceu. {hero_name} e {ally_name} seguiam em frente, como sempre faziam, carregando o peso do passado e os olhos no que viria.",
        "Novas informações chegaram de fontes inesperadas. {hero_name} ouviu com atenção, sentindo aquela familiar tensão no peito que sempre anunciava que algo grande estava prestes a acontecer.",
        "Assim que a poeira do último confronto baixou, um novo problema surgiu no horizonte. {hero_name} olhou para {ally_name} — e sem precisar dizer nada, ambos entenderam: a jornada continuava.",
        "O silêncio pós-batalha tinha um sabor diferente desta vez. {hero_name} sabia, no fundo, que aquele era o tipo de pausa que o destino concedia raramente — e que não duraria.",
    ],
    "en": [
        "Days passed since the previous events. {hero_name} had time to breathe — but rest, as always in this world, was short-lived.",
        "The world didn't stop turning after what happened. {hero_name} and {ally_name} pressed forward, as they always did, carrying the weight of the past and eyes set on what was to come.",
        "New information arrived from unexpected sources. {hero_name} listened carefully, feeling that familiar tension in the chest that always announced something big was about to happen.",
    ],
}

SCENE_TITLES_SERIES = {
    "pt": [
        ["Retomada", "O Próximo Passo", "Novos Ventos", "Depois da Tempestade", "Recomeço"],
        ["O Chamado", "Sem Escolha", "O Gatilho", "A Centelha", "O Ponto de Partida"],
        ["Em Movimento", "O Caminho", "Lado a Lado", "Entre Aliados", "A Jornada"],
        ["O Confronto", "Ponto de Virada", "Sem Volta", "O Clímax", "A Decisão"],
        ["Depois de Tudo", "O Que Restou", "Um Novo Amanhecer", "Até o Próximo", "Continuará..."],
    ],
    "en": [
        ["Resumption", "The Next Step", "New Winds", "After the Storm", "New Beginning"],
        ["The Call", "No Choice", "The Trigger", "The Spark", "The Starting Point"],
        ["In Motion", "The Path", "Side by Side", "Between Allies", "The Journey"],
        ["The Confrontation", "Turning Point", "No Going Back", "The Climax", "The Decision"],
        ["After Everything", "What Remained", "A New Dawn", "Until Next Time", "To Be Continued..."],
    ],
}

SCENE_IMG_PROMPTS = {
    1: "anime hero returning to adventure after rest peaceful determination morning light cinematic",
    2: "anime characters receiving mission urgent news dramatic moment high quality",
    3: "anime hero and companion traveling together beautiful landscape teamwork bond",
    4: "anime epic confrontation climax dramatic lighting intense battle or revelation",
    5: "anime hero peaceful after victory sunrise hopeful expression beautiful scenery",
}


def _fmt(text: str, hero_name: str, ally_name: str) -> str:
    return text.replace("{hero_name}", hero_name).replace("{ally_name}", ally_name)


def _pick(lst):
    return random.choice(lst)


def start_series(genre: str, lang: str = "pt") -> dict:
    is_pt = lang == "pt"
    heroes = HEROES if is_pt else HEROES_EN
    allies = ALLIES if is_pt else ALLIES_EN
    settings = SETTINGS_FULL if is_pt else SETTINGS_EN

    hero_name, hero_desc = _pick(heroes)
    ally_name, ally_desc = _pick(allies)
    setting = _pick(settings)

    return {
        "hero_name": hero_name,
        "hero_desc": hero_desc,
        "ally_name": ally_name,
        "ally_desc": ally_desc,
        "genre": genre,
        "setting": setting,
        "episode": 1,
        "last_summary": "",
    }


def generate_series_episode(series: dict, lang: str = "pt") -> tuple[list[dict], str]:
    is_pt = lang == "pt"
    hero_name = series["hero_name"]
    ally_name = series["ally_name"]
    ally_desc = series["ally_desc"]
    hero_desc = series["hero_desc"]
    genre = series["genre"]
    setting = series["setting"]
    episode_num = series["episode"]
    last_summary = series.get("last_summary", "")

    arcs = ARC_CONFLICTS["pt" if is_pt else "en"]
    arc_idx = (episode_num - 1) % len(arcs)
    arc_title, arc_conflict, arc_resolution = arcs[arc_idx]
    arc_conflict = _fmt(arc_conflict, hero_name, ally_name)
    arc_resolution = _fmt(arc_resolution, hero_name, ally_name)

    bridges = CONTINUATION_BRIDGES["pt" if is_pt else "en"]
    bridge = _fmt(_pick(bridges), hero_name, ally_name) if episode_num > 1 and last_summary else ""

    titles = SCENE_TITLES_SERIES["pt" if is_pt else "en"]
    genre_opener = GENRE_OPENERS.get(genre, "") if is_pt else ""
    genre_closer = GENRE_CLOSERS.get(genre, "") if is_pt else ""

    videos_pool = ANIME_VIDEOS.get(genre, [v for vids in ANIME_VIDEOS.values() for v in vids])
    sampled_videos = random.sample(videos_pool, min(5, len(videos_pool)))

    seed_base = random.randint(1, 999999)

    def img_url(scene_num: int) -> str:
        base = SCENE_IMG_PROMPTS.get(scene_num, "anime scene high quality")
        prompt = f"{base} {genre} anime style 4k detailed"
        encoded = urllib.parse.quote(prompt)
        return f"https://image.pollinations.ai/prompt/{encoded}?width=512&height=512&nologo=true&seed={seed_base + scene_num}&model=flux"

    if is_pt:
        scene1_text = (
            (f"{bridge}\n\n" if bridge else (f"{genre_opener}\n\n" if genre_opener else ""))
            + f"*Episódio {episode_num}: {arc_title}*\n\n"
            + f"{hero_name} — {hero_desc} — seguia sua jornada {setting}.\n\n"
            + arc_conflict
        )
        scene2_text = (
            f"O desafio estava posto. {hero_name} analisou a situação com cuidado, pesando cada possibilidade.\n\n"
            f"Era o tipo de problema que não tinha solução simples. Cada caminho tinha seu custo, cada escolha seu preço. "
            f"Mas hesitar também era uma escolha — e geralmente a pior delas.\n\n"
            f"{ally_name}, {ally_desc}, ficou ao lado sem dizer nada. Às vezes, a presença de alguém era mais poderosa que qualquer palavra."
        )
        scene3_text = (
            f"{hero_name} e {ally_name} avançaram juntos, cada um cobrindo as limitações do outro.\n\n"
            f"Nenhum dos dois era perfeito. Mas juntos, cobriam muito mais terreno — literal e figurativamente. "
            f"Era nisso que consistia uma verdadeira parceria: não em ser igual, mas em ser complementar.\n\n"
            f"O caminho ficou mais difícil antes de melhorar. Sempre ficava. Mas eles continuaram."
        )
        scene4_text = (
            f"O confronto chegou da forma que sempre chega — quando menos se espera e mais se precisa estar pronto.\n\n"
            f"{arc_resolution}\n\n"
            f"{hero_name} respirou fundo. O momento decisivo havia chegado. Não havia espaço para dúvida agora — apenas para ação."
        )
        scene5_text = (
            f"Quando tudo se acalmou, {hero_name} ficou parado por um longo momento.\n\n"
            f"{genre_closer}\n\n" if genre_closer else ""
        ) + (
            f"Quando tudo se acalmou, {hero_name} ficou parado por um longo momento.\n\n"
            f"{ally_name} se aproximou: 'E agora?' {hero_name} olhou para o horizonte. 'Agora? A história continua.'"
        ) if not genre_closer else (
            f"Quando tudo se acalmou, {hero_name} ficou parado por um longo momento.\n\n"
            f"_{genre_closer}_\n\n"
            f"{ally_name} se aproximou: 'E agora?' {hero_name} olhou para o horizonte. 'Agora? A história continua.'"
        )
    else:
        scene1_text = (
            (f"{bridge}\n\n" if bridge else "")
            + f"*Episode {episode_num}: {arc_title}*\n\n"
            + f"{hero_name} — {hero_desc} — continued their journey {setting}.\n\n"
            + arc_conflict
        )
        scene2_text = (
            f"The challenge was clear. {hero_name} analyzed the situation carefully, weighing each possibility.\n\n"
            f"{ally_name}, {ally_desc}, stood nearby without a word. Sometimes presence speaks louder than any words."
        )
        scene3_text = (
            f"{hero_name} and {ally_name} moved forward together, each covering the other's limitations.\n\n"
            f"Neither was perfect. But together, they covered far more ground. That was the essence of a true partnership."
        )
        scene4_text = (
            f"The confrontation arrived as it always does — unexpectedly, when readiness matters most.\n\n"
            f"{arc_resolution}\n\n"
            f"{hero_name} took a deep breath. The decisive moment had come."
        )
        scene5_text = (
            f"When everything calmed down, {hero_name} stood still for a long moment.\n\n"
            f"{ally_name} approached: 'What now?' {hero_name} looked at the horizon. 'Now? The story continues.'"
        )

    new_summary = (
        f"Ep.{episode_num} — {arc_title}: {hero_name} enfrentou {arc_conflict[:80]}..."
        if is_pt else
        f"Ep.{episode_num} — {arc_title}: {hero_name} faced {arc_conflict[:80]}..."
    )

    scenes = [
        {"number": 1, "title": _pick(titles[0]), "text": scene1_text,
         "img_url": img_url(1), "video": sampled_videos[0] if sampled_videos else None},
        {"number": 2, "title": _pick(titles[1]), "text": scene2_text,
         "img_url": img_url(2), "video": sampled_videos[1] if len(sampled_videos) > 1 else None},
        {"number": 3, "title": _pick(titles[2]), "text": scene3_text,
         "img_url": img_url(3), "video": sampled_videos[2] if len(sampled_videos) > 2 else None},
        {"number": 4, "title": _pick(titles[3]), "text": scene4_text,
         "img_url": img_url(4), "video": sampled_videos[3] if len(sampled_videos) > 3 else None},
        {"number": 5, "title": _pick(titles[4]), "text": scene5_text,
         "img_url": img_url(5), "video": sampled_videos[4] if len(sampled_videos) > 4 else None},
    ]

    return scenes, new_summary
