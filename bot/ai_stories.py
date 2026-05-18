import random

GENRES_PT = {
    "acao": "Acao",
    "aventura": "Aventura",
    "romance": "Romance",
    "fantasia": "Fantasia",
    "ficcao_cientifica": "Ficcao Cientifica",
    "misterio": "Misterio",
    "terror": "Terror",
}

# ═══════════════════════════════════════════════════════════════════════
#  ELEMENTOS PARA GERACAO DINAMICA
# ═══════════════════════════════════════════════════════════════════════

HEROES = [
    ("Kaito", "um jovem espadachim de cabelos prateados"),
    ("Yuki", "uma garota com olhos que mudam de cor conforme suas emocoes"),
    ("Ren", "um ex-soldado que abandonou a guerra"),
    ("Hana", "uma aprendiz de feiticeira com poderes instáveis"),
    ("Takeshi", "um piloto de naves com medo de voar"),
    ("Sora", "uma ladra habilidosa com um passado misterioso"),
    ("Akira", "um inventor que constroi maquinas a partir de sucata"),
    ("Mei", "uma sacerdotisa que questiona sua propria fe"),
    ("Ryu", "um cacador de monstros que perdeu a memoria"),
    ("Aoi", "uma musicista cujas melodias afetam a realidade"),
    ("Jin", "um mercenario cansado que busca redencao"),
    ("Sakura", "uma guerreira que esconde uma maldicao em seu braco esquerdo"),
    ("Daichi", "um fazendeiro pacifico com forca descomunal"),
    ("Mika", "uma cientista obcecada por desvendar a origem do universo"),
    ("Haruto", "um orfao criado por lobos em uma floresta encantada"),
    ("Natsuki", "uma navegadora que sonha em encontrar o fim do oceano"),
    ("Shin", "um monge silencioso que domina artes marciais antigas"),
    ("Rei", "uma androide que comecou a sentir emocoes humanas"),
    ("Tsubasa", "um mensageiro alado que voa entre cidades flutuantes"),
    ("Koharu", "uma curandeira cuja magia cobra um preco em suas memorias"),
]

SETTINGS_FULL = [
    "em um continente dividido por uma muralha gigantesca que ninguem sabe quem construiu. De um lado, cidades de tecnologia avancada. Do outro, vilas que vivem de magia antiga. No meio, uma terra proibida onde ambos os poderes entram em conflito",
    "em um arquipelago de ilhas flutuantes conectadas por pontes de luz. Cada ilha guarda um fragmento de um cristal primordial, e a cada ano uma ilha desaparece misteriosamente no oceano de nuvens abaixo",
    "em uma cidade subterranea iluminada por cristais bioluminescentes, construida ha mil anos para escapar de uma catastrofe na superficie. Ninguem mais lembra o que aconteceu la em cima, e subir e estritamente proibido",
    "em um mundo onde as estacoes do ano sao controladas por quatro guardioes imortais. O equinonio foi quebrado, e agora o inverno eterno avanca, consumindo tudo",
    "em uma metrópole futurista onde sonhos podem ser gravados e vendidos como entretenimento. Porem, alguem comecou a roubar sonhos — e as vitimas nunca mais conseguem dormir",
    "em um deserto infinito onde ruinas de civilizacoes antigas emergem da areia a cada tempestade. Expedicionarios arriscam suas vidas para encontrar reliquias, mas muitos nunca voltam",
    "em uma floresta que se expande a cada noite, engolindo vilas inteiras. No centro da floresta, dizem que existe uma arvore que concede qualquer desejo — mas cobra um preco terrivel",
    "em um reino de ilhas vulcanicas onde dragoes marinhos nadam nos rios de lava. Os habitantes aprenderam a domar o fogo, mas uma nova especie de dragao surgiu — uma que cospe gelo",
    "em uma estacao espacial abandonada que orbita um planeta morto. Uma equipe de resgate chega e descobre que a estacao nao esta tao abandonada quanto parecia",
    "em um mundo onde cada pessoa nasce com um relogio no pulso mostrando quanto tempo lhe resta de vida. Um dia, todos os relogios param ao mesmo tempo",
]

CONFLICTS_CHAPTER1 = [
    "Tudo comecou quando uma estrela cadente atravessou o ceu noturno e caiu no quintal de {hero_name}. Ao chegar ao local do impacto, encontrou nao uma pedra, mas uma esfera de metal negro que pulsava com uma luz azul fraca, como um coracao batendo.",
    "A vida de {hero_name} mudou no dia em que uma estranha encontrou em sua porta, ferida e segurando um mapa coberto de simbolos que ninguem conseguia ler. Antes de desmaiar, ela sussurrou: 'Eles estao vindo. Voce e o unico que pode impedi-los.'",
    "{hero_name} sempre teve sonhos estranhos — visoes de um lugar que nunca visitou, vozes chamando seu nome. Mas naquela noite, o sonho foi diferente. Ao acordar, encontrou uma marca brilhando em sua mao que nao estava la antes.",
    "Ninguem acreditou quando {hero_name} disse que ouviu a montanha falar. Mas na manha seguinte, um tremor sacudiu toda a regiao, e uma fenda se abriu na base da montanha, revelando escadas que desciam para uma escuridao sem fim.",
    "A mensagem chegou por um pombo mecanico — uma invenção que ninguem usava ha decadas. Dentro, apenas tres palavras escritas com sangue: 'Nao confie neles.' {hero_name} reconheceu a caligrafia. Era de seu pai, desaparecido ha dez anos.",
    "{hero_name} encontrou o livro em uma loja de antiguidades — um volume sem titulo, com paginas em branco. Mas ao toca-lo, as paginas se encheram de texto, contando uma historia que ainda nao havia acontecido. A sua historia.",
    "O alarme soou pela primeira vez em cem anos. {hero_name}, como todos, sabia o que significava: a barreira que protegia sua cidade estava enfraquecendo. Em poucas horas, o que existia do outro lado finalmente entraria.",
    "Era para ser um dia normal. Mas quando {hero_name} abriu os olhos, o mundo estava em silencio absoluto. Nenhum passaro, nenhum vento, nenhuma voz. E no horizonte, o sol nao era mais amarelo — era vermelho sangue.",
]

DEVELOPMENTS_CHAPTER2 = [
    "A jornada levou {hero_name} por caminhos que nenhum mapa mostrava. Em uma taverna esquecida, conheceu {ally_name}, {ally_desc}. No inicio, nao confiavam um no outro, mas logo perceberam que seus destinos estavam entrelaçados de uma forma que nenhum dos dois podia explicar.",
    "Apos dias de caminhada, {hero_name} chegou a um vale onde o tempo parecia correr diferente. As arvores cresciam e morriam em minutos. La encontrou {ally_name}, {ally_desc}, que vivia naquele lugar ha anos — ou talvez seculos — sem envelhecer um dia.",
    "A primeira pista levou a uma cidade em ruinas. {hero_name} descobriu inscricoes nas paredes que contavam a historia de uma civilizacao que enfrentou a mesma ameaca seculos antes — e falhou. Entre os escombros, encontrou {ally_name}, {ally_desc}, unico sobrevivente guardando um segredo.",
    "{hero_name} quase morreu na emboscada. Teria morrido se {ally_name}, {ally_desc}, nao tivesse aparecido no ultimo segundo. 'Eu te observo ha semanas,' disse. 'Voce nao sabe, mas carrega algo dentro de si que pode mudar tudo. E ha gente disposta a matar por isso.'",
    "O caminho os levou a uma torre que tocava as nuvens. Dentro, cada andar era um desafio — quebra-cabecas, armadilhas, guardioes de pedra. {hero_name} e {ally_name}, {ally_desc}, trabalharam juntos, e a cada andar subido, uma nova verdade era revelada sobre a natureza do mundo.",
]

ALLIES = [
    ("Yami", "um misterioso viajante com uma cicatriz que brilha no escuro"),
    ("Luna", "uma garota que consegue falar com animais e espiritos"),
    ("Tetsu", "um ferreiro enorme de poucas palavras mas coracao gentil"),
    ("Hikari", "uma exploradora corajosa que ja mapeou continentes inteiros"),
    ("Kaze", "um ladrao reformado que conhece cada segredo das ruas"),
    ("Mizu", "uma guerreira silenciosa que luta com duas laminas de agua"),
    ("Tsuki", "um alquimista excentrico que fala com suas pocoes"),
    ("Hoshi", "uma astronoma cega que enxerga atraves das estrelas"),
]

TWISTS_CHAPTER3 = [
    "A verdade atingiu {hero_name} como um raio. O inimigo que buscava derrotar nao era um estranho — era uma versao futura de si mesmo, corrompida pelo poder que agora tentava controlar. Cada passo dado na jornada nao era para destruir o vilao, mas para evitar se tornar ele.",
    "Quando finalmente encontraram o nucleo do conflito, {ally_name} revelou a verdade: 'Eu nao te encontrei por acaso. Fui enviado para garantir que voce nunca chegasse ate aqui. Mas depois de tudo que passamos...' A mao de {ally_name} tremeu sobre a espada.",
    "O artefato nao era uma arma como todos pensavam. Era uma chave — e ao ativa-lo, {hero_name} viu a verdade: seu mundo inteiro era uma simulacao criada para proteger algo muito maior. Tudo que conhecia, todos que amava, eram ecos de uma realidade que existia alem.",
    "A profecia estava errada. Ou melhor, estava incompleta. O verso final, escondido por seculos, dizia: 'O escolhido nao salvara o mundo — o escolhido devera escolher qual mundo salvar.' E {hero_name} percebeu que havia mais de um mundo em jogo.",
    "O vilao parou de lutar. Sentou-se no chao, olhou para {hero_name} e disse: 'Voce realmente nao sabe, nao e? Eu nao sou o inimigo. Eu sou a unica coisa que impede algo muito pior de entrar. Se voce me destruir, nao sobrara nada para proteger ninguem.'",
    "O mapa, o artefato, as pistas — tudo apontava para o mesmo lugar: a memoria de {hero_name}. A resposta para salvar tudo estava trancada em uma lembranca que alguem apagou deliberadamente. E o unico que poderia ter feito isso era o proprio {hero_name}.",
]

CLIMAXES = [
    "O ceu se rasgou. Uma luz descomunal banhava tudo enquanto {hero_name} segurava o artefato com as maos tremendo. 'Se eu fizer isso, nao tem volta,' pensou. {ally_name} colocou a mao em seu ombro: 'Voce nao esta sozinho. Nunca esteve.' E com um grito que ecoou entre dimensoes, {hero_name} fez sua escolha.",
    "A batalha final nao foi de espadas ou magia — foi de vontade. {hero_name} olhou nos olhos de seu oponente e viu dor, arrependimento, solidao. Em vez de atacar, estendeu a mao. 'Chega de luta,' disse. O silencio que se seguiu foi o mais ensurdecedor que o mundo ja ouviu.",
    "Tudo estava desmoronando. O chao rachava, o ceu escurecia, e o tempo acelerava. {hero_name} correu ate o centro de tudo, onde a energia pulsava como um furacao. Sabia que o preco seria alto. Fechou os olhos, respirou fundo, e se lancou na luz.",
    "Com o ultimo fragmento reunido, o artefato se completou. Mas nao fez o que todos esperavam — nao destruiu o inimigo, nao restaurou o mundo. Em vez disso, mostrou a verdade a todos: o mundo que conheciam era so o comeco. E agora, um novo capitulo estava prestes a se abrir.",
]

ENDINGS = [
    "Quando tudo acabou, {hero_name} ficou em pe, olhando o horizonte. O mundo nao era perfeito — talvez nunca fosse. Mas era deles. E pela primeira vez, o futuro parecia algo pelo qual valia a pena lutar. Ao longe, {ally_name} acenou. A jornada havia terminado. Mas a historia? Essa estava apenas comecando.",
    "Os dias que se seguiram foram de reconstrucao. {hero_name} plantou uma arvore no local onde tudo comecou — uma semente trazida do outro lado do mundo. 'Para que ninguem esqueca,' disse. {ally_name} sorriu: 'Ninguem vai esquecer. Voce garantiu isso.' E a arvore cresceu, forte e luminosa, como um farol de esperanca.",
    "{hero_name} voltou para casa, mas nao era mais a mesma pessoa. Carregava cicatrizes — no corpo e na alma — mas tambem carregava sabedoria. Na porta, uma carta esperava, sem remetente. Dentro, apenas uma frase: 'Quando estiver pronto, ha mais um caminho a seguir.' {hero_name} sorriu. Talvez um dia.",
    "O mundo foi salvo, mas a um custo. {hero_name} sabia que jamais seria lembrado — esse era o preco. Enquanto caminhava pela estrada vazia, uma crianca correu ate ele: 'Voce e o heroi das historias que minha avo conta!' {hero_name} riu. Talvez nem toda memoria pudesse ser apagada.",
    "A ultima pagina do livro se escreveu sozinha enquanto {hero_name} observava o nascer do sol. As palavras diziam: 'E assim, entre luzes e sombras, o heroi encontrou nao a glória, mas algo muito mais valioso — paz.' {hero_name} fechou o livro e o colocou na estante. Fim? Nao. Apenas uma pausa.",
]

GENRE_OPENERS = {
    "acao": "O som de metal contra metal ecoou pelo vale. Nao havia tempo para pensar — so reagir. Cada segundo contava, cada movimento podia ser o ultimo.",
    "aventura": "O mapa apontava para o desconhecido. Nao era o destino que importava, mas o que seria descoberto pelo caminho. E o caminho era longo.",
    "romance": "Existem momentos que o coracao reconhece antes da mente. Um olhar, um toque acidental, uma palavra dita no momento certo. Assim comecou.",
    "fantasia": "A magia nao e apenas poder — e responsabilidade, sacrificio, e uma conexao com algo maior do que qualquer mortal pode compreender.",
    "ficcao_cientifica": "Os dados nao mentiam. O universo estava mudando, e a humanidade tinha duas opcoes: adaptar-se ou desaparecer. O tempo para decidir estava acabando.",
    "misterio": "A primeira pista apareceu onde ninguem esperava. A segunda contradisse a primeira. A terceira mudou tudo. E a verdade? A verdade estava escondida atras de todas elas.",
    "terror": "O silencio veio primeiro. Depois, o frio — um frio que nao vinha de fora, mas de dentro. E entao, a certeza: algo estava ali, observando, esperando o momento certo.",
}

GENRE_CLOSERS = {
    "acao": "A batalha terminou, mas as cicatrizes permaneceriam para sempre. Forca nao e sobre nunca cair — e sobre levantar a cada vez.",
    "aventura": "O horizonte chamava mais uma vez. Porque para um verdadeiro aventureiro, nao existe 'fim da estrada' — apenas a proxima curva.",
    "romance": "O amor nao salvou o mundo. Mas salvou duas pessoas. E as vezes, isso e o suficiente para dar sentido a tudo.",
    "fantasia": "A magia se acalmou, os feiticos se dissiparam. Mas no ar, ainda pairava aquela sensacao de que o impossivel, por um breve momento, havia se tornado real.",
    "ficcao_cientifica": "Os numeros finalmente faziam sentido. O futuro nao era perfeito, mas era possivel. E possibilidade, no fim das contas, e tudo que a humanidade precisa.",
    "misterio": "O enigma foi resolvido. Mas a verdadeira questao permaneceu: algumas respostas valem o preco de conhece-las?",
    "terror": "A luz voltou. O medo se dissipou. Mas algo mudou — uma sombra no canto do olho, uma sensacao de ser observado. Talvez nunca fosse embora completamente.",
}


# ═══════════════════════════════════════════════════════════════════════
#  ENGLISH CONTENT
# ═══════════════════════════════════════════════════════════════════════

HEROES_EN = [
    ("Kaito", "a young silver-haired swordsman"),
    ("Yuki", "a girl whose eyes change color with her emotions"),
    ("Ren", "a former soldier who abandoned the war"),
    ("Hana", "a sorceress apprentice with unstable powers"),
    ("Takeshi", "a starship pilot afraid of flying"),
    ("Sora", "a skilled thief with a mysterious past"),
    ("Akira", "an inventor who builds machines from scrap"),
    ("Mei", "a priestess who questions her own faith"),
    ("Ryu", "a monster hunter who lost his memory"),
    ("Aoi", "a musician whose melodies affect reality"),
    ("Jin", "a weary mercenary seeking redemption"),
    ("Sakura", "a warrior hiding a curse in her left arm"),
    ("Daichi", "a peaceful farmer with immense strength"),
    ("Mika", "a scientist obsessed with the origin of the universe"),
    ("Haruto", "an orphan raised by wolves in an enchanted forest"),
    ("Rei", "an android who began to feel human emotions"),
    ("Koharu", "a healer whose magic costs her memories"),
]

SETTINGS_EN = [
    "on a continent divided by a massive wall no one knows who built. On one side, cities of advanced technology. On the other, villages living by ancient magic. Between them, a forbidden land where both powers collide",
    "on an archipelago of floating islands connected by bridges of light. Each island guards a fragment of a primordial crystal, and each year an island mysteriously vanishes into the cloud ocean below",
    "in an underground city lit by bioluminescent crystals, built a thousand years ago to escape a surface catastrophe. No one remembers what happened above, and ascending is strictly forbidden",
    "in a world where the seasons are controlled by four immortal guardians. The balance was broken, and now an eternal winter advances, consuming everything",
    "in a futuristic metropolis where dreams can be recorded and sold as entertainment. But someone started stealing dreams — and the victims can never sleep again",
    "in an endless desert where ruins of ancient civilizations emerge from the sand with every storm. Explorers risk their lives to find relics, but many never return",
    "in a forest that expands every night, swallowing entire villages. At the center of the forest, they say there is a tree that grants any wish — but demands a terrible price",
]

CONFLICTS_EN = [
    "Everything began when a shooting star crossed the night sky and fell in {hero_name}'s backyard. At the impact site, there was not a rock, but a sphere of black metal pulsing with a faint blue light, like a beating heart.",
    "{hero_name}'s life changed the day a stranger appeared at the door, wounded and holding a map covered in symbols no one could read. Before fainting, she whispered: 'They are coming. You are the only one who can stop them.'",
    "{hero_name} always had strange dreams — visions of a place never visited, voices calling out. But that night, the dream was different. Upon waking, a glowing mark appeared on one hand that wasn't there before.",
    "No one believed {hero_name} when they said they heard the mountain speak. But the next morning, a tremor shook the entire region, and a crack opened at the base of the mountain, revealing stairs descending into endless darkness.",
    "The message arrived by mechanical pigeon — an invention no one had used in decades. Inside, just three words written in blood: 'Don't trust them.' {hero_name} recognized the handwriting. It was from a father who disappeared ten years ago.",
    "The alarm sounded for the first time in a hundred years. {hero_name}, like everyone, knew what it meant: the barrier protecting the city was weakening. In a few hours, whatever existed on the other side would finally break through.",
]

DEVELOPMENTS_EN = [
    "The journey took {hero_name} along paths no map showed. In a forgotten tavern, they met {ally_name}, {ally_desc}. At first, they didn't trust each other, but soon realized their fates were intertwined in a way neither could explain.",
    "After days of walking, {hero_name} reached a valley where time seemed to flow differently. Trees grew and died in minutes. There they found {ally_name}, {ally_desc}, who had lived there for years — or perhaps centuries — without aging a day.",
    "The first clue led to a ruined city. {hero_name} discovered inscriptions on the walls telling the story of a civilization that faced the same threat centuries ago — and failed. Among the rubble, they found {ally_name}, {ally_desc}, the sole survivor guarding a secret.",
    "{hero_name} nearly died in the ambush. They would have, if {ally_name}, {ally_desc}, hadn't appeared at the last second. 'I've been watching you for weeks,' they said. 'You don't know it, but you carry something inside you that could change everything. And there are people willing to kill for it.'",
]

ALLIES_EN = [
    ("Yami", "a mysterious traveler with a scar that glows in the dark"),
    ("Luna", "a girl who can speak with animals and spirits"),
    ("Tetsu", "a massive blacksmith of few words but a gentle heart"),
    ("Hikari", "a brave explorer who has mapped entire continents"),
    ("Kaze", "a reformed thief who knows every secret of the streets"),
    ("Mizu", "a silent warrior who fights with two blades of water"),
]

TWISTS_EN = [
    "The truth hit {hero_name} like lightning. The enemy they sought to defeat was not a stranger — it was a future version of themselves, corrupted by the very power they now tried to control. Every step on this journey was not to destroy the villain, but to avoid becoming one.",
    "When they finally found the core of the conflict, {ally_name} revealed the truth: 'I didn't find you by chance. I was sent to make sure you never got here. But after everything we've been through...' {ally_name}'s hand trembled over the sword.",
    "The artifact wasn't a weapon as everyone thought. It was a key — and upon activating it, {hero_name} saw the truth: the entire world was a simulation created to protect something much greater. Everything they knew, everyone they loved, were echoes of a reality that existed beyond.",
    "The prophecy was wrong. Or rather, it was incomplete. The final verse, hidden for centuries, read: 'The chosen one will not save the world — the chosen one must choose which world to save.' And {hero_name} realized there was more than one world at stake.",
]

CLIMAXES_EN = [
    "The sky tore open. An immense light bathed everything as {hero_name} held the artifact with trembling hands. 'If I do this, there's no going back,' they thought. {ally_name} placed a hand on their shoulder: 'You're not alone. You never were.' And with a cry that echoed between dimensions, {hero_name} made the choice.",
    "The final battle was not of swords or magic — it was of will. {hero_name} looked into the opponent's eyes and saw pain, regret, loneliness. Instead of attacking, they extended a hand. 'Enough fighting,' they said. The silence that followed was the most deafening the world had ever heard.",
    "Everything was crumbling. The ground cracked, the sky darkened, and time accelerated. {hero_name} ran to the center of it all, where energy pulsed like a hurricane. They knew the price would be high. Closing their eyes, taking a deep breath, they leaped into the light.",
]

ENDINGS_EN = [
    "When it was all over, {hero_name} stood looking at the horizon. The world wasn't perfect — perhaps it never would be. But it was theirs. And for the first time, the future seemed worth fighting for. In the distance, {ally_name} waved. The journey had ended. But the story? That was just beginning.",
    "The days that followed were of rebuilding. {hero_name} planted a tree where it all began — a seed brought from the other side of the world. 'So no one forgets,' they said. {ally_name} smiled: 'No one will forget. You made sure of that.' And the tree grew, strong and luminous, like a beacon of hope.",
    "{hero_name} returned home, but was no longer the same person. They carried scars — on body and soul — but also wisdom. At the door, a letter waited, no return address. Inside, just one sentence: 'When you are ready, there is another path to follow.' {hero_name} smiled. Perhaps one day.",
]

GENRE_OPENERS_EN = {
    "acao": "The sound of metal clashing echoed through the valley. There was no time to think — only react. Every second counted, every move could be the last.",
    "aventura": "The map pointed to the unknown. It wasn't the destination that mattered, but what would be discovered along the way. And the way was long.",
    "romance": "There are moments the heart recognizes before the mind. A glance, an accidental touch, a word spoken at just the right time. That's how it began.",
    "fantasia": "Magic is not just power — it is responsibility, sacrifice, and a connection to something greater than any mortal can comprehend.",
    "ficcao_cientifica": "The data didn't lie. The universe was changing, and humanity had two options: adapt or disappear. Time was running out.",
    "misterio": "The first clue appeared where no one expected. The second contradicted the first. The third changed everything. And the truth? The truth was hidden behind all of them.",
    "terror": "The silence came first. Then the cold — a cold that didn't come from outside, but from within. And then, the certainty: something was there, watching, waiting for the right moment.",
}

GENRE_CLOSERS_EN = {
    "acao": "The battle ended, but the scars would remain forever. Strength is not about never falling — it's about getting up every time.",
    "aventura": "The horizon called once more. Because for a true adventurer, there is no 'end of the road' — only the next turn.",
    "romance": "Love didn't save the world. But it saved two people. And sometimes, that's enough to give meaning to everything.",
    "fantasia": "The magic calmed, the spells faded. But in the air, there still lingered the feeling that the impossible, for a brief moment, had become real.",
    "ficcao_cientifica": "The numbers finally made sense. The future wasn't perfect, but it was possible. And possibility, in the end, is all humanity needs.",
    "misterio": "The enigma was solved. But the real question remained: are some answers worth the price of knowing them?",
    "terror": "The light returned. The fear faded. But something changed — a shadow in the corner of the eye, a feeling of being watched. Perhaps it would never fully go away.",
}

CHAPTER_NAMES = {
    "pt": ("Capitulo 1: O Despertar", "Capitulo 2: O Caminho", "Capitulo 3: A Verdade", "Capitulo Final: O Destino"),
    "en": ("Chapter 1: The Awakening", "Chapter 2: The Path", "Chapter 3: The Truth", "Final Chapter: Destiny"),
}

STORY_CONNECTORS = {
    "pt": ("vivia", "A partir daquele momento, nada seria como antes.", "sabia que precisava agir — o mundo nao esperaria."),
    "en": ("lived", "From that moment on, nothing would be the same.", "knew action was needed — the world would not wait."),
}


def generate_ai_story(genre: str | None = None, lang: str = "pt") -> str:
    if lang == "en":
        hero_name, hero_desc = random.choice(HEROES_EN)
        setting = random.choice(SETTINGS_EN)
        openers = GENRE_OPENERS_EN
        conflicts = CONFLICTS_EN
    else:
        hero_name, hero_desc = random.choice(HEROES)
        setting = random.choice(SETTINGS_FULL)
        openers = GENRE_OPENERS
        conflicts = CONFLICTS_CHAPTER1

    if not genre:
        genre = random.choice(list(openers.keys()))

    opener = openers.get(genre, list(openers.values())[0])
    conflict = random.choice(conflicts).format(hero_name=hero_name)
    ch_names = CHAPTER_NAMES.get(lang, CHAPTER_NAMES["pt"])
    conn = STORY_CONNECTORS.get(lang, STORY_CONNECTORS["pt"])

    story = (
        f"*— {ch_names[0]} —*\n\n"
        f"{hero_name}, {hero_desc}, {conn[0]} {setting}.\n\n"
        f"{opener}\n\n"
        f"{conflict}\n\n"
        f"{conn[1]} "
        f"{hero_name} {conn[2]}"
    )

    return story


def generate_vip_story(genre: str | None = None, lang: str = "pt") -> str:
    if lang == "en":
        hero_name, hero_desc = random.choice(HEROES_EN)
        ally_name, ally_desc = random.choice(ALLIES_EN)
        while ally_name == hero_name:
            ally_name, ally_desc = random.choice(ALLIES_EN)
        setting = random.choice(SETTINGS_EN)
        openers = GENRE_OPENERS_EN
        closers = GENRE_CLOSERS_EN
        conflicts = CONFLICTS_EN
        developments = DEVELOPMENTS_EN
        twists = TWISTS_EN
        climaxes_list = CLIMAXES_EN
        endings_list = ENDINGS_EN
    else:
        hero_name, hero_desc = random.choice(HEROES)
        ally_name, ally_desc = random.choice(ALLIES)
        while ally_name == hero_name:
            ally_name, ally_desc = random.choice(ALLIES)
        setting = random.choice(SETTINGS_FULL)
        openers = GENRE_OPENERS
        closers = GENRE_CLOSERS
        conflicts = CONFLICTS_CHAPTER1
        developments = DEVELOPMENTS_CHAPTER2
        twists = TWISTS_CHAPTER3
        climaxes_list = CLIMAXES
        endings_list = ENDINGS

    if not genre:
        genre = random.choice(list(openers.keys()))

    opener = openers.get(genre, list(openers.values())[0])
    closer = closers.get(genre, list(closers.values())[0])
    ch_names = CHAPTER_NAMES.get(lang, CHAPTER_NAMES["pt"])
    conn = STORY_CONNECTORS.get(lang, STORY_CONNECTORS["pt"])

    ch1 = random.choice(conflicts).format(hero_name=hero_name)
    ch2 = random.choice(developments).format(
        hero_name=hero_name, ally_name=ally_name, ally_desc=ally_desc
    )
    ch3 = random.choice(twists).format(
        hero_name=hero_name, ally_name=ally_name
    )
    climax = random.choice(climaxes_list).format(
        hero_name=hero_name, ally_name=ally_name
    )
    ending = random.choice(endings_list).format(
        hero_name=hero_name, ally_name=ally_name
    )

    story = (
        f"*— {ch_names[0]} —*\n\n"
        f"{hero_name}, {hero_desc}, {conn[0]} {setting}.\n\n"
        f"{opener}\n\n"
        f"{ch1}\n\n"
        f"━━━━━━━━━━━━━━━━━━━━━━\n\n"
        f"*— {ch_names[1]} —*\n\n"
        f"{ch2}\n\n"
        f"━━━━━━━━━━━━━━━━━━━━━━\n\n"
        f"*— {ch_names[2]} —*\n\n"
        f"{ch3}\n\n"
        f"━━━━━━━━━━━━━━━━━━━━━━\n\n"
        f"*— {ch_names[3]} —*\n\n"
        f"{climax}\n\n"
        f"{ending}\n\n"
        f"_{closer}_"
    )

    return story
