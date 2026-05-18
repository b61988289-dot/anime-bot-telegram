import random
from ai_stories import (
    HEROES, HEROES_EN, SETTINGS_FULL, SETTINGS_EN,
    CONFLICTS_CHAPTER1, CONFLICTS_EN,
    DEVELOPMENTS_CHAPTER2, DEVELOPMENTS_EN,
    ALLIES, ALLIES_EN,
    TWISTS_CHAPTER3, TWISTS_EN,
    CLIMAXES, CLIMAXES_EN,
    ENDINGS, ENDINGS_EN,
    GENRE_OPENERS, GENRE_CLOSERS,
)
from video_links import ANIME_VIDEOS, get_anime_video

# ─── Textos extras por cena ────────────────────────────────────────────

SCENE1_EXTRAS_PT = {
    "acao": [
        "O vento cortava o ar carregando o cheiro de fumaça e metal quente. As cicatrizes nas mãos contavam histórias que a boca nunca ousava repetir. Cada marca era uma batalha. Cada batalha, uma escolha. E as escolhas, uma vez feitas, não podiam ser desfeitas.",
        "O treino começou antes do sol nascer e terminaria depois dele se pôr. Não havia outra forma. Neste mundo, os fracos não sobreviviam tempo suficiente para aprender com seus erros. E {hero_name} havia jurado que nunca mais cometeria o mesmo erro duas vezes.",
    ],
    "aventura": [
        "O mapa estava tão desgastado que as bordas se desmanchavam ao toque. Mas as coordenadas no centro eram claras, traçadas com tinta que brilhava levemente no escuro. Alguém muito poderoso queria que esse lugar fosse encontrado — ou queria que parecesse assim.",
        "Havia lendas sobre o lugar para onde {hero_name} se dirigia. Lendas que os mais velhos contavam em voz baixa, olhando por cima dos ombros como se as próprias palavras pudessem invocar algo. Mas lendas eram apenas histórias. E histórias eram apenas palavras. Não eram?",
    ],
    "romance": [
        "Era o tipo de manhã que fazia a pessoa questionar cada decisão que a trouxe até aquele momento — não com arrependimento, mas com aquela curiosidade suave sobre como caminhos diferentes levariam a lugares completamente diferentes. Ou às mesmas pessoas.",
        "As estações mudavam, os anos passavam, mas certas coisas permaneciam constantes: o ângulo da luz da tarde pela janela, o cheiro de chuva chegando, e aquela sensação inexplicável de que algo estava prestes a mudar para sempre.",
    ],
    "fantasia": [
        "A magia não era algo que se aprendia em livros, por mais que os professores insistissem nisso. Era algo que se sentia primeiro — um formigamento nos dedos, um calor no peito, uma vibração no ar antes de qualquer palavra ser dita. {hero_name} havia sentido desde criança. Só agora entendia o que significava.",
        "As runas gravadas na parede da caverna tinham pelo menos dois mil anos, mas ainda pulsavam com uma energia suave, como se o feitiço nunca tivesse parado de funcionar. Os estudiosos diziam que era impossível. Mas os estudiosos também diziam que dragões eram mitos.",
    ],
    "ficcao_cientifica": [
        "Os sistemas da nave emitiam aquele zumbido constante que depois de semanas se tornava praticamente imperceptível. Praticamente. Mas esta noite, havia algo diferente nele — uma frequência a mais, quase inaudível, que fazia os dentes doerem levemente se a pessoa prestasse muita atenção.",
        "Os dados eram inequívocos. O problema era que os dados contradiziam tudo que se sabia sobre física, biologia, e o básico do que tornava o universo funcionalmente possível. {hero_name} verificou os cálculos pela décima vez. Continuavam os mesmos. E continuavam impossíveis.",
    ],
    "misterio": [
        "O primeiro detalhe que {hero_name} notou foi o que não estava lá. Uma ausência. Um espaço onde algo deveria existir mas não existia. A maioria das pessoas passa pela vida inteira sem perceber ausências — enxerga o que está lá, não o que falta. Era exatamente por isso que {hero_name} via coisas que os outros não viam.",
        "Havia três versões da história, contadas por três pessoas diferentes que juravam estar dizendo a verdade. O problema era que as três versões eram completamente incompatíveis entre si. Alguém estava mentindo. Ou talvez todos estivessem — cada um à sua própria maneira.",
    ],
    "terror": [
        "A casa parecia normal. Era exatamente nisso que estava o problema. Normal demais. Silenciosa demais. Quieta de uma forma que ia além da simples ausência de som — era a ausência de vida, de movimento, de todos os pequenos ruídos que as coisas fazem simplesmente por existirem.",
        "O instinto humano de autopreservação é a coisa mais antiga que existe em nós, mais antiga que a linguagem, mais antiga que o pensamento racional. E naquele momento, o instinto de {hero_name} estava gritando. A mente ainda não entendia. O corpo já sabia.",
    ],
}

SCENE2_EXTRAS_PT = [
    "A decisão não era simples. Nunca era. De um lado, a segurança do que era conhecido — limitado, talvez até sufocante, mas previsível. Do outro, o desconhecido, com todas as suas promessas e todos os seus perigos. {hero_name} ficou parado por um longo momento, olhando para os dois caminhos.",
    "Havia uma regra não escrita sobre este tipo de situação: quando tudo dentro de você diz para correr, você corre. Quando tudo dentro de você diz para ficar, você fica. O problema era que metade de {hero_name} queria correr, e a outra metade não conseguia se mover.",
    "Algumas portas, uma vez abertas, não podiam ser fechadas. Alguns conhecimentos, uma vez adquiridos, não podiam ser desaprendidos. E algumas escolhas, {hero_name} sabia, mudariam tudo — não só o futuro, mas a forma como o passado seria lembrado.",
    "O coração batia mais rápido do que deveria. A adrenalina transformava o mundo em algo mais nítido, mais real, mais urgente. Era estranho como o perigo fazia a vida parecer mais intensa — como se o risco de perdê-la a tornasse mais valiosa no mesmo instante.",
]

SCENE3_EXTRAS_PT = [
    "Viajar com alguém revela coisas que anos de convivência normal não revelariam. Como a pessoa reage quando está com fome. Como se comporta quando está cansada demais para filtrar os pensamentos. O que a faz rir quando está com medo. {hero_name} estava começando a conhecer {ally_name} de uma forma que poucos conheciam.",
    "O silêncio entre dois companheiros de jornada pode ser de dois tipos: o silêncio tenso, onde as palavras não ditas pesam como pedras; ou o silêncio confortável, onde a presença do outro é suficiente. Enquanto caminhavam, {hero_name} percebeu que o silêncio entre eles havia mudado de tipo sem que ninguém tivesse dado por isso.",
    "Cada obstáculo superado juntos criava um fio invisível entre as pessoas. Um fio de confiança construída não em palavras, mas em ações — em momentos onde cada um precisou confiar no outro e o outro não falhou. {hero_name} e {ally_name} tinham muitos desses fios agora.",
]

SCENE4_EXTRAS_PT = [
    "A verdade tinha um peso físico. {hero_name} sentiu como se o chão tivesse se movido, como se a gravidade tivesse mudado de direção por uma fração de segundo. O mundo era o mesmo. Mas a forma como {hero_name} o via nunca mais seria.",
    "Havia uma diferença entre saber que algo era difícil e vivenciar essa dificuldade. {hero_name} havia sabido. Agora vivia. E a experiência real era ao mesmo tempo mais aterrorizante e mais manejável do que a antecipação — porque agora era real, e o real podia ser enfrentado.",
    "Em todo confronto, existe um momento de ponto sem retorno — um instante após o qual as coisas nunca podem voltar ao que eram. {hero_name} sentiu esse momento quando chegou, como uma mudança de pressão no ar, como o segundo antes de uma tempestade romper.",
]

SCENE5_EXTRAS_PT = [
    "O sol nasceu da mesma forma que sempre havia nascido. O mundo não havia mudado para celebrar o que havia acontecido. Continuava girando, indiferente, como sempre. E de alguma forma, isso tornava tudo mais real — não menos.",
    "Há um tipo especial de cansaço que vem depois que a adrenalina passa e a mente finalmente processa o que o corpo já viveu. Não é fraqueza. É o peso de ter sobrevivido a algo que poderia muito bem ter tido um final diferente.",
    "O futuro nunca havia parecido tão aberto, tão cheio de possibilidades não escritas. E com possibilidades vinham escolhas. E com escolhas, responsabilidade. {hero_name} respirou fundo e deu o primeiro passo em direção a tudo isso.",
]

SCENE_PROMPTS = {
    1: {
        "acao": "anime hero standing in devastated battlefield at dawn, dramatic lighting, detailed armor, cinematic wide shot",
        "aventura": "anime explorer looking at ancient ruins on horizon, lush landscape, golden hour light, epic composition",
        "romance": "anime character in peaceful town at sunrise, soft warm colors, gentle atmosphere, beautiful scenery",
        "fantasia": "anime magic user in mystical forest with glowing runes, ethereal light, fantasy atmosphere",
        "ficcao_cientifica": "anime character inside futuristic space station, stars visible through window, blue lighting, technological",
        "misterio": "anime detective in rainy city street at night, neon reflections, film noir atmosphere, detailed",
        "terror": "anime character approaching dark abandoned building at night, fog, ominous atmosphere, horror",
    },
    2: {
        "acao": "anime warrior receiving urgent message, battle preparations, urgency in expression, dynamic composition",
        "aventura": "anime explorer discovering mysterious artifact or map, excited expression, ancient setting",
        "romance": "anime characters meeting for the first time, surprised expression, cherry blossoms or rain backdrop",
        "fantasia": "anime character discovering magical powers, glowing energy, astonished expression, dramatic",
        "ficcao_cientifica": "anime scientist discovering anomaly on holographic display, shocked expression, high tech lab",
        "misterio": "anime detective finding first clue, magnifying glass, thoughtful expression, moody lighting",
        "terror": "anime character witnessing supernatural event, terrified expression, darkness closing in",
    },
    3: {
        "acao": "anime warrior and companion fighting side by side, dynamic action, team synergy, epic battle",
        "aventura": "anime adventurers traveling through breathtaking landscape together, camaraderie, stunning scenery",
        "romance": "anime couple spending time together, warm lighting, genuine smiles, emotional connection",
        "fantasia": "anime hero and magical companion casting spell together, combined power, enchanted environment",
        "ficcao_cientifica": "anime crew working together on mission, futuristic ship interior, teamwork, sci-fi aesthetic",
        "misterio": "anime detective and partner piecing together clues, investigation board, intense focus",
        "terror": "anime characters huddled together facing the unknown, fear but determination, shadows everywhere",
    },
    4: {
        "acao": "anime epic clash between hero and final boss, massive energy explosion, cinematic battle, peak intensity",
        "aventura": "anime hero facing ultimate challenge, determination in eyes, ancient powerful setting, climax",
        "romance": "anime emotional confession scene, tears and joy mixed, beautiful backdrop, heartfelt moment",
        "fantasia": "anime final magic duel, massive spells colliding, sky torn open, ultimate power unleashed",
        "ficcao_cientifica": "anime hero activating final system while world crumbles, sacrifice and determination, dramatic",
        "misterio": "anime revelation moment, truth finally exposed, dramatic lighting, emotional impact",
        "terror": "anime final confrontation with monster or truth, terror and courage together, climactic scene",
    },
    5: {
        "acao": "anime hero at peace after battle, sunrise, quiet moment, battle damage but hopeful expression",
        "aventura": "anime adventurers looking at new horizon together, victory, new journey ahead, warm colors",
        "romance": "anime couple together watching sunset, peaceful happiness, new beginning, beautiful ending",
        "fantasia": "anime world restored to beauty after magic battle, glowing landscape, peace and wonder",
        "ficcao_cientifica": "anime crew watching stars from viewpoint, mission complete, hopeful future, peaceful",
        "misterio": "anime detective closing case file, looking toward city lights, satisfied but ready for more",
        "terror": "anime character in sunlight after dark events, relief and trauma mixed, healing beginning",
    },
}

SCENE_TITLES_PT = [
    ["Despertar", "O Começo de Tudo", "O Dia que Mudou Tudo", "Antes da Tempestade", "Uma Vida Comum"],
    ["O Chamado", "Sem Escolha", "O Ponto de Partida", "Quando Tudo Mudou", "A Ruptura"],
    ["Aliados Improváveis", "O Caminho", "Juntos", "Entre Batalhas", "A Jornada"],
    ["A Verdade", "O Confronto", "Sem Volta", "Tudo ou Nada", "O Momento Decisivo"],
    ["O Amanhecer", "Um Novo Começo", "O Que Ficou", "Até a Próxima", "Fim... Por Enquanto"],
]

SCENE_TITLES_EN = [
    ["Awakening", "The Beginning", "The Day Everything Changed", "Before the Storm", "An Ordinary Life"],
    ["The Call", "No Choice", "The Starting Point", "When Everything Changed", "The Break"],
    ["Unlikely Allies", "The Path", "Together", "Between Battles", "The Journey"],
    ["The Truth", "The Confrontation", "No Going Back", "All or Nothing", "The Decisive Moment"],
    ["The Dawn", "A New Beginning", "What Remained", "Until Next Time", "The End... For Now"],
]


def _pick(lst):
    return random.choice(lst)


def _fmt(text: str, hero_name: str, ally_name: str = "") -> str:
    return text.replace("{hero_name}", hero_name).replace("{ally_name}", ally_name)


def generate_episode(genre: str | None = None, lang: str = "pt") -> list[dict]:
    if not genre:
        genre = _pick(list(SCENE_PROMPTS[1].keys()))

    is_pt = lang == "pt"

    heroes = HEROES if is_pt else HEROES_EN
    allies = ALLIES if is_pt else ALLIES_EN
    settings = SETTINGS_FULL if is_pt else SETTINGS_EN
    conflicts = CONFLICTS_CHAPTER1 if is_pt else CONFLICTS_EN
    developments = DEVELOPMENTS_CHAPTER2 if is_pt else DEVELOPMENTS_EN
    twists = TWISTS_CHAPTER3 if is_pt else TWISTS_EN
    climaxes = CLIMAXES if is_pt else CLIMAXES_EN
    endings = ENDINGS if is_pt else ENDINGS_EN
    titles_list = SCENE_TITLES_PT if is_pt else SCENE_TITLES_EN

    hero_name, hero_desc = _pick(heroes)
    ally_name, ally_desc = _pick(allies)
    setting = _pick(settings)
    conflict = _fmt(_pick(conflicts), hero_name, ally_name)
    development = _fmt(_pick(developments), hero_name, ally_name)
    twist = _fmt(_pick(twists), hero_name, ally_name)
    climax = _fmt(_pick(climaxes), hero_name, ally_name)
    ending = _fmt(_pick(endings), hero_name, ally_name)

    genre_opener = GENRE_OPENERS.get(genre, "") if is_pt else ""
    genre_closer = GENRE_CLOSERS.get(genre, "") if is_pt else ""

    extras1 = SCENE1_EXTRAS_PT.get(genre, [""])
    extra1 = _fmt(_pick(extras1), hero_name, ally_name)

    extra2 = _fmt(_pick(SCENE2_EXTRAS_PT), hero_name, ally_name)
    extra3 = _fmt(_pick(SCENE3_EXTRAS_PT), hero_name, ally_name)
    extra4 = _fmt(_pick(SCENE4_EXTRAS_PT), hero_name, ally_name)
    extra5 = _fmt(_pick(SCENE5_EXTRAS_PT), hero_name, ally_name)

    videos_pool = ANIME_VIDEOS.get(genre, [v for vids in ANIME_VIDEOS.values() for v in vids])
    sampled_videos = random.sample(videos_pool, min(5, len(videos_pool)))

    default_img = f"anime {genre} scene high quality detailed cinematic, anime style"

    scenes = [
        {
            "number": 1,
            "title": _pick(titles_list[0]),
            "text": (
                f"{genre_opener}\n\n" if genre_opener else ""
            ) + (
                f"Conheça *{hero_name}* — {hero_desc}, vivendo {setting}.\n\n"
                if is_pt else
                f"Meet *{hero_name}* — {hero_desc}, living {setting}.\n\n"
            ) + f"{conflict}\n\n{extra1}",
            "image_prompt": SCENE_PROMPTS[1].get(genre, default_img) + ", anime style, 4k, detailed",
            "video": sampled_videos[0] if sampled_videos else None,
        },
        {
            "number": 2,
            "title": _pick(titles_list[1]),
            "text": f"{extra2}",
            "image_prompt": SCENE_PROMPTS[2].get(genre, default_img) + ", anime style, 4k, detailed",
            "video": sampled_videos[1] if len(sampled_videos) > 1 else None,
        },
        {
            "number": 3,
            "title": _pick(titles_list[2]),
            "text": f"{development}\n\n{extra3}",
            "image_prompt": SCENE_PROMPTS[3].get(genre, default_img) + ", anime style, 4k, detailed",
            "video": sampled_videos[2] if len(sampled_videos) > 2 else None,
        },
        {
            "number": 4,
            "title": _pick(titles_list[3]),
            "text": f"{twist}\n\n{extra4}\n\n{climax}",
            "image_prompt": SCENE_PROMPTS[4].get(genre, default_img) + ", anime style, 4k, detailed",
            "video": sampled_videos[3] if len(sampled_videos) > 3 else None,
        },
        {
            "number": 5,
            "title": _pick(titles_list[4]),
            "text": f"{ending}\n\n{extra5}\n\n{genre_closer}" if genre_closer else f"{ending}\n\n{extra5}",
            "image_prompt": SCENE_PROMPTS[5].get(genre, default_img) + ", anime style, 4k, detailed",
            "video": sampled_videos[4] if len(sampled_videos) > 4 else None,
        },
    ]

    return scenes, hero_name, genre
