export interface Drama {
  id: number;
  title: string;
  genre: string;
  status: string;
  synopsis: string;
  coverImage: string;
}

export interface Episode {
  id: number;
  dramaId: number;
  number: number;
  title: string;
  synopsis: string;
  teaser: string;
  image: string;
}

// ─── Anime Character (Yuna) — Sexy Anime Style ────────────────────────────

function animeImg(prompt: string, seed: number): string {
  const encoded = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;
}

export const YUNA_PHOTO = animeImg(
  "beautiful sexy anime girl, long flowing blue hair, violet eyes, seductive gentle smile, wearing elegant revealing outfit, soft glowing lighting, ecchi anime style, detailed digital art, sensual pose, anime key visual, face and upper body portrait",
  1001,
);

export const WELCOME_AUDIO =
  "Olá querido... Eu sou a Yuna, sua narradora sensual do DoramaAI. Estou aqui para sussurrar as histórias mais quentes e emocionantes dos doramas no seu ouvido. Escolha um dorama e vamos começar essa aventura juntos... só eu e você.";

export const WELCOME_CAPTION =
  "🌸 *Yuna — Sua Narradora Sensual*\n\n✦ D O R A M A  A I ✦\n\n5 doramas · 50 episódios\nVídeos animados com D-ID\nVoz Neural sedutora em 14 idiomas";

// ─── Voice configurations ──────────────────────────────────────────────────

export const VOZES: Record<string, { label: string; didVoiceId: string }> = {
  "PT-BR": { label: "🇧🇷 Português (BR)", didVoiceId: "pt-BR-ThalitaMultilingualNeural" },
  "EN": { label: "🇺🇸 English", didVoiceId: "en-US-AvaMultilingualNeural" },
  "ES": { label: "🇪🇸 Español", didVoiceId: "es-ES-ElviraNeural" },
  "KO": { label: "🇰🇷 한국어", didVoiceId: "ko-KR-SunHiNeural" },
  "JA": { label: "🇯🇵 日本語", didVoiceId: "ja-JP-NanamiNeural" },
  "FR": { label: "🇫🇷 Français", didVoiceId: "fr-FR-DeniseNeural" },
  "IT": { label: "🇮🇹 Italiano", didVoiceId: "it-IT-ElsaNeural" },
  "DE": { label: "🇩🇪 Deutsch", didVoiceId: "de-DE-KatjaNeural" },
  "ZH": { label: "🇨🇳 中文", didVoiceId: "zh-CN-XiaoxiaoNeural" },
  "HI": { label: "🇮🇳 हिन्दी", didVoiceId: "hi-IN-SwaraNeural" },
  "RU": { label: "🇷🇺 Русский", didVoiceId: "ru-RU-SvetlanaNeural" },
  "AR": { label: "🇸🇦 العربية", didVoiceId: "ar-SA-ZariyahNeural" },
  "TR": { label: "🇹🇷 Türkçe", didVoiceId: "tr-TR-EmelNeural" },
  "TH": { label: "🇹🇭 ไทย", didVoiceId: "th-TH-PremwadeeNeural" },
};

// ─── Dramas with sexy anime cover art ──────────────────────────────────────

export const DRAMAS: Drama[] = [
  {
    id: 1,
    title: "Desejo Proibido",
    genre: "Romance Histórico Sensual",
    status: "ongoing",
    synopsis: "Na corte imperial do século XVIII, uma jovem pintora de beleza irresistível cruza o caminho de um general misterioso e temido. O que começa com um olhar acidental em um jardim proibido se transforma em uma paixão ardente e perigosa que desafia todas as leis do império. Cada encontro secreto é mais intenso que o anterior.",
    coverImage: animeImg("sexy anime girl painter, traditional silk hanbok slightly open, imperial palace garden at night, cherry blossoms, moonlight on skin, sensual pose, ecchi anime style, beautiful detailed face, romantic seductive atmosphere", 2001),
  },
  {
    id: 2,
    title: "Noite de Segredos",
    genre: "Thriller Sensual",
    status: "ongoing",
    synopsis: "Uma detetive sedutora e calculista é forçada a trabalhar com o homem que destruiu sua vida. Entre investigações perigosas e noites de tensão insuportável, a linha entre ódio e desejo se dissolve. Cada caso os aproxima mais, cada noite os testa mais.",
    coverImage: animeImg("sexy anime detective girl, tight black dress, neon city nightscape, rain on skin, mysterious seductive look, ecchi anime style, noir atmosphere, beautiful detailed face, sensual pose", 2002),
  },
  {
    id: 3,
    title: "Dragão e Fênix",
    genre: "Fantasia Sensual",
    status: "ongoing",
    synopsis: "Em um mundo de dragões e magia, uma sacerdotisa de beleza sobrenatural é capturada por um príncipe dragão. O laço místico que os une faz com que sintam tudo um do outro — inclusive o desejo. A guerra entre seus povos é nada comparada à guerra entre resistir e se entregar.",
    coverImage: animeImg("sexy anime priestess girl, magical glowing outfit revealing, phoenix fire wings, dragon prince behind her, fantasy mystical world, ecchi anime style, ethereal sensual lighting, beautiful detailed face", 2003),
  },
  {
    id: 4,
    title: "Amnésia do Coração",
    genre: "Romance Sensual Contemporâneo",
    status: "ongoing",
    synopsis: "Após um acidente, ele acorda sem memórias. Ela, sua ex-noiva de beleza hipnotizante, é designada como sua cuidadora. Ele se apaixona novamente — mas desta vez com uma intensidade que o corpo lembra mesmo quando a mente esqueceu. Cada toque é uma redescoberta ardente.",
    coverImage: animeImg("sexy anime girl, modern casual outfit slightly revealing, hospital garden sunset, wind blowing hair, emotional sensual expression, ecchi anime style, warm golden lighting, beautiful detailed face", 2004),
  },
  {
    id: 5,
    title: "Executiva de Seda",
    genre: "Romance Corporativo Sensual",
    status: "ongoing",
    synopsis: "A CEO mais desejada do mercado financeiro é forçada a se fundir com seu maior rival. Reuniões que terminam com olhares perigosos, viagens de negócios com quartos lado a lado, e uma tensão que nenhum contrato consegue conter. O poder é o afrodisíaco mais forte.",
    coverImage: animeImg("sexy anime businesswoman, elegant silk blouse partially unbuttoned, modern glass office, city skyline sunset, confident seductive pose, ecchi anime style, professional sensual, beautiful detailed face", 2005),
  },
];

// ─── Sexy anime episode images ─────────────────────────────────────────────

const IMAGES: Record<number, string[]> = {
  1: [
    animeImg("sexy anime girl in moonlit imperial garden, silk hanbok flowing, exposed shoulders, cherry blossoms falling on skin, sensual atmosphere, ecchi style, detailed beautiful", 3001),
    animeImg("sexy anime girl posing for painting, silk robe slipping off shoulder, candle lit atelier, warm shadows on curves, ecchi style, sensual art studio", 3002),
    animeImg("sexy anime couple at imperial banquet, girl in revealing elegant dress, intense eye contact, ecchi style, romantic tension", 3003),
    animeImg("sexy anime girl sheltering from storm, wet silk clothes clinging to body, candlelight temple, ecchi style, intimate atmosphere", 3004),
    animeImg("sexy anime girl lying in flower field, flowing hair, dreamy expression, silk dress, ecchi style, golden hour lighting", 3005),
    animeImg("sexy anime girl running through forest at night, torn silk hanbok, moonlight on skin, ecchi style, dramatic escape scene", 3006),
    animeImg("sexy anime girl in mountain cabin, wrapped in fur blanket, firelight on skin, ecchi style, cozy intimate scene", 3007),
    animeImg("sexy anime girl reading letter by window, tears and determination, loose silk robe, ecchi style, emotional scene", 3008),
    animeImg("sexy anime girl hiding behind palace column, intense expression, elegant revealing outfit, ecchi style, dramatic scene", 3009),
    animeImg("sexy anime couple walking through golden gate, sunlight, flowing silk clothes, ecchi style, triumphant romantic scene", 3010),
  ],
  2: [
    animeImg("sexy anime detective girl, tight outfit, dark office with case files, city lights, seductive serious look, ecchi style, noir atmosphere", 3011),
    animeImg("sexy anime girl undercover in nightclub, revealing elegant dress, neon lights, dancing pose, ecchi style, sensual atmosphere", 3012),
    animeImg("sexy anime detective girl, interrogation room, unbuttoned shirt, dramatic lighting, intense expression, ecchi style", 3013),
    animeImg("sexy anime girl in rain, wet clothes clinging, city neon reflections, action pose, ecchi style, dramatic scene", 3014),
    animeImg("sexy anime girl taking cover behind wall, tactical outfit tight on body, adrenaline, ecchi style, action scene", 3015),
    animeImg("sexy anime girl treating wound, gentle caring pose, hospital bed scene, soft lighting, ecchi style, intimate moment", 3016),
    animeImg("sexy anime detective girl working late, glasses, loose shirt, laptop glow, coffee, ecchi style, focused sensual", 3017),
    animeImg("sexy anime girl in confrontation, fierce expression, tight tactical outfit, dramatic lighting, ecchi style", 3018),
    animeImg("sexy anime girl leading tactical operation, night mission, tight outfit, confident pose, ecchi style, action", 3019),
    animeImg("sexy anime couple at sunrise on rooftop, wind blowing clothes, golden light, romantic, ecchi style, tender moment", 3020),
  ],
  3: [
    animeImg("sexy anime priestess in ancient temple, revealing ritual outfit, magical glowing runes, ecchi fantasy style, mystical sensual", 3021),
    animeImg("sexy anime girl meeting dragon prince in enchanted forest, revealing magical outfit, glowing particles, ecchi fantasy style", 3022),
    animeImg("sexy anime girl casting magic spell, energy flowing around body, revealing mage outfit, ecchi fantasy style, powerful pose", 3023),
    animeImg("sexy anime girl with fire phoenix wings, floating in sky, revealing battle outfit, ecchi fantasy style, epic scene", 3024),
    animeImg("sexy anime priestess in mystical ceremony, glowing thread connecting to partner, moonlit shrine, ecchi fantasy style", 3025),
    animeImg("sexy anime couple in hidden valley paradise, nature, revealing outfits, ecchi fantasy style, peaceful sensual", 3026),
    animeImg("sexy anime girl using healing magic, golden flames around body, caring expression, revealing outfit, ecchi fantasy style", 3027),
    animeImg("sexy anime priestess speaking before council, powerful pose, elegant revealing outfit, grand hall, ecchi fantasy style", 3028),
    animeImg("sexy anime girl with glowing wings of light, transformation scene, revealing, ecchi fantasy style, ethereal beautiful", 3029),
    animeImg("sexy anime couple as guardians of peace, powerful poses, matching revealing outfits, ecchi fantasy style, epic finale", 3030),
  ],
  4: [
    animeImg("sexy anime girl visiting hospital, modern outfit, emotional beautiful expression, soft warm lighting, ecchi style", 3031),
    animeImg("sexy anime girl walking in autumn park, wind lifting skirt slightly, golden leaves, ecchi style, nostalgic sensual", 3032),
    animeImg("sexy anime girl looking at photos alone, cozy apartment, oversized shirt, rain on window, ecchi style, emotional", 3033),
    animeImg("sexy anime girl at seaside pier, sundress blowing in wind, sunset, wet from waves, ecchi style, romantic", 3034),
    animeImg("sexy anime couple under cherry blossom tree, intimate moment, spring, ecchi style, romantic tender", 3035),
    animeImg("sexy anime girl on park bench, casual revealing outfit, emotional conversation, ecchi style, golden hour", 3036),
    animeImg("sexy anime girl in bed remembering, moonlight through window, silk nightgown, ecchi style, emotional intimate", 3037),
    animeImg("sexy anime girl making decision, determined expression, modern outfit, city background, ecchi style", 3038),
    animeImg("sexy anime girl at sunset proposal scene, beautiful dress, tears of joy, ecchi style, romantic", 3039),
    animeImg("sexy anime bride, elegant wedding dress, golden sunset ceremony, ecchi style, beautiful romantic finale", 3040),
  ],
  5: [
    animeImg("sexy anime businesswoman in corner office, silk blouse, city skyline, powerful seductive pose, ecchi style, corporate", 3041),
    animeImg("sexy anime businesswoman in late night meeting, loosened tie, glasses, intense discussion, ecchi style, corporate sensual", 3042),
    animeImg("sexy anime woman at elegant dinner, low cut evening dress, wine glass, city lights, ecchi style, sophisticated sensual", 3043),
    animeImg("sexy anime businesswoman working late, shirt unbuttoned, laptop glow, high heels, ecchi style, corporate night", 3044),
    animeImg("sexy anime woman at formal gala, stunning revealing evening gown, grand ballroom, ecchi style, elegant sensual", 3045),
    animeImg("sexy anime businesswoman on private jet, elegant outfit, looking out window at clouds, ecchi style, luxury", 3046),
    animeImg("sexy anime woman on magazine cover, powerful confident pose, designer outfit, ecchi style, media attention", 3047),
    animeImg("sexy anime businesswoman in boardroom confrontation, fierce expression, silk suit, ecchi style, power move", 3048),
    animeImg("sexy anime power couple at press conference, matching elegant outfits, confident, ecchi style, corporate victory", 3049),
    animeImg("sexy anime woman on office balcony at sunset, silk scarf in wind, romantic, ecchi style, beautiful finale", 3050),
  ],
};

// ─── Sensual Episode data ──────────────────────────────────────────────────

const EPISODES_DATA: Record<number, { title: string; synopsis: string; teaser: string }[]> = {
  1: [
    {
      title: "O Jardim Proibido",
      teaser: "Um encontro proibido no jardim do palácio... ela nunca deveria ter olhado nos olhos dele. Mas quando olhou, o calor que sentiu a consumiu por dentro.",
      synopsis: "No jardim secreto do palácio imperial, onde nenhuma mulher deveria entrar, a pintora Mei caminhava sozinha ao luar, o tecido fino do seu hanbok deslizando sobre a pele com cada passo. Então ele apareceu — o General Han, olhar intenso que a despiu antes mesmo de falar. Por um segundo eterno, seus olhos se encontraram. Ela sentiu o calor subir pela pele como se o próprio sol tivesse descido para queimá-la. A brisa quente da noite carregava o perfume das flores e o perigo daquele desejo. Quando ela tropeçou, ele a segurou pela cintura — e nenhum dos dois conseguiu soltar. O toque das mãos dele sobre sua cintura foi uma sentença. Um desejo nasceu ali, regado por luar e pecado.",
    },
    {
      title: "A Pintura Perigosa",
      teaser: "Ela foi convocada para retratá-lo... mas quando ele removeu a armadura, ela descobriu que não conseguiria manter as mãos firmes.",
      synopsis: "A convocação chegou ao amanhecer: retratar o General Han. Quando ele removeu a armadura diante dela, Mei precisou morder o lábio com força para não trair o que sentia. O corpo dele era uma obra de arte — ombros largos, pele marcada por cicatrizes que contavam histórias de poder. A cada pincelada cautelosa, sua respiração ficava mais pesada. Ele percebeu. E em vez de se cobrir, deu um passo em sua direção. Quando o pincel de Mei roçou acidentalmente a cicatriz no peito dele, ambos prenderam a respiração. O silêncio ficou denso, carregado de tudo que não podia ser dito. Naquela tarde, a tela capturou muito mais que um retrato.",
    },
    {
      title: "O Segredo da Corte",
      teaser: "Precisavam fingir ser um casal. Mas quando os corpos se aproximaram, a farsa ficou perigosamente real.",
      synopsis: "A missão exigia que fingissem ser marido e mulher por uma noite no banquete real. Mei usava um quimono de seda carmesim que acariciava cada curva do seu corpo, e quando o braço de Han envolveu sua cintura, um fio elétrico percorreu a espinha dela. Ele se inclinou para sussurrar instruções em seu ouvido, e seus lábios quase tocaram a curva do pescoço dela. O arrepio foi visível. A sala inteira os observava como um casal apaixonado — sem saber que a performance estava perigosamente perto de ser real. Quando a música tocou e ele a puxou para dançar, os corpos colaram e o mundo desapareceu.",
    },
    {
      title: "A Noite da Tempestade",
      teaser: "Presos juntos, roupas molhadas, uma única vela. A tempestade lá fora não era nada comparada ao que acontecia entre eles.",
      synopsis: "A pousada abandonada tinha apenas um quarto. A chuva havia encharcado as roupas de ambos, e o tecido molhado colava na pele revelando cada contorno. Uma vela. Dois corpos tremendo — não de frio. Enquanto o vento uivava lá fora, Han contou sobre a dor que carregava. Mei ouviu com os olhos brilhando, e quando as lágrimas desceram, ele as enxugou uma a uma com o polegar, cada toque mais demorado que o anterior. A ponta dos dedos dele percorreu a linha do rosto dela até o queixo. Nenhum dos dois dormiu naquela noite. Ficaram acordados sentindo o peso irresistível do que crescia entre eles.",
    },
    {
      title: "O Decreto Imperial",
      teaser: "Ele foi obrigado a se casar com outra. Mei desapareceu. Quando ele a encontrou, o que disse fez a pele dela arder.",
      synopsis: "O decreto era claro: Han casaria com a Princesa do Norte. Mei desapareceu por três dias. Quando ele a encontrou numa clareira distante, ela pintava com as costas nuas ao sol da tarde. Ele ficou parado observando — a suavidade das pinceladas, a curva das costas, o jeito que os cabelos caíam sobre os ombros. Então sentou ao lado dela. No silêncio, a mão dele encontrou a dela. E naquele toque, ele tomou a decisão que mudaria tudo: não obedeceria ao imperador. Puxou-a para si e selou a promessa com um beijo que durou até as estrelas aparecerem.",
    },
    {
      title: "A Fuga",
      teaser: "A guarda os descobriu. Na corrida, ele foi ferido. E quando ela curou suas feridas naquela noite, as mãos dela descobriram muito mais que cicatrizes.",
      synopsis: "Han pegou a mão de Mei e correu. No templo antigo, ela percebeu o sangue no ombro dele. Com mãos trêmulas, rasgou a barra do seu quimono e pressionou contra a ferida. A pele dele era quente sob seus dedos. Ele prendeu a respiração — não de dor. Enquanto ela limpava o sangue, os dedos dela percorreram os contornos do ombro, do pescoço, da mandíbula. Entre velas e sombras dançantes, ele finalmente disse em voz rouca o que seus olhos gritavam. E ela respondeu sem palavras — com os lábios contra os dele, as mãos nos cabelos dele, o corpo contra o corpo dele.",
    },
    {
      title: "O Refúgio nas Montanhas",
      teaser: "Na cabana isolada, sem regras e sem testemunhas, eles finalmente se entregaram ao que sentiam.",
      synopsis: "A cabana nas montanhas nevadas era pequena — uma cama, uma lareira, e todo o calor que precisavam. De dia, ele cortava lenha sem camisa enquanto ela o desenhava com olhos famintos. De noite, dormiam enrolados um no outro sob peles grossas, a pele contra a pele. Ela traçava as cicatrizes das costas dele com a ponta dos dedos enquanto ele adormecia, memorizando cada linha como se fosse um mapa do tesouro. Cada amanhecer, ele acordava e ficava observando o rosto dela adormecido — os lábios entreabertos, os cabelos espalhados, a paz que só existia ali.",
    },
    {
      title: "O Retorno Inevitável",
      teaser: "O pai dela foi preso. Ela precisava partir. A última noite juntos foi a mais intensa de todas.",
      synopsis: "A carta dizia que o pai de Mei seria executado. Ela precisava voltar. Na última noite na cabana, enquanto as chamas da lareira projetavam sombras douradas sobre os dois, nenhum dormiu. Ficaram gravando tudo — o som da respiração, o calor de cada toque demorado, o cheiro dos cabelos, a textura da pele. Cada segundo foi vivido como se fosse o último. As mãos dele percorreram cada centímetro que conhecia de cor. Os lábios dela decoraram cada cicatriz. Ao amanhecer, ela partiu com o corpo ainda tremendo e o coração em chamas.",
    },
    {
      title: "A Última Batalha",
      teaser: "Han voltou para a corte disfarçado. Do outro lado do salão, Mei assistia segurando contra o peito o único presente que ele lhe dera.",
      synopsis: "O confronto foi rápido e brutal. Han apresentou as provas da traição do ministro com a precisão de um general e a frieza de quem já perdeu tudo que importava. Mei assistia de trás de uma coluna, os dedos apertados no pincel que ele havia lhe dado, pressionado entre os seios como uma relíquia sagrada. Quando a guarda prendeu o ministro, ela fechou os olhos e respirou pela primeira vez em dias. Ele a encontrou atrás da coluna. Os olhos se encontraram. E todo o salão desapareceu.",
    },
    {
      title: "Além do Império",
      teaser: "Livres. Os portões do palácio se abriram. E o que veio depois foi mais quente que qualquer proibição.",
      synopsis: "O imperador concedeu a liberdade. Han e Mei caminharam pelo grande portão dourado sem olhar para trás. A luz do sol caiu sobre eles como uma bênção. Ela riu — um riso solto, livre, sensual. Ele parou de caminhar só para ouvi-la. Depois puxou-a pelos ombros e a abraçou ali mesmo, diante de todos. Ela enterrou o rosto no peito dele e sentiu, pela primeira vez, que estava exatamente onde deveria estar. A estrada se abria longa e dourada. E ele sussurrou no ouvido dela: agora, somos só nós. Para sempre. Sem regras. Sem limites.",
    },
  ],
  2: [
    {
      title: "O Arquivo Secreto",
      teaser: "O homem que destruiu sua vida agora era seu parceiro. O aperto de mão durou três segundos a mais do que deveria.",
      synopsis: "A detetive Soo-Ah abriu o arquivo e viu o nome que passara cinco anos tentando esquecer: Ji-Ho. Seu novo parceiro. Quando ele entrou na sala com aquela confiança irritante e sexy, cinco anos de silêncio colidiram em dois segundos. Ele estendeu a mão. Ela apertou com força — mas o toque durou demais. A palma dele era quente e firme. Ela odiava como seu corpo reagia. A tensão na sala era palpável. Todos perceberam. Ninguém disse nada.",
    },
    {
      title: "A Primeira Pista",
      teaser: "Disfarçados de casal em um clube de luxo. O braço dele ao redor dela. Os lábios dele no cabelo dela. E nada era fingido.",
      synopsis: "O clube exigia casais. Ji-Ho colocou o braço ao redor da cintura dela com uma naturalidade perturbadora. O calor da mão dele através do tecido fino do vestido foi muito mais real do que performance. Ela inclinou a cabeça para o ombro dele e sentiu os lábios dele roçarem o topo do seu cabelo. O arrepio que desceu pela espinha não era técnico. Na pista, com luzes baixas e música que pulsava, os corpos se aproximaram naturalmente. A boca dele encontrou o ouvido dela para sussurrar a próxima jogada. Ela fechou os olhos e odiou como aquilo parecia absolutamente certo.",
    },
    {
      title: "Noite de Interrogatório",
      teaser: "O interrogatório durou até o amanhecer. O olhar dele sobre ela a noite inteira queimava mais que qualquer lâmpada.",
      synopsis: "A noite foi longa e o suspeito era duro. Mas Soo-Ah era mais dura. Ji-Ho a observava trabalhar com uma admiração que não conseguia esconder. A camisa dela estava com os primeiros botões abertos pelo calor, o cabelo preso num coque desarrumado. Cada vez que ela se inclinava sobre a mesa, ele desviava o olhar — e voltava. Quando o sol nasceu, ele trouxe café e se sentou ao lado dela. Seus joelhos se tocaram sob a mesa. Nenhum dos dois se afastou.",
    },
    {
      title: "O Corpo no Rio",
      teaser: "O caso ficou pessoal. E quando ele baixou a guarda, ela viu algo que a fez querer tocá-lo.",
      synopsis: "O corpo encontrado tinha conexão com o passado de Ji-Ho. Pela primeira vez, ela viu vulnerabilidade onde antes só via arrogância. No carro, voltando da cena do crime, ele ficou em silêncio. Ela estendeu a mão e colocou sobre a dele no câmbio. Ele virou a palma para cima e entrelaçou os dedos nos dela. Ficaram assim por vinte minutos sem dizer uma palavra. O toque era suave, quente e cheio de tudo que cinco anos de silêncio haviam represado.",
    },
    {
      title: "Emboscada",
      teaser: "Tiros. Escuridão. O corpo dele prensado contra o dela atrás de uma coluna. Respirações pesadas. Adrenalina. Desejo.",
      synopsis: "O armazém abandonado era uma armadilha. Quando os tiros começaram, Ji-Ho puxou Soo-Ah para trás de uma coluna. Ficaram comprimidos no escuro, os peitos colados, respirações pesadas misturadas. O coração dele batia contra o peito dela. Na adrenalina pura, o rosto dele ficou a centímetros do dela. Os lábios quase se tocaram. Uma bala ricocheteou e ele a cobriu com o corpo inteiro. Quando o silêncio voltou, nenhum dos dois se moveu. Ficaram ali, abraçados no escuro, por muito mais tempo do que a segurança exigia.",
    },
    {
      title: "Cicatrizes",
      teaser: "Ela limpava os ferimentos dele no hospital. Os dedos dela na pele dele. E então ele contou a verdade que mudou tudo.",
      synopsis: "No hospital, Soo-Ah limpava o corte no braço dele com cuidado. Cada toque dos dedos dela na pele dele era calculado — e ao mesmo tempo, tremendo. Ele finalmente contou: a denúncia de cinco anos atrás foi para protegê-la de um esquema que custaria a vida dela. Ela parou de limpar. Olhou nos olhos dele. Cinco anos de ódio se dissolveram em segundos. A mão dela subiu do braço para o ombro, depois para o rosto. Ele fechou os olhos ao sentir os dedos dela na mandíbula. Uma única palavra saiu dos lábios dela, e mudou tudo entre eles para sempre.",
    },
    {
      title: "A Rede",
      teaser: "Descobriram a rede criminosa inteira. Trabalharam juntos como nunca. Os pensamentos em sincronia. Os corpos também.",
      synopsis: "As peças se encaixaram de uma vez: uma rede criminosa gigantesca. Soo-Ah e Ji-Ho trabalharam como uma máquina perfeita, completando frases, antecipando movimentos. Noites no escritório, comida chinesa fria, café em excesso. Quando ela adormeceu sobre os papéis às três da manhã, ele tirou o próprio casaco e cobriu seus ombros. Os dedos dele roçaram o pescoço dela ao ajustar a gola. Ela suspirou dormindo. Ele ficou olhando por longos minutos, decorando cada linha do rosto que sempre amou.",
    },
    {
      title: "O Traidor",
      teaser: "O traidor estava dentro da delegacia. A confiança quebrou. Mas quando olhou para ele, viu a única certeza que restava.",
      synopsis: "Alguém vazava informações. As provas apontavam para dentro. Soo-Ah não sabia mais em quem confiar. Naquela noite, no estacionamento vazio, ela encostou na parede e fechou os olhos. Ele apareceu. Ficou na frente dela e disse: olha pra mim. Ela abriu os olhos. No escuro, com apenas a luz do poste, os olhos dele eram a coisa mais honesta que ela já havia visto. Ele se aproximou. A testa dele encostou na dela. Ficaram assim, respirando o mesmo ar, até ela finalmente sussurrar: eu sei que é você. A única pessoa que eu confio.",
    },
    {
      title: "A Operação Final",
      teaser: "Uma noite. Uma chance. Ela liderou. Ele cobriu suas costas. E quando acabou, o sorriso dela iluminou a madrugada.",
      synopsis: "A operação final foi impecável. Soo-Ah liderou com precisão cirúrgica. Ji-Ho cobriu suas costas como se fosse a coisa mais natural do mundo. Quando o líder da rede foi preso e as sirenes pararam, ela se virou para ele. O sorriso era o primeiro genuíno em cinco anos. Ele sorriu de volta. No meio da madrugada, cercados por policiais e luzes vermelhas e azuis, os dois se olharam como se estivessem completamente sozinhos no mundo.",
    },
    {
      title: "Amanhecer",
      teaser: "O caso acabou. Mas a história deles? Estava apenas começando. O sol nasceu dourado... e os lábios finalmente se encontraram.",
      synopsis: "Em frente à delegacia ao amanhecer, exaustos e aliviados, ficaram lado a lado em silêncio. O sol nascia dourado sobre a cidade que haviam salvado. Ele perguntou se ela aceitaria jantar — não como parceiros, não como ex-colegas, mas como duas pessoas que finalmente tinham coragem de recomeçar. Ela virou para ele. A mão dela encontrou o colarinho da camisa dele. Puxou devagar. Os lábios se encontraram pela primeira vez em cinco anos — suaves, depois urgentes, depois desesperados. Quando se separaram, ela sussurrou contra a boca dele: demorou. Ele riu e a beijou de novo.",
    },
  ],
  3: [
    {
      title: "O Ritual Sagrado",
      teaser: "Capturada por um dragão durante o ritual mais sagrado. Quando ele se transformou em homem, ela não conseguiu desviar o olhar.",
      synopsis: "O templo tremia quando o príncipe dragão desceu do céu. Em forma humana, ele era devastadoramente belo — olhos de ouro líquido, pele que brilhava. A sacerdotisa Hana manteve os olhos abertos enquanto todos fugiam. Ele se aproximou. Ela não recuou. O laço místico se formou como um raio entre eles — ela sentiu o calor dele percorrer cada célula do seu corpo. Ela arqueou as costas involuntariamente. Ele arregalou os olhos. Ambos souberam naquele instante: estavam perdidos.",
    },
    {
      title: "O Laço Místico",
      teaser: "Conectados magicamente. Ela sentia tudo que ele sentia. Inclusive quando ele pensava nela à noite.",
      synopsis: "O laço era implacável. Quando ele sentia raiva, ela sentia o fogo. Quando ela sentia tristeza, ele sentia o gelo. Mas o pior — ou o melhor — eram as noites. Quando um pensava no outro, o calor atravessava o laço como uma onda. Ela acordava com a pele quente e o coração acelerado. Ele acordava com o perfume dela nos lábios. A distância não ajudava. A proximidade era perigosa. E cada dia que passava, a resistência enfraquecia.",
    },
    {
      title: "Treino de Fogo",
      teaser: "Ele decidiu treiná-la. Cada sessão envolvia contato físico, energia fluindo entre os corpos, e uma tensão que o ar não suportava.",
      synopsis: "O treino exigia proximidade. As mãos dele guiavam as dela, moldando a energia. Cada toque fazia o laço pulsar mais forte. Quando ele a segurava por trás para corrigir a postura, a respiração quente dele no pescoço dela fazia a magia explodir em faíscas visíveis. Ele se afastava rápido. Ela fingia que não notava o tremor nas mãos dele. Mas o laço não mentia — ela sentia exatamente o que ele sentia. E era intenso, urgente e impossível de ignorar.",
    },
    {
      title: "A Profecia",
      teaser: "A profecia dizia que um dragão e uma fênix se uniriam de corpo e alma. Eles eram a profecia.",
      synopsis: "O pergaminho ancestral foi encontrado nas ruínas. A profecia falava de um dragão e uma fênix cujo amor seria a ponte entre dois mundos — uma união não apenas espiritual, mas total. Hana e o príncipe leram juntos. Quando seus olhos se encontraram sobre as palavras, o laço entre eles brilhou tão forte que iluminou todo o templo. A verdade era inescapável. E o que sentiam um pelo outro não era fraqueza — era o destino.",
    },
    {
      title: "A Batalha dos Céus",
      teaser: "No meio da batalha, entre fogo e magia, ele gritou o nome dela. E tudo parou.",
      synopsis: "O céu explodiu em fogo quando os exércitos se encontraram. Hana flutuava no centro do caos, o poder da fênix emanando do seu corpo em chamas douradas. O vestido de batalha colava na pele, o cabelo voava como chamas. O príncipe dragão lutava ao lado dos seus, mas seus olhos buscavam os dela a cada segundo. Quando ela ergueu as mãos e o poder explodiu, ambos os lados pararam. Ele voou até ela. No ar, entre faíscas de magia, os dois se encontraram. O laço brilhou como um sol.",
    },
    {
      title: "O Exílio",
      teaser: "Banidos dos dois mundos. Sozinhos em um vale escondido. Sem regras. Sem olhos. Sem limites.",
      synopsis: "O vale escondido era um paraíso esquecido. Ninguém os encontraria ali. Pela primeira vez, estavam completamente sozinhos — sem exércitos, sem conselhos, sem olhares julgando. Construíram um abrigo sob as estrelas. A primeira noite foi a mais silenciosa e a mais intensa. O laço entre eles pulsava com uma frequência que tornava impossível manter distância. A pele dela brilhava sob a luz da lua. Os olhos dele brilhavam com fogo de dragão. O vale inteiro pareceu suspirar quando a distância entre eles finalmente desapareceu.",
    },
    {
      title: "A Cura",
      teaser: "Ele foi envenenado. A única cura era o poder da fênix. E o poder da fênix exigia contato total.",
      synopsis: "O veneno se espalhava pelo corpo dele como gelo negro. Hana segurou as mãos dele e deixou o poder fluir. Mas não era suficiente. A cura exigia proximidade total — pele contra pele, coração contra coração. Chamas douradas envolveram os dois enquanto ela queimava o veneno de dentro dele. O processo durou horas. Quando ele abriu os olhos, ela estava sobre ele, exausta, sorrindo com lágrimas no rosto. Ele levantou a mão e tocou o rosto dela como se fosse a coisa mais preciosa do universo.",
    },
    {
      title: "O Conselho dos Anciãos",
      teaser: "Diante de dois mundos em guerra, eles ficaram no centro, de mãos dadas. E o amor venceu o ódio.",
      synopsis: "O grande salão estava dividido. Anciãos de um lado, sacerdotes do outro. Hana e o príncipe ficaram no centro, de mãos dadas, como a ponte viva entre dois mundos. O laço entre eles brilhava para todos verem. As palavras de Hana ecoaram com a força de mil trovões: o amor deles não era uma fraqueza — era a prova de que a paz era possível. Quando terminou de falar, o silêncio durou dez segundos. Depois, aplausos.",
    },
    {
      title: "A Transformação",
      teaser: "Asas de luz brotaram das costas de Hana. Ela não era mais humana. Era algo mais. Algo divino.",
      synopsis: "As asas apareceram ao amanhecer — translúcidas e douradas, brotando das costas de Hana como pétalas de fogo. O tecido do vestido rasgou suavemente para dar espaço. O príncipe a viu voar pela primeira vez e caiu de joelhos — não de tristeza, mas de reverência e desejo. Ela era a coisa mais bela que já existira. O laço entre eles explodiu em cores que nenhum olho mortal poderia descrever. Ela desceu até ele e segurou seu rosto. Ele beijou as palmas das mãos dela.",
    },
    {
      title: "O Novo Mundo",
      teaser: "Dois mundos unidos. Duas almas fundidas. O amor como a magia mais poderosa que existe.",
      synopsis: "O tratado de paz foi assinado sob as estrelas. Hana e o príncipe eram guardiões da nova era. Quando a cerimônia terminou e a multidão se dispersou, ficaram sozinhos no campo sob a Via Láctea. Ele se transformou em dragão pela última vez — gigantesco, brilhante, magnífico. Ela subiu nas costas dele e voaram acima das nuvens. Lá em cima, onde o ar era fino e as estrelas estavam perto o suficiente para tocar, ele se transformou de volta em forma humana. E entre estrelas e silêncio, provaram que o amor é a magia mais poderosa que existe.",
    },
  ],
  4: [
    {
      title: "O Despertar",
      teaser: "Ele abriu os olhos e não reconheceu nada. Mas quando viu o rosto dela, seu corpo reagiu antes da mente.",
      synopsis: "A primeira coisa que viu foi o rosto de uma mulher que tirava o fôlego. Olhos brilhantes cheios de uma emoção que ele não entendia. Ela disse o nome dele. Não reconheceu. Mas quando a mão dela tocou a dele, algo se moveu dentro do peito — um calor inexplicável, uma familiaridade que a mente negava mas o corpo confirmava. As lágrimas nos olhos dela disseram tudo. Ele quis enxugá-las. Não sabia por quê.",
    },
    {
      title: "Fragmentos",
      teaser: "Flashes de memória. O perfume dela. O riso dela. A pele dela. O corpo lembrava o que a mente esqueceu.",
      synopsis: "Um perfume despertava algo. Uma música fazia o coração acelerar sem motivo. O jeito que ela mordia o lábio quando estava nervosa provocava uma reação que ele não conseguia explicar. Fragmentos apareciam como vagalumes — o toque de lábios macios, mãos percorrendo cabelos, pele quente contra pele quente. Ele acordava de madrugada com o corpo tremendo de memórias que a mente não alcançava. O coração lembrava cada centímetro do que a mente havia esquecido.",
    },
    {
      title: "O Diário",
      teaser: "Ela encontrou o diário dele. Cada página era um poema sobre o corpo e a alma dela.",
      synopsis: "O diário estava escondido na gaveta. Cada página era uma declaração ardente. Ele descrevia os olhos dela como oceanos, os lábios como provocação, a curva do pescoço como o ponto onde perdia toda a razão. Descrevia noites e manhãs, sussurros e suspiros. Ela leu cada palavra com as mãos tremendo e o rosto em chamas. Quando terminou, fechou o diário e abraçou contra o peito. O homem que escreveu aquelas palavras estava a um quarto de distância — e não lembrava de nada.",
    },
    {
      title: "Novo Começo",
      teaser: "Sem memórias, ele se apaixonou de novo. Do zero. E desta vez, com uma intensidade que surpreendeu até ela.",
      synopsis: "Ele não sabia que já a havia amado. Então fez tudo de novo — trouxe flores, fez piadas, olhou para ela como se fosse a única pessoa no mundo. Mas desta vez, sem as barreiras do passado, a intensidade era avassaladora. Cada olhar durava demais. Cada toque acidental fazia os dois pararem de respirar. Quando os dedos dele roçaram os lábios dela para limpar uma gota de café, o mundo inteiro pareceu congelar. Ele se apaixonava de novo, e era ainda mais ardente da segunda vez.",
    },
    {
      title: "A Foto",
      teaser: "Uma foto antiga caiu. Nela, dois corpos entrelaçados sorrindo como se nada pudesse separá-los.",
      synopsis: "A foto mostrava os dois na praia ao pôr do sol, abraçados com a intimidade de quem conhece cada segredo do outro. O corpo dela encaixado no dele como peça de quebra-cabeça. Ele olhou e sentiu uma dor que não era física — era saudade de algo que não conseguia lembrar. Perguntou se haviam sido felizes. Ela respondeu com honestidade que cortou: sim, absurdamente felizes. Até que deixaram de ser. O silêncio depois dessa resposta durou uma eternidade.",
    },
    {
      title: "A Verdade",
      teaser: "Ela contou por que terminaram. A verdade era mais dolorosa e mais sensual do que ele imaginava.",
      synopsis: "No banco do parque onde ele a havia pedido em namoro — embora não lembrasse — ela contou tudo. O trabalho que os afastou. As noites sozinha enquanto ele viajava. As discussões que terminavam com portas batendo ou com beijos desesperados. O noivado desfeito uma semana antes do acidente. Ele ouviu em silêncio. Depois segurou as mãos dela, olhou nos olhos e disse: eu não lembro de nada disso. Mas sei que meu corpo inteiro treme quando você está perto. E isso é tudo que preciso saber.",
    },
    {
      title: "O Medo",
      teaser: "As memórias voltaram em avalanche. E com elas, o medo de repetir cada noite perdida, cada beijo desperdiçado.",
      synopsis: "As memórias voltaram de uma vez — cada briga, cada noite em silêncio, cada momento em que escolheu o trabalho em vez dela. Mas também cada beijo, cada manhã acordando juntos, cada sussurro no escuro. Ele teve medo. Medo de ser quem era antes. Ela segurou a mão dele e disse: você não precisa ser quem era. Pode ser quem quer ser. Eu estou aqui para o novo você. O alívio no rosto dele foi como o sol rompendo nuvens.",
    },
    {
      title: "A Escolha",
      teaser: "Todas as memórias de volta. A escolha na frente dele: o passado que falhou ou o futuro com ela.",
      synopsis: "Com todas as memórias restauradas, ele sabia exatamente quem ela era — cada toque, cada segredo compartilhado no escuro, cada promessa quebrada. A escolha era clara: carregar o peso dos erros ou ter a coragem de recomeçar. Ele foi até ela. Segurou o rosto dela com as duas mãos. Olhou nos olhos com toda a intensidade de um homem que já amou, perdeu, esqueceu e amou de novo. E disse: eu escolho você. Todas as vezes.",
    },
    {
      title: "O Pedido",
      teaser: "No mesmo lugar onde tudo começou, ele ajoelhou. Desta vez, não pediu para ela ser sua noiva. Pediu algo maior.",
      synopsis: "O parque ao pôr do sol. O mesmo banco. O mesmo perfume. Mas duas pessoas diferentes — melhores, mais sábias, mais famintas uma pela outra. Ele ajoelhou com um anel de safira — porque ela disse uma vez que diamantes eram convencionais demais, e ele lembrava agora. Não pediu para ela ser sua noiva. Pediu para ela ser sua segunda chance, seu recomeço, a história que ele queria reescrever. Ela disse sim antes que ele terminasse a frase. E o beijo que se seguiu fez o pôr do sol parecer pálido.",
    },
    {
      title: "Para Sempre, De Novo",
      teaser: "O casamento. Os votos que fizeram todos chorarem. E a certeza de que alguns amores são feitos para arder duas vezes.",
      synopsis: "O casamento foi simples — apenas eles, flores e o pôr do sol. Quando ele disse os votos, incluiu a frase que destruiu todas as defesas: obrigado por me amar duas vezes. Mesmo quando eu esqueci como te amar de volta. Ela sorriu com lágrimas nos olhos e respondeu: eu nunca parei. A mente esqueceu, mas o corpo, o coração, a alma — sempre souberam. Quando ele a beijou como marido, foi o beijo mais longo e mais intenso que já tinham trocado. A amnésia do coração finalmente foi curada — pelo único remédio que funciona: o amor que se recusa a morrer.",
    },
  ],
  5: [
    {
      title: "A Fusão",
      teaser: "Dois impérios corporativos. Dois líderes que se odeiam. Um aperto de mão que durou tempo demais e apertou forte demais.",
      synopsis: "A sala de reuniões do 52º andar era o ringue. Ela de um lado — CEO implacável, tailleur de seda que abraçava cada curva com precisão. Ele do outro — rival arrogante, sorriso perigoso, olhar que despia sem pedir licença. A fusão era inevitável. A hostilidade, eletrizante. Quando os olhares se cruzaram, o ar ficou denso. Ela estendeu a mão com um sorriso afiado. Ele apertou com firmeza, segurando um segundo a mais do que o protocolo permitia. A guerra corporativa havia começado — e era a mais sensual do mercado.",
    },
    {
      title: "O Projeto Secreto",
      teaser: "Um projeto sigiloso. Só os dois podiam ter acesso. Noites trancados no mesmo escritório.",
      synopsis: "O projeto exigia sigilo absoluto — apenas os dois. Noites no escritório, comida delivery, café em excesso. Às duas da manhã, sem gravata e com os primeiros botões abertos, ele era perigosamente atraente. Ela tirou os sapatos e cruzou as pernas sobre a cadeira. Ele fingiu não notar as pernas. Quando se inclinaram sobre o mesmo relatório e os ombros se tocaram, nenhum se afastou. Ela odiava admitir que ele era brilhante. Ele odiava admitir que ela era ainda mais — e que o perfume dela o estava enlouquecendo.",
    },
    {
      title: "O Jantar",
      teaser: "Um jantar de negócios que virou outra coisa. Vinho caro, conversa sem filtro, e a chuva que os pegou na saída.",
      synopsis: "O restaurante tinha estrelas Michelin e uma vista que brilhava como diamantes. O vinho era caro e a conversa, pela primeira vez, não era sobre trabalho. Ela riu de uma piada dele — uma risada real, cabeça jogada para trás, pescoço exposto. Ele esqueceu por um segundo que era sua rival. Quando saíram, a chuva os pegou. Correram juntos para o carro, rindo. Dentro do carro, molhados e ofegantes, ficaram em silêncio. A blusa de seda dela estava translúcida. Ele olhou. Ela percebeu. Nenhum dos dois disse nada. A tensão era insuportável.",
    },
    {
      title: "A Sabotagem",
      teaser: "Alguém sabotava a fusão. As evidências apontavam para ele. Ela o confrontou. E algo quebrou entre eles.",
      synopsis: "Os números não fechavam. Vazamento para a concorrência. Todas as evidências apontavam para ele. Ela o confrontou na sala dele à noite, porta fechada, voz baixa e perigosa. Ele se levantou e caminhou até ela — devagar, predatório. Ficaram a centímetros de distância. Ela sentia o calor do corpo dele através do terno. Ele sentia o perfume dela como uma droga. Quando ele disse que era inocente, a voz era rouca. Ela precisou de todas as forças para não acreditar — e para não fechar a distância entre os lábios.",
    },
    {
      title: "Confiança",
      teaser: "Ela arriscou tudo para provar a inocência dele. E quando ele descobriu o que ela fez, o olhar que deu atravessou todas as barreiras.",
      synopsis: "Ela investigou sozinha, arriscando a reputação e o cargo. Encontrou o verdadeiro traidor e apresentou as provas em uma reunião que deixou todos em silêncio. Quando a sala se esvaziou, ele ficou. Atravessou a mesa longa e parou na frente dela. O olhar ia muito além de gratidão. Era desejo puro, reconhecimento, vulnerabilidade. Obrigado, ele disse com a voz quebrando. Ela respondeu: não foi por você. Foi pela verdade. Mas os dois sabiam que era mentira.",
    },
    {
      title: "A Viagem",
      teaser: "Viagem de negócios para Seul. Quartos lado a lado. Uma cidade estranha. Uma noite perigosa.",
      synopsis: "Seul brilhava como possibilidades infinitas. Depois da reunião, caminharam pelas ruas de Gangnam, falando sobre sonhos que nunca haviam compartilhado. Na cobertura do hotel, com a cidade inteira aos pés deles, o vento soprou e ela tremeu. Ele tirou o blazer e colocou sobre os ombros dela. As mãos dele demoraram sobre os ombros. Ela virou o rosto. Os lábios ficaram a um suspiro de distância. O som da cidade desapareceu. Ficaram assim por segundos que pareceram horas. Então ela sussurrou: isso é uma péssima ideia. Ele respondeu: eu sei. Mas nenhum dos dois se afastou.",
    },
    {
      title: "O Escândalo",
      teaser: "As fotos saíram em todas as capas. A mídia enlouqueceu. E ela nunca pareceu tão linda quanto sob pressão.",
      synopsis: "As fotos estavam em todos os tabloides — os dois no terraço do hotel, centímetros de distância, o blazer dele sobre ela. O conselho exigiu explicações. Os acionistas entraram em pânico. Ela enfrentou a imprensa com a postura de uma rainha — tailleur impecável, olhar inabalável, voz firme. Mas quando chegou ao escritório e fechou a porta, encostou na parede e fechou os olhos. Ele bateu na porta cinco minutos depois. Quando ela abriu, não disse nada. Ele também não. Ele entrou, fechou a porta, e pela primeira vez, não manteve a distância profissional.",
    },
    {
      title: "A Decisão",
      teaser: "O conselho deu um ultimato: a fusão ou o relacionamento. Ela olhou para ele. Ele olhou para ela. A resposta estava nos olhos.",
      synopsis: "A sala do conselho estava em silêncio quando o ultimato foi dado. Ela olhou para ele do outro lado da mesa comprida. Ele olhou para ela. Em anos de carreira, ela nunca havia hesitado diante de uma decisão de negócios. Mas desta vez, a decisão não era de negócios. Era sobre acordar sozinha ou acordar com alguém. Era sobre vitória profissional ou felicidade real. Os olhos dele diziam: eu sei a resposta. Os olhos dela respondiam: eu também.",
    },
    {
      title: "A Revolução",
      teaser: "Não escolheram entre amor e trabalho. Criaram uma terceira opção que ninguém esperava. Porque vencedores não aceitam ultimatos.",
      synopsis: "Juntos, criaram uma estrutura corporativa que o mercado nunca havia visto. Não aceitaram o ultimato — o destruíram. A nova empresa era mais forte, mais inovadora, mais lucrativa. O mercado ficou em choque. A imprensa chamou de revolução corporativa. E quando a poeira baixou e os números provaram que estavam certos, ele a esperou no escritório vazio. Champanhe. Dois copos. A cidade brilhando lá embaixo. Brindaram não à empresa — brindaram a eles. E o beijo que se seguiu tinha gosto de champanhe, vitória e desejo reprimido por meses.",
    },
    {
      title: "O Império de Seda",
      teaser: "O império que construíram juntos era feito do material mais forte do mundo: desejo, confiança e a recusa absoluta de aceitar limites.",
      synopsis: "Na varanda do escritório que agora compartilhavam, com a cidade inteira aos pés, ele tirou do bolso do blazer um lenço de seda. Dentro dele, um anel de safira — porque diamantes eram convencionais demais para ela. Ela riu e chorou ao mesmo tempo. Ele a segurou pela cintura e disse: você é a melhor aquisição que já fiz. Ela respondeu: eu não fui adquirida. Eu fiz uma fusão voluntária. O beijo foi longo, profundo e com vista para o império que construíram juntos — feito não de seda, mas de algo muito mais forte: dois corações que se recusaram a perder a negociação mais importante de suas vidas.",
    },
  ],
};

// ─── Helper functions ──────────────────────────────────────────────────────

export function getDrama(id: number): Drama | undefined {
  return DRAMAS.find((d) => d.id === id);
}

export function getEpisodes(dramaId: number): Episode[] {
  const data = EPISODES_DATA[dramaId];
  const images = IMAGES[dramaId];
  if (!data || !images) return [];

  return data.map((ep, i) => ({
    id: dramaId * 100 + i + 1,
    dramaId,
    number: i + 1,
    title: ep.title,
    synopsis: ep.synopsis,
    teaser: ep.teaser,
    image: images[i % images.length]!,
  }));
}

export function searchDramas(query: string): Drama[] {
  const q = query.toLowerCase();
  return DRAMAS.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.genre.toLowerCase().includes(q) ||
      d.synopsis.toLowerCase().includes(q),
  );
}

export function getRandomEpisode(): { drama: Drama; episode: Episode } | null {
  const dramaIdx = Math.floor(Math.random() * DRAMAS.length);
  const drama = DRAMAS[dramaIdx]!;
  const episodes = getEpisodes(drama.id);
  if (!episodes.length) return null;
  const ep = episodes[Math.floor(Math.random() * episodes.length)]!;
  return { drama, episode: ep };
}
