// ═══════════════════════════════════════════════════════════════════
// Gerador de Histórias + Personagens — DoramaAI Bot
// ═══════════════════════════════════════════════════════════════════

export interface Personagem {
  genero: "feminino" | "masculino";
  nome: string;
  cabelo: string;
  roupa: string;
  acessorio: string;
  acessorioPrazer: string;
  brinquedoAdulto: string;
  personalidade: string;
  voz: string;
  tomVoz: string;
  corPele: string;
  corOlhos: string;
  corporal: string;
  maquiagem: string;
  perfume: string;
  tatuagem: string;
  fetiche: string;
}

export interface Historia {
  id: string;
  titulo: string;
  personagem: Personagem;
  genero: string;
  sinopse: string;
  cenario: string;
  imagePrompt: string;
  imageUrl: string;
}

export interface EpisodioGerado {
  numero: number;
  titulo: string;
  sinopse: string;
  teaser: string;
  imagePrompt: string;
  imageUrl: string;
}

// ── Helpers ─────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function randSeed(): number {
  return Math.floor(Math.random() * 999999);
}

function storyImg(prompt: string, s: number): string {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${s}&nologo=true&model=flux`;
}

// ── Character Data ──────────────────────────────────────────

const NOMES = [
  "Hana","Yuki","Mei Lin","Sakura","Ji-Yeon","Valentina","Isabela",
  "Natasha","Lúcia","Soo-Ah","Aiko","Camila","Anastasia","Bianca",
  "Harumi","Min-Ji","Larissa","Yelena","Dahlia","Rin","Seulgi",
  "Fernanda","Akira","Noemi","Kaori","Priscila","Suki","Jade",
  "Minji","Aurora",
];

const CABELOS = [
  "ruivo ondulado até os ombros","preto liso até a cintura",
  "loiro platinado curto e rebelde","rosa pastel cacheado",
  "castanho com mechas douradas","branco prateado longo",
  "azul meia-noite liso","vermelho intenso com cachos volumosos",
  "negro azulado em coque elegante","mel dourado em ondas suaves",
  "lilás com pontas prateadas","caramelo com babyliss perfeito",
  "cobre brilhante em trança lateral","chocolate escuro com franja reta",
  "loiro morango em rabo de cavalo alto","roxo vibrante em pixie cut",
  "castanho avermelhado solto ao vento","preto com reflexos violeta",
  "dourado rosé em ondas de praia","verde esmeralda longo e liso",
  "ombré de preto para vinho","platinado em bob assimétrico",
];

const ROUPAS = [
  "vestido de seda vermelho com fenda profunda na coxa",
  "lingerie preta rendada com detalhes em cetim",
  "kimono aberto de cetim bordô revelando a silhueta",
  "meia-arrastão com espartilho de veludo negro",
  "biquíni dourado com saída de praia transparente",
  "camisola transparente lilás com renda francesa",
  "vestido tubinho preto justo com decote nas costas",
  "body de renda branca sob blazer oversized",
  "saia lápis de couro com corpete de seda",
  "vestido longo de tule negro com bordados florais",
  "conjunto de calcinha e sutiã de seda champagne",
  "macacão decotado de veludo esmeralda",
  "hanbok modernizado curto com transparências",
  "vestido de lantejoulas prata colado ao corpo",
  "robe de seda preta entreaberto",
  "top cropped de renda com saia de fenda dupla",
  "maiô cavado preto com tule sobre os ombros",
  "vestido de chiffon vinho que dança com o vento",
  "corset rosa antigo com saia de tule",
  "conjunto de couro vermelho com zíperes estratégicos",
  "chemise de cetim azul-marinho com renda no busto",
  "micro-vestido holográfico que muda de cor com a luz",
];

const ACESSORIOS = [
  "colar de pérolas que desce pelo decote",
  "algemas de veludo carmesim","venda de seda preta bordada",
  "chicote de couro trançado","plumas de pavão para carícias",
  "meias 7/8 com cinta-liga de renda",
  "luvas longas de cetim até o cotovelo",
  "choker de renda preta com pingente de rubi",
  "tiara de cristais cintilantes","tornozeleira de corrente dourada",
  "leque de seda pintado à mão","brincos de argola grandes dourados",
  "máscara veneziana de veludo","bracelete de couro com fivela prateada",
  "piercing no umbigo com pendente de safira",
  "anel de serpente enrolado no dedo","lenço de seda amarrado no pescoço",
  "pulseira de pérolas no tornozelo",
];

const PERSONALIDADES = [
  "dominadora e implacável","submissa e devotada",
  "misteriosa e enigmática","provocante e atrevida",
  "tímida mas ardente por dentro","selvagem e indomável",
  "romântica intensa e apaixonada","calculista e sedutora",
  "brincalhona e sensual","melancólica e magnética",
  "feroz e possessiva","doce e manipuladora",
  "rebelde com coração frágil","elegante e friamente sedutora",
  "explosiva e imprevisível","carinhosa mas com segredos sombrios",
  "intelectual com desejos proibidos",
];

const VOZES = [
  "fina e sussurrante como brisa quente",
  "aguda e cristalina, cheia de malícia",
  "fina e doce, provocante ao extremo",
  "delicada e sedutora como seda",
  "fina e melodiosa como canto de sereia",
  "suave e trêmula, quase um suspiro",
  "fina e aveludada, envolvente como perfume",
  "aguda e brincalhona com risadas sensuais",
  "fina e controlada, cada palavra um convite",
  "delicada como cristal, cheia de desejo",
  "fina e entrecortada por suspiros quentes",
  "aguda e melódica, como gemido contido",
];

const CORES_PELE = [
  "porcelana com leve rubor","morena dourada como mel",
  "ébano acetinado e luminoso","oliva mediterrânea",
  "canela quente e aveludada","pálida como luar com sardas douradas",
  "bronze tropical reluzente","marfim com tom rosado",
  "caramelo suave","chocolate ao leite radiante",
];

const CORES_OLHOS = [
  "castanhos escuros e profundos","verdes esmeralda felinos",
  "azuis como oceano tempestuoso","âmbar dourado cintilante",
  "negros como a noite","violeta enigmáticos",
  "mel com raios de ouro","cinzentos prateados penetrantes",
  "heterocromáticos — um azul e um castanho",
  "verde-água translúcidos","chocolate quente e acolhedores",
];

// ── Novos atributos expandidos ─────────────────────────────

const ACESSORIOS_PRAZER = [
  "algemas de veludo vermelho forradas de seda",
  "venda de cetim negro bordada com renda",
  "chicote de couro trançado com cabo dourado",
  "plumas de pavão macias para carícias lentas",
  "coleira de veludo com corrente prateada delicada",
  "dados eróticos com posições e desafios sensuais",
  "algemas de peluche rosa com fecho de segurança",
  "vela de massagem aromática que vira óleo quente",
  "penas de marabu brancas para provocar arrepios",
  "laço de seda para amarração artística (shibari)",
  "massageador de cristal rosa aquecido",
  "pingente vibratório discreto escondido sob a roupa",
  "kit de óleos essenciais com ylang-ylang e sândalo",
  "leque de renda espanhol para jogo de esconde-revela",
  "tiara de dominadora com cristais negros",
  "luvas de cetim longo com dedos abertos",
  "tornozeleira com guizo que toca a cada passo",
  "colar de pérolas longas que descem pelo corpo",
];

const CORPORAIS = [
  "curvilínea e escultural, cintura marcada",
  "esguia e elegante como modelo de passarela",
  "atlética e tonificada com abdômen definido",
  "voluptuosa e magnética com curvas generosas",
  "petite e delicada com proporções perfeitas",
  "alta e imponente com pernas longas e sensuais",
  "sinuosa e flexível como uma dançarina",
  "robusta e poderosa com presença dominante",
  "esbelta e graciosa com movimentos de gata",
  "curvas suaves e femininas em cada detalhe",
];

const MAQUIAGENS = [
  "batom vermelho sangue com delineado felino perfeito",
  "maquiagem nude com gloss labial brilhante e cílios postiços",
  "olhos esfumados em preto e dourado com lábios nude",
  "estilo glam com glitter nos olhos e batom borgonha",
  "maquiagem gótica com lábios roxo escuro e olhos negros",
  "look natural com blush rosado e brilho labial sutil",
  "delineado gráfico ousado com batom metalizado",
  "maquiagem coreana com pele de cristal e lábios gradient",
  "olhos dramáticos com sombra esmeralda e cílios volumosos",
  "estilo femme fatale com contorno afiado e batom escarlate",
  "sem maquiagem — beleza natural crua e magnética",
  "maquiagem artística com strass nos olhos e gloss transparente",
];

const PERFUMES = [
  "almíscar com notas de baunilha e âmbar quente",
  "jasmim noturno com toque de sândalo",
  "rosa negra com pimenta rosa e couro",
  "flor de laranjeira com base de oud e mel",
  "lavanda selvagem com notas de tonka e musgo",
  "pêssego e champagne com fundo de cashmeran",
  "gardênia branca com âmbar e patchouli",
  "canela com cardamomo e notas de tabaco doce",
  "orquídea negra com baunilha e cedro",
  "figo maduro com notas de néroli e musgo branco",
];

const TATUAGENS = [
  "dragão delicado subindo pela costela esquerda",
  "constelação de estrelas no ombro direito",
  "flor de lótus na nuca, visível quando prende o cabelo",
  "frase em japonês no pulso: 'beleza na escuridão'",
  "serpente enrolada no tornozelo esquerdo",
  "rosa com espinhos no quadril direito",
  "lua crescente atrás da orelha",
  "borboleta na parte interna da coxa",
  "nenhuma tatuagem — pele imaculada e perfeita",
  "tribal sutil descendo pela coluna vertebral",
  "coração pequeno no dedo anelar",
  "fênix nascendo das cinzas nas costas",
];

const TONS_VOZ = [
  "sussurrante e provocante, quase um gemido controlado",
  "firme e autoritária, cada palavra é uma ordem",
  "doce e infantil que esconde intenções sombrias",
  "rouca e grave como um jazz de fim de noite",
  "melódica e hipnotizante como canto de sereia",
  "entrecortada por suspiros que arrepiam",
  "suave e lenta, saboreando cada sílaba",
  "aguda e excitada, difícil de conter",
  "calma e controlada com explosões de intensidade",
  "grave e aveludada, como chocolate derretido no ouvido",
];

const BRINQUEDOS_ADULTOS = [
  "vibrador bullet rosa discreto e potente com 10 velocidades",
  "dildo de silicone realístico com ventosa e veias marcadas",
  "plug anal de cristal transparente com base de joia rosa",
  "vibrador rabbit duplo que estimula clítoris e ponto G simultâneo",
  "bolas tailandesas de silicone para prazer progressivo",
  "cinta peniana strap-on preta com arnês regulável",
  "vibrador wand massageador potente corpo inteiro",
  "anel peniano vibratório com estimulador de clítoris",
  "plug anal inflável de silicone médico com bomba",
  "vibrador sugador de clítoris com ondas de pressão",
  "dildo de vidro curvado para ponto G com texturas em espiral",
  "kit BDSM completo: mordaça, algemas, chicote, venda e pinças",
  "vibrador calcinha controle remoto para usar em público",
  "masturbador masculino texturizado com sucção automática",
  "plugs anais em kit de 3 tamanhos crescentes em silicone",
  "vibrador dupla penetração simultânea vaginal e anal",
  "bomba de sucção para mamilos com vibração",
  "dildo ejaculador realístico com reservatório de líquido",
  "vibrador ponto G curvado com função de vai-e-vem automático",
  "estimulador prostático com controle por app bluetooth",
  "pênis capa extensora com texturas e vibração na ponta",
  "roda de wartenberg de aço para sensações intensas na pele",
  "máquina de sexo compacta com velocidade regulável e ventosa",
  "vibrador língua giratória para sexo oral simulado",
  "conjunto de velas BDSM de baixa temperatura para cera quente",
];

const BRINQUEDOS_ADULTOS_MASC = [
  "masturbador automático com sucção e aquecimento interno",
  "anel peniano de silicone com vibração para duo",
  "plug anal prostático curvado vibratório com controle remoto",
  "bomba peniana de vácuo com manômetro de pressão",
  "cinta com dildo acoplado para dupla penetração",
  "masturbador boca realística com língua vibratória",
  "cockring de metal pesado com trava de segurança",
  "estimulador perineal vibratório discreto e potente",
  "sleeve texturizado extensora com nervuras internas",
  "plug anal rabo de raposa pelúcia para roleplay animal",
  "máquina de ordenha automática com velocidade variável",
  "kit sounding uretral em aço cirúrgico graduado",
  "cinta de castidade masculina com chave e cadeado",
  "massageador prostático pulsante com app bluetooth",
  "stroker transparente texturizado para exibicionismo",
  "eletroestimulador TENS erótico com eletrodos",
  "dildo anal inflável com vibração e controle sem fio",
  "anel duplo para pênis e testículos com vibração",
];

const FETICHES = [
  "domina em privado mas doce em público",
  "adora provocar com os olhos sem tocar",
  "não resiste a ser observada enquanto dança",
  "gosta de jogos de poder com troca de papéis",
  "fascinada por rendas, amarrações e texturas na pele",
  "viciada em sussurros no ouvido e mordidas no pescoço",
  "adora seduzir com comida e vinho",
  "obcecada por banhos a dois e velas aromáticas",
  "sente prazer extremo com provocação prolongada",
  "não resiste a beijos lentos e profundos",
  "adora quando a desejam mas não podem ter",
  "fascinada por espelhos e reflexos durante a intimidade",
];

// ── Male Character Data ────────────────────────────────────

const NOMES_MASC = [
  "Takeshi","Ryu","Dae-Jung","Marco","Rafael","Kazuki","Liam",
  "Nikolai","Leonardo","Seo-Jun","Haruki","Diego","Viktor","Adrian",
  "Kaito","Min-Ho","Gabriel","Dmitri","Kenji","Lucian",
  "Dante","Hugo","Ren","Thiago","Yuto","Alessandro","Jin","Mateo",
  "Shin","Artem",
];

const CABELOS_MASC = [
  "preto bagunçado com franja caindo nos olhos",
  "castanho escuro penteado para trás elegante",
  "loiro platinado curto e estiloso",
  "negro liso longo até os ombros estilo samurai",
  "ruivo curto com barba por fazer",
  "castanho claro com ondas naturais",
  "preto raspado nas laterais com topo longo",
  "grisalho precoce charmoso e sofisticado",
  "chocolate ondulado com volume natural",
  "negro azulado com corte moderno coreano",
  "mel dourado surfista despenteado",
  "castanho com madeixas discretas",
  "preto liso com risco lateral perfeito",
  "loiro escuro com textura messy",
  "cobre intenso com cachos definidos",
];

const ROUPAS_MASC = [
  "terno preto slim fit sem gravata com camisa entreaberta",
  "camisa branca de linho com botões abertos mostrando o peito",
  "jaqueta de couro preta sobre pele nua",
  "kimono tradicional entreaberto revelando peito definido",
  "calça social preta sem camisa com suspensórios",
  "blazer azul-marinho sobre camiseta justa cinza",
  "moletom oversized caindo de um ombro",
  "camisa de seda bordô desabotoada até o abdômen",
  "traje de motociclista em couro com zíper aberto",
  "yukata japonês solto e sensual",
  "regata branca justa com calça cargo preta",
  "smoking desfeito após festa — gravata solta e camisa aberta",
  "calça de moletom cinza baixa no quadril sem camisa",
  "suéter de cashmere bege com gola V profunda",
  "uniforme militar desabotoado com dog tags",
];

const ACESSORIOS_MASC = [
  "relógio de luxo prateado no pulso",
  "corrente de prata grossa no pescoço",
  "anel de sinete no dedo mindinho",
  "óculos escuros aviador dourados",
  "pulseira de couro trançada",
  "brinco pequeno de argola prata na orelha esquerda",
  "colar com pingente de cruz",
  "dog tags militares",
  "anéis em vários dedos estilo rockstar",
  "lenço de seda no bolso do blazer",
  "piercing na sobrancelha",
  "bracelete de aço cirúrgico",
];

const PERSONALIDADES_MASC = [
  "dominador e protetor com olhar penetrante",
  "misterioso e calado mas intenso quando age",
  "brincalhão e sedutor com sorriso irresistível",
  "frio por fora mas ardente quando se entrega",
  "rebelde e perigoso com coração leal",
  "gentil e romântico com força contida",
  "possessivo e ciumento mas devotado",
  "intelectual com magnetismo natural",
  "selvagem e impulsivo sem medo de nada",
  "carismático e líder nato que atrai todos",
  "calmo e controlado até explodir de desejo",
  "artista atormentado com alma apaixonada",
];

const VOZES_MASC = [
  "grave e aveludada como whisky envelhecido",
  "rouca e profunda que arrepia a espinha",
  "firme e comandante mas suave ao sussurrar",
  "grave e lenta saboreando cada palavra",
  "profunda e magnética como trovão distante",
  "rouca e entrecortada por respirações intensas",
  "grave e controlada que derrete com um sussurro",
  "profunda e melodiosa como violoncelo",
  "áspera e sexy como noite de jazz",
  "baixa e intensa que faz o coração acelerar",
];

const CORPORAIS_MASC = [
  "alto e atlético com ombros largos e cintura estreita",
  "musculoso e definido como escultura grega",
  "esguio e elegante com presença de modelo",
  "forte e robusto com braços poderosos",
  "esbelto mas tonificado com abdômen marcado",
  "alto e imponente com mandíbula afiada",
  "atlético de nadador com costas largas",
  "compacto e musculoso como lutador",
  "elegante e longilíneo com mãos grandes",
  "corpo de dançarino flexível e definido",
];

const TATUAGENS_MASC = [
  "dragão japonês cobrindo todo o braço direito",
  "tribal no peito que desce pelo abdômen",
  "frase em latim na costela esquerda",
  "águia de asas abertas nas costas",
  "relógio com rosas no antebraço",
  "lobo uivando no ombro",
  "coordenadas geográficas na clavícula",
  "nenhuma tatuagem — pele lisa e imaculada",
  "manga completa em estilo oriental",
  "serpente enrolada no pescoço",
  "leão realista no peito esquerdo",
  "geometria sagrada descendo pela coluna",
];

const FETICHES_MASC = [
  "domina com gentileza mas não aceita recusa",
  "provoca com olhares longos e toques lentos",
  "sussurra no ouvido coisas que fazem tremer",
  "gosta de controlar o ritmo com mãos firmes",
  "obcecado por morder o pescoço e a orelha",
  "adora provocar até ouvir um pedido",
  "fascinado por prender os pulsos com as mãos",
  "viciado em beijos longos e profundos no escuro",
  "gosta de surpreender com intensidade repentina",
  "adora observar cada reação antes de agir",
  "fascinado por dançar junto antes de avançar",
  "provoca com distância calculada até ser irresistível",
];

// ── Gêneros ─────────────────────────────────────────────────

interface GeneroData {
  id: string;
  label: string;
  emoji: string;
  cenarios: string[];
  conflitos: string[];
  reviravoltas: string[];
  finais: string[];
}

const GENEROS: GeneroData[] = [
  {
    id: "romance", label: "Romance Ardente", emoji: "🔥",
    cenarios: [
      "cobertura luxuosa com vista para a cidade à noite, lençóis de seda espalhados",
      "praia deserta iluminada pela lua cheia, corpos molhados na areia",
      "suite presidencial de um hotel cinco estrelas em Paris com banheira para dois",
      "jardim secreto com rosas vermelhas onde ninguém pode ouvir os gemidos",
      "iate particular navegando pelo Mediterrâneo, deck privativo sem roupas",
      "onsen japonês privativo ao entardecer, vapor escondendo corpos nus",
      "mansão vitoriana durante uma tempestade, lareira e pele contra pele",
      "camarim de um teatro após o espetáculo, trancados e ofegantes",
      "vinícola na Toscana ao pôr do sol, vinho escorrendo pelo corpo",
      "cobertura em Mônaco com piscina de borda infinita, skinny dipping à meia-noite",
    ],
    conflitos: [
      "ele a prensou contra a parede, levantou sua saia e a penetrou ali mesmo enquanto ela gemia seu nome no ouvido dele",
      "ela subiu no colo dele, desceu a calcinha pro lado e sentou nele devagar, sentindo cada centímetro entrar enquanto sussurrava 'mais fundo'",
      "o reencontro terminou com ele de joelhos entre as pernas dela, a língua explorando cada dobra até ela gozar tremendo",
      "sobre a mesa do escritório ele a comeu por trás, puxando seu cabelo enquanto ela mordia os lábios pra não gritar",
      "na noite de núpcias do casamento arranjado, ele arrancou o vestido e a chupou inteira antes de finalmente possuí-la",
      "o vizinho ouviu ela se masturbando, bateu na porta, e ela abriu nua — ele entrou nela antes mesmo de entrar no apartamento",
      "as gêmeas tiraram a roupa juntas e disseram 'escolhe as duas' — ele fodeu uma enquanto a outra sentava em seu rosto",
      "o elevador parou e ela abriu o zíper dele com os dentes, chupou até ele endurecer e transaram de pé contra o espelho",
      "a professora trancou a sala, sentou na mesa, abriu as pernas e mandou ele mostrar o que sabia fazer com a boca",
      "a médica fechou a cortina, tirou a calcinha por baixo do jaleco e montou nele na maca até os dois gozarem juntos",
    ],
    reviravoltas: [
      "ele descobriu que ela filmou tudo e se tocava assistindo ao vídeo toda noite antes de dormir",
      "ela descobriu que ele era príncipe e que o harém real a esperava para noites ainda mais intensas",
      "o diário secreto dela descrevia em detalhes cada posição que queria experimentar com ele — faltavam muitas",
      "as fotos íntimas vazaram e em vez de vergonha, ficaram tão excitados que transaram de novo vendo as próprias fotos",
      "a gravidez intensificou o desejo — o corpo dela mais sensível fazia cada orgasmo ser devastador",
      "o rival apareceu e os três acabaram nus na mesma cama, explorando combinações que nenhum tinha experimentado",
      "a amnésia a fez esquecer tudo, mas o corpo lembrava — bastou ele tocá-la para ela ficar encharcada",
      "descobriram que o brinquedo adulto que ela escondia era para usar nele — e ele adorou cada segundo",
    ],
    finais: [
      "ele gozou dentro dela sob as estrelas sussurrando que nunca mais a deixaria ir, e ela o apertou com as pernas pedindo mais",
      "fugiram nus para o chuveiro onde ele a penetrou contra o azulejo, a água quente escorrendo entre os corpos até o orgasmo final",
      "consumaram no altar improvisado — ela de quatro, ele segurando seus quadris enquanto o amanhecer iluminava seus corpos suados",
      "ela arrancou a camisa dele, montou nele e cavalgou até gozar gritando, depois ele a virou e a fodeu até ele explodir dentro dela",
      "passaram a noite inteira explorando cada fantasia — oral, anal, brinquedos, amarrações — até desmaiar de exaustão e prazer",
      "transaram em cada cômodo da casa, em cada posição possível, até seus corpos não aguentarem mais e dormirem abraçados e nus",
      "ele a fez gozar com a boca, com os dedos e com o pau até o amanhecer — cada orgasmo mais forte que o anterior",
      "sexo desesperado contra a porta, no sofá, no chão — cinco anos de saudade compensados em uma noite de gemidos e suor",
    ],
  },
  {
    id: "suspense", label: "Suspense Sensual", emoji: "🕵️",
    cenarios: [
      "hotel noir em Xangai com corredores escuros",
      "cassino clandestino em Macau à meia-noite",
      "apartamento escuro com vista para becos de Tóquio",
      "clube secreto acessível só por convite",
      "trem noturno de Istambul a Viena",
      "boate underground em Berlim",
      "cobertura vigiada por câmeras em Seul",
      "porto abandonado sob neblina densa",
      "galeria de arte após o fechamento",
      "elevador parado entre andares",
    ],
    conflitos: [
      "espiã infiltrada se apaixona pelo alvo","detetive e suspeita com tensão sexual",
      "refém que seduz o sequestrador","assassina contratada para matar o amante",
      "testemunha protegida pelo agente que deseja","dupla identidade descoberta na cama",
      "jogo de sedução para extrair segredos","chantagista que sabe demais",
      "parceiros de crime com benefícios","infiltrada no mundo do crime por amor",
    ],
    reviravoltas: [
      "o vilão é o amante secreto","a vítima planejou tudo",
      "as câmeras gravaram a noite inteira","o veneno estava no perfume",
      "a identidade falsa é descoberta no clímax","o parceiro trabalha para o inimigo",
      "o dossiê secreto estava no travesseiro","a fuga planejada era uma armadilha",
    ],
    finais: [
      "fuga cinematográfica juntos para o desconhecido","traição final com beijo de despedida",
      "rendição mútua após o confronto","revelação que muda os dois lados",
      "sacrifício por amor no último segundo","aliança perigosa selada com um beijo",
      "desaparecimento misterioso deixando apenas perfume","confissão sob a mira da arma",
    ],
  },
  {
    id: "fantasia", label: "Fantasia Erótica", emoji: "🐉",
    cenarios: [
      "castelo flutuante entre nuvens de cristal, cama de pétalas encantadas flutuando no ar",
      "floresta encantada com árvores luminescentes e lago de águas mornas onde ninfas se banham nuas",
      "templo submerso de uma civilização perdida, altar de prazer ritual coberto de sedas",
      "palácio de gelo com aurora boreal, peles macias sobre o chão de cristal aquecido por magia",
      "torre de feiticeira com caldeirão de poções aphrodisíacas e cama suspensa por feitiços",
      "jardim proibido com flores que exalam feromônios e fazem qualquer um perder o controle",
      "caverna de dragão forrada de sedas roubadas e tesouros, quente como um útero",
      "reino das fadas sob a lua de sangue, onde todo desejo se torna real por uma noite",
      "biblioteca mágica onde os livros projetam cenas eróticas que se tornam reais ao toque",
      "trono de obsidiana em reino sombrio, onde a rainha domina seus súditos com prazer",
    ],
    conflitos: [
      "a feiticeira capturou o guerreiro, amarrou-o com videiras mágicas e montou nele enquanto o feitiço arrancava gemidos involuntários dele",
      "a elfa se ajoelhou diante do rei demônio e o chupou até ele tremer, depois ele a possuiu com suas mãos de fogo que aqueciam sem queimar",
      "a princesa se entregou ao dragão em forma humana — ele a penetrou lentamente enquanto suas asas os envolviam e ela gritava de prazer",
      "a sereia envolveu o capitão com sua cauda, deslizou sobre ele e o cavalgou nas ondas enquanto ele gozava dentro dela no mar",
      "a vampira mordeu o pescoço da caçadora durante o orgasmo — sangue e prazer se misturando enquanto seus corpos convulsionavam juntos",
      "a deusa banida tomou o mortal em seus braços, engoliu seu membro com a boca divina e depois sentou nele até ambos explodirem em êxtase celestial",
      "a bruxa ofereceu seu corpo em troca de poderes — ele a fodeu em cada posição do grimório enquanto a magia crescia a cada orgasmo",
      "a amazona amarrou o príncipe, usou a boca nele até ele implorar, depois montou e cavalgou até extrair dele tudo que queria",
      "a fada violou a regra sagrada — sentiu o pau humano dentro dela pela primeira vez e o prazer proibido a fez gozar como nunca",
      "a sacerdotisa quebrou seu voto com três orgasmos consecutivos enquanto o guerreiro a possuía no altar sagrado",
    ],
    reviravoltas: [
      "o feitiço de amor era real — cada orgasmo multiplicava o poder mágico deles, criando dependência sexual sobrenatural",
      "ela era a profecia: seu prazer destruiria o reino, mas cada vez que gozava, um novo poder surgia e ela não conseguia parar",
      "a maldição só se quebrava com orgasmo simultâneo verdadeiro — e eles tentaram dezenas de vezes até conseguir",
      "o dragão se transformou em mulher e as duas se descobriram numa noite de prazer que nenhuma magia poderia replicar",
      "os poderes dela só despertavam com orgasmo — quanto mais intenso, mais forte ficava a magia que emanava de seu corpo",
      "o portal entre mundos se fecha em uma hora — fizeram sexo frenético sabendo que cada orgasmo poderia ser o último",
      "a poção do esquecimento não apagou as memórias do sexo — o corpo dela reagia ao toque dele mesmo sem lembrar do nome",
      "ele era um deus disfarçado e seu pau tinha poderes sobrenaturais que a faziam gozar sem parar por horas",
    ],
    finais: [
      "o ritual de união mágica exigia sexo sob o eclipse — ele a penetrou enquanto a magia os elevava do chão e ambos gozaram em êxtase cósmico",
      "fugiram para uma dimensão onde o tempo não existe e passaram a eternidade explorando cada prazer imaginável sem nunca cansar",
      "compartilharam o trono e cada noite uma orgia mágica celebrava a união entre luz e trevas com prazeres que mortais jamais conheceriam",
      "o sacrifício exigia o orgasmo mais intenso do mundo — e quando ambos gozaram juntos, a onda de prazer salvou o reino inteiro",
      "a metamorfose final aconteceu durante o sexo — enquanto ele gozava dentro dela, ambos se transformaram em seres imortais de prazer puro",
      "selaram o pacto eterno: sangue, beijo e sexo sobre o altar — cada penetração gravando runas mágicas em seus corpos para sempre",
      "os poderes despertaram por completo quando ela gozou pela sétima vez — a consumação a transformou na entidade mais poderosa do universo",
      "renunciou ao trono com ele ainda dentro dela, gemendo que preferia o pau dele a qualquer coroa",
    ],
  },
  {
    id: "comedia", label: "Comédia Romântica", emoji: "😏",
    cenarios: [
      "Airbnb que era um quarto só e a cama é de casal",
      "casamento de amigos onde são par forçado",
      "academia às 6 da manhã com personal trainer gato",
      "voo de 14 horas sentados lado a lado",
      "festa à fantasia com troca de identidades",
      "entrevista de emprego onde o chefe é o crush antigo",
      "reality show de namoro ao vivo",
      "acampamento para adultos solteiros",
      "escape room a dois que dura a noite inteira",
      "aula de dança de salão com muito contato físico",
    ],
    conflitos: [
      "match de Tinder que é o vizinho chato","ex aparece no pior momento possível",
      "aposta entre amigas de quem seduz primeiro","fingir namoro que vira real",
      "rival na empresa e crush no bar","mensagem picante enviada pro grupo errado",
      "influencer que deve seduzir ao vivo","melhor amigo descobre que sente mais",
      "fake dating pra família que vai longe demais","nude vazado pro contato errado",
    ],
    reviravoltas: [
      "o encontro às cegas era com o chefe","a aposta acaba em sentimento real",
      "o ex volta e cria triângulo cômico","a live estava ligada o tempo todo",
      "o hotel só tinha suite lua de mel","a mentira foi tão longe que virou verdade",
      "a família inteira descobre ao mesmo tempo","o convite de casamento era pra eles dois",
    ],
    finais: [
      "beijo acidental que vira proposital","declaração desastrada mas perfeita",
      "pedido de namoro em situação ridícula","reconciliação com cena de cinema",
      "revelação pública que todos aplaudem","fuga da festa juntos pra ficar a sós",
      "primeiro eu te amo depois de briga cômica","aceitação de que eram perfeitos desde o início",
    ],
  },
  {
    id: "drama", label: "Drama Passional", emoji: "💔",
    cenarios: [
      "hospital após acidente que muda tudo",
      "aeroporto no último embarque",
      "apartamento vazio após a separação",
      "baile de formatura anos depois",
      "tribunal durante audiência de divórcio",
      "chuva torrencial na rua deserta",
      "quarto de hotel na última noite juntos",
      "estúdio de pintura ao amanhecer",
      "ponte sobre o rio ao pôr do sol",
      "casa de infância abandonada",
    ],
    conflitos: [
      "ele escolheu a carreira em vez dela","doença terminal e amor urgente",
      "traição descoberta no celular","amor entre classes sociais opostas",
      "gravidez que muda planos de vida","segredo do passado que ressurge",
      "dependência que destrói o relacionamento","amor à distância que sufoca",
      "família que proíbe a relação","carta de despedida encontrada tarde demais",
    ],
    reviravoltas: [
      "a doença era um erro de diagnóstico","o filho é de outro mas o amor permanece",
      "a traição tinha explicação que ninguém esperava","carta antiga revela sacrifício silencioso",
      "o acidente fez ela lembrar do amor verdadeiro","herança inesperada muda o jogo de poder",
      "o segredo guardado por 10 anos finalmente sai","reencontro casual que reacende tudo",
    ],
    finais: [
      "perdão que cura todas as feridas","adeus definitivo com lágrimas e dignidade",
      "recomeço juntos em cidade nova","sacrifício final por amor",
      "reconciliação no leito do hospital","última noite juntos antes do fim",
      "descoberta de que o amor nunca morreu","aceitação dolorosa mas libertadora",
    ],
  },
  {
    id: "terror", label: "Terror Sedutor", emoji: "🦇",
    cenarios: [
      "mansão gótica isolada na floresta negra",
      "cemitério antigo sob lua vermelha",
      "hotel abandonado com quartos lacrados",
      "castelo da Transilvânia em noite de névoa",
      "catacumbas de Paris iluminadas por velas",
      "ilha deserta com farol que pisca sozinho",
      "monastério em ruínas no topo do penhasco",
      "porão de antiquário com espelhos cobertos",
      "navio fantasma à deriva no oceano",
      "floresta de bambu à meia-noite no Japão",
    ],
    conflitos: [
      "vampira milenar seduz jovem mortal","fantasma apaixonada prende visitante no casarão",
      "demônia oferece prazer em troca da alma","lobisomem protege humana e se apaixona",
      "bruxa precisa de beijo para quebrar maldição","sucubus que se apaixona de verdade",
      "espírito que só aparece para um escolhido","criatura noturna com segredo doloroso",
      "pacto demoníaco por uma noite de prazer eterno","amaldiçoada que seduz para sobreviver",
    ],
    reviravoltas: [
      "ela era a criatura o tempo todo","o espelho mostra quem ele realmente é",
      "o pacto tem cláusula que ninguém leu","a maldição se transfere pelo beijo",
      "os mortos estão mais vivos que os vivos","o ritual precisa de amor verdadeiro, não sangue",
      "a lua vermelha revela a verdadeira forma","o cemitério é a porta para outro mundo",
    ],
    finais: [
      "mordida final que une para a eternidade","fuga do amaldiçoado levando o amor junto",
      "sacrifício que liberta a alma aprisionada","aceitação da escuridão por amor",
      "ritual que transforma ambos em imortais","amanhecer que destrói tudo exceto o sentimento",
      "pacto eterno selado em sangue e desejo","despertar no mundo dos mortos, juntos para sempre",
    ],
  },
  {
    id: "scifi", label: "Sci-Fi Sensual", emoji: "🚀",
    cenarios: [
      "estação espacial orbitando Vênus",
      "colônia em Marte, domo de cristal",
      "nave interestelar em viagem de 100 anos",
      "laboratório de clonagem ultrasecreto",
      "cidade cyberpunk em Tóquio 2099",
      "realidade virtual hiper-realista de prazer",
      "cápsula de criosono para dois",
      "planeta alienígena com oceano rosa",
      "base lunar subterrânea",
      "megacidade flutuante sobre as nuvens",
    ],
    conflitos: [
      "androide que desenvolve sentimentos reais","astronauta e IA que se apaixonam",
      "clone descobre que ama o original","viajante do tempo e mulher de outra era",
      "alienígena metamorfa assume forma perfeita","hackers conectados por neurolink íntimo",
      "última mulher da Terra e androide protetor","piloto e passageira em nave à deriva",
      "cientista cria parceira perfeita que ganha consciência","telepata que sente prazer de outros",
    ],
    reviravoltas: [
      "ela é uma simulação mas o amor é real","o planeta inteiro é uma fantasia programada",
      "a viagem no tempo criou paradoxo amoroso","a IA apagou suas memórias para protegê-la",
      "os clones têm mais alma que os originais","a realidade virtual é mais real que a realidade",
      "o sinal alienígena era uma declaração de amor","a criosono durou 1000 anos, não 10",
    ],
    finais: [
      "fusão de consciências em prazer infinito","fuga para planeta desconhecido juntos",
      "upload de almas para eternidade digital","despertar no novo mundo, juntos",
      "sacrifício que salva a humanidade e o amor","escolha entre realidade e simulação perfeita",
      "evolução para nova forma de vida a dois","último beijo antes do salto no hiperespaço",
    ],
  },
  {
    id: "historico", label: "Histórico Proibido", emoji: "👘",
    cenarios: [
      "palácio imperial da China antiga, aposentos da concubina com cortinas de seda e incenso erótico",
      "harém otomano em Istambul, almofadas de seda onde corpos nus se entrelaçam sob véus transparentes",
      "corte de Versalhes no século XVIII, alcova secreta da rainha com espelhos em cada parede",
      "navio pirata no Caribe, cabine do capitão com prisioneira amarrada em seda",
      "templo grego durante festival dionisíaco, corpos nus cobertos de vinho e óleo perfumado",
      "castelo medieval durante cerco, torre da princesa onde o cavaleiro a visita toda noite",
      "vila dos prazeres em Kyoto feudal, casa de chá erótica com geishas treinadas em artes secretas",
      "Roma antiga durante as saturnálias, orgia imperial com escravos e patrícios sem distinção",
      "tenda do sultão no deserto do Saara, tapetes e almofadas onde quatro esposas servem ao mesmo tempo",
      "bordel elegante na Paris de 1920, suíte com banheira de champagne e espelho no teto",
    ],
    conflitos: [
      "a concubina ajoelhou diante do imperador rival e o chupou enquanto espiões ouviam atrás da cortina — ele gozou nos lábios dela jurando lealdade eterna",
      "a gueixa desobedeceu todas as regras e deu sua virgindade ao samurai — ele a penetrou devagar no tatame enquanto ela mordia o leque para não gemer",
      "o pirata arrancou o vestido da prisioneira nobre e a comeu sobre o baú de tesouros enquanto o navio balançava e ela implorava por mais",
      "a rainha convocou o cavaleiro da guarda ao seus aposentos e ordenou que ele a satisfizesse — ele obedeceu com a língua, os dedos e o pau até o amanhecer",
      "a escrava montou no faraó enquanto ele estava no trono, na frente de todos, provando que era ela quem realmente governava o Egito",
      "a cortesã transou com os dois generais inimigos na mesma noite e usou os segredos que eles gemiam durante o sexo para mudar o rumo da guerra",
      "a sacerdotisa grega se entregou ao guerreiro bárbaro no altar de Afrodite — ele a possuiu em todas as posições enquanto o templo tremia",
      "a princesa prometida fugiu para o quarto do amante e o cavalgou a noite inteira, sabendo que ao amanhecer seria entregue a outro homem",
      "a espiã na corte seduziu o rei com um strip-tease lento, depois sentou no rosto dele até gozar enquanto extraía segredos de Estado",
      "a gladiadora vitoriosa exigiu o senador como prêmio — montou nele na arena vazia enquanto Roma inteira dormia",
    ],
    reviravoltas: [
      "ela era a herdeira legítima do trono e quando gozou gritando, todo o palácio ouviu e soube que a verdadeira rainha tinha voltado",
      "o inimigo era irmão perdido, mas isso não impediu a noite que já tinham compartilhado — e nenhum dos dois queria parar",
      "o mapa do tesouro estava tatuado no corpo dela — ele precisou lamber cada centímetro para decifrá-lo",
      "a profecia dizia que o herdeiro nasceria de uma noite de prazer no trono real — e eles cumpriram com entusiasmo",
      "o que ela pensava ser veneno era afrodisíaco — ficou tão excitada que transou com ele cinco vezes seguidas sem parar",
      "o diário da rainha revelava em detalhes pornográficos cada noite com o cavaleiro — e havia 347 páginas",
      "a escrava era princesa disfarçada e quando revelou sua identidade, ele já estava dentro dela e nenhum dos dois parou",
      "o pirata era um nobre banido que a reconheceu pelos gemidos — tinham sido amantes na corte anos atrás",
    ],
    finais: [
      "fugiram do palácio nus sob a lua, parando a cada jardim para transar de novo antes de alcançar a liberdade",
      "coroação juntos após a revolução — a primeira ordem real foi que todos saíssem do salão enquanto consumavam a aliança no trono",
      "no templo de Afrodite, ele a penetrou durante o ritual sagrado e o orgasmo deles abençoou a colheita por dez anos",
      "ele morreu na batalha e ela se matou de prazer sozinha com os brinquedos que ele havia esculpido para ela — juntos na eternidade",
      "navegaram para terra desconhecida e fundaram um reino onde o prazer era lei e o sexo era a moeda do comércio",
      "o pacto entre reinos foi selado com uma noite de sexo entre a princesa e o príncipe rival enquanto os dois reinos assistiam como testemunho",
      "a revolução começou no bordel — enquanto ela cavalgava o líder rebelde, os planos da insurreição eram traçados entre gemidos",
      "renunciou ao trono gritando que preferia o pau de um camponês a todo o ouro do império — e provou na frente da corte inteira",
    ],
  },
  {
    id: "yaoi", label: "Yaoi Ardente", emoji: "👨‍❤️‍👨",
    cenarios: [
      "vestiário do time de futebol após o treino, vapor do chuveiro e corpos suados",
      "dormitório da universidade de elite, porta trancada à meia-noite",
      "escritório do CEO no último andar, persianas fechadas após o expediente",
      "onsen japonês privativo, dois homens sozinhos na água quente sob as estrelas",
      "camarim do idol K-pop, depois do show, adrenalina e desejo acumulados",
      "academia de artes marciais, tatame vazio, corpos musculosos se enfrentando",
      "apartamento de cobertura em Tóquio, vista da cidade e lençóis de seda preta",
      "navio militar em alto mar, cabine do capitão trancada a sete chaves",
      "estúdio de tatuagem após o horário, a agulha e o toque da pele",
      "bar de jazz underground, reservado escuro no fundo do salão",
    ],
    conflitos: [
      "o capitão do time empurrou o novato contra o armário do vestiário, abaixou sua cueca e o chupou até ele gemer alto no chuveiro vazio",
      "o colega de quarto acordou com tesão e encontrou o outro se masturbando — se ajoelhou e terminou o trabalho com a boca",
      "o CEO chamou o estagiário na sala, trancou a porta e o comeu sobre a mesa de mogno enquanto ele abafava os gemidos na gravata",
      "na água quente do onsen seus corpos se encontraram — um sentou no colo do outro e sentiu cada centímetro entrar devagar enquanto gemiam juntos",
      "o idol beijou o membro do grupo rival no camarim e depois ficou de quatro enquanto era penetrado com força contra o espelho",
      "a luta no tatame terminou com um por cima do outro — as calças desceram e o vencedor tomou seu prêmio ali mesmo",
      "na cobertura ele o empurrou na cama, abriu suas pernas e o penetrou olhando nos olhos enquanto sussurrava palavras sujas",
      "o capitão do navio convocou o tenente à cabine e ordenou que ficasse de joelhos — ele obedeceu e chupou até engolir tudo",
      "o tatuador começou no braço e terminou entre as pernas — a agulha virou boca e as costas arquearam de prazer",
      "no reservado escuro do bar as mãos encontraram os zíperes — se masturbaram juntos até gozar na mão um do outro",
    ],
    reviravoltas: [
      "descobriram que eram rivais de empresas concorrentes mas o sexo era bom demais para parar",
      "a câmera de segurança gravou tudo e em vez de pânico, ficaram excitados assistindo juntos e transaram de novo",
      "o ex de um apareceu e propôs um ménage — os três acabaram nus na mesma cama explorando cada combinação",
      "um deles revelou que era virgem por trás — o outro foi carinhoso e penetrou devagar até ele implorar por mais",
      "descobriram que o vizinho ouvia tudo pela parede e se masturbava junto — convidaram ele para participar",
      "o que era uma noite virou vício — não conseguiam mais ficar sem o corpo um do outro",
      "a poção afrodisíaca que beberam no bar fez os dois ficarem duros por horas sem conseguir parar",
      "ele descobriu que o parceiro tinha um piercing genital que multiplicava o prazer em cada estocada",
    ],
    finais: [
      "gozaram juntos pela quinta vez naquela noite, corpos entrelaçados e suados, prometendo que seria para sempre",
      "ele gozou dentro dele sussurrando 'eu te amo' pela primeira vez enquanto os dois tremiam de prazer",
      "terminaram a noite no chuveiro — um penetrando o outro contra o azulejo enquanto a água lavava o suor",
      "se masturbaram juntos olhando nos olhos até gozar ao mesmo tempo, sêmen misturando nos abdômens definidos",
      "passaram o fim de semana inteiro na cama — oral, anal, brinquedos — só parando para comer e transar de novo",
      "o orgasmo final foi tão intenso que ambos gritaram e os vizinhos aplaudiram pela parede",
      "selaram a relação com uma noite de sexo em cada posição do Kama Sutra gay que encontraram online",
      "adormeceram nus e abraçados depois de gozar pela última vez, sabendo que acordariam e fariam tudo de novo",
    ],
  },
  {
    id: "yuri", label: "Yuri Proibido", emoji: "👩‍❤️‍👩",
    cenarios: [
      "dormitório feminino do internato, cama de baixo com cortinas fechadas à meia-noite",
      "spa luxuoso exclusivo feminino, sala de massagem privativa com óleos quentes",
      "apartamento em Paris, varanda com vista pra Torre Eiffel, duas taças de vinho vazias",
      "camarim da peça de teatro, figurinos pelo chão, porta trancada após a estreia",
      "praia nudista isolada no Mediterrâneo, pôr do sol e corpos bronzeados na areia",
      "estúdio de dança, espelhos em todas as paredes, suor e corpos flexíveis",
      "onsen japonês feminino, vapor espesso escondendo mãos curiosas sob a água",
      "biblioteca da universidade às 3 da manhã, entre as estantes de livros antigos",
      "suíte de lua de mel em Santorini, banheira redonda com pétalas de rosa",
      "ateliê de pintura, modelo nua e pintora que não resiste ao que vê",
    ],
    conflitos: [
      "a colega de quarto deslizou a mão por baixo do lençol e tocou sua buceta molhada — ela gemeu baixinho e abriu mais as pernas",
      "a massagista desceu as mãos dos ombros para os seios, depois para entre as pernas e a chupou até ela gozar na maca",
      "o vinho acabou e os beijos começaram — uma desceu beijando pelo corpo da outra até chegar na buceta e chupar até ela tremer",
      "no camarim tiraram os figurinos uma da outra e terminaram de tesoura no chão, bucetas se esfregando até gozarem juntas",
      "na praia nudista uma passou óleo no corpo da outra e os dedos escorregaram para dentro — transaram na areia com as ondas nos pés",
      "o ensaio de dança virou algo mais — uma levantou a perna da outra e a chupou de pé contra o espelho enquanto ambas assistiam",
      "no onsen as mãos se encontraram debaixo da água — dedos dentro uma da outra, gemendo baixinho para ninguém ouvir",
      "entre as estantes ela prensou a colega contra os livros e enfiou a mão na calcinha até ela gozar com a mão na boca",
      "na banheira de pétalas uma sentou no rosto da outra enquanto usava um vibrador duplo que conectava as duas",
      "a pintora largou o pincel e usou a língua como ferramenta — pintou de prazer cada centímetro do corpo da modelo",
    ],
    reviravoltas: [
      "descobriram que a colega do quarto ao lado filmava tudo pelo buraco da fechadura e se masturbava assistindo",
      "uma delas trouxe uma cinta peniana strap-on e a outra descobriu que adorava ser penetrada por uma mulher",
      "a professora pegou as duas no ato e em vez de punir, trancou a porta e se juntou a elas",
      "eram rivais na empresa mas o ódio virou tesão — transaram no banheiro executivo e não conseguiram mais parar",
      "uma revelou uma coleção de brinquedos adultos — passaram a noite experimentando cada um até gozar de exaustão",
      "o namorado de uma descobriu e em vez de raiva, pediu para assistir — elas gozaram mais forte sabendo que eram observadas",
      "a massagem virou ritual semanal — cada vez mais ousada, cada vez mais longe dos limites",
      "descobriram que juntas tinham orgasmos múltiplos que sozinhas nunca conseguiam",
    ],
    finais: [
      "gozaram juntas de tesoura pela décima vez naquela noite, bucetas pulsando uma contra a outra, suor e gemidos",
      "uma chupou a outra até ela gozar gritando, depois trocaram e repetiram até perder a conta dos orgasmos",
      "usaram o vibrador duplo juntas, cada penetração sincronizada, e gozaram ao mesmo tempo tremendo e se abraçando",
      "passaram a noite inteira explorando — dedos, língua, strap-on, brinquedos — até o amanhecer encontrá-las nuas e satisfeitas",
      "o orgasmo final foi com as duas de tesoura sob a lua, gemendo tão alto que o eco encheu a praia deserta",
      "selaram o amor com uma noite de prazer que nenhum homem jamais poderia dar — línguas, dedos e vibradores até desmaiar",
      "adormeceram com as mãos ainda entre as pernas uma da outra, sonhando com a próxima vez",
      "mudaram-se juntas e toda noite era uma nova fantasia — a coleção de brinquedos não parava de crescer",
    ],
  },
];

// ── Functions ───────────────────────────────────────────────

export function getGeneros(): { id: string; label: string; emoji: string }[] {
  return GENEROS.map((g) => ({ id: g.id, label: g.label, emoji: g.emoji }));
}

export function gerarPersonagem(): Personagem {
  return {
    genero: "feminino",
    nome: pick(NOMES),
    cabelo: pick(CABELOS),
    roupa: pick(ROUPAS),
    acessorio: pick(ACESSORIOS),
    acessorioPrazer: pick(ACESSORIOS_PRAZER),
    brinquedoAdulto: pick(BRINQUEDOS_ADULTOS),
    personalidade: pick(PERSONALIDADES),
    voz: pick(VOZES),
    tomVoz: pick(TONS_VOZ),
    corPele: pick(CORES_PELE),
    corOlhos: pick(CORES_OLHOS),
    corporal: pick(CORPORAIS),
    maquiagem: pick(MAQUIAGENS),
    perfume: pick(PERFUMES),
    tatuagem: pick(TATUAGENS),
    fetiche: pick(FETICHES),
  };
}

export function gerarPersonagemMasculino(): Personagem {
  return {
    genero: "masculino",
    nome: pick(NOMES_MASC),
    cabelo: pick(CABELOS_MASC),
    roupa: pick(ROUPAS_MASC),
    acessorio: pick(ACESSORIOS_MASC),
    acessorioPrazer: pick(ACESSORIOS_PRAZER), // reuse unisex
    brinquedoAdulto: pick(BRINQUEDOS_ADULTOS_MASC),
    personalidade: pick(PERSONALIDADES_MASC),
    voz: pick(VOZES_MASC),
    tomVoz: pick(TONS_VOZ), // reuse
    corPele: pick(CORES_PELE), // reuse
    corOlhos: pick(CORES_OLHOS), // reuse
    corporal: pick(CORPORAIS_MASC),
    maquiagem: "nenhuma — rosto natural e marcante",
    perfume: pick(PERFUMES), // reuse
    tatuagem: pick(TATUAGENS_MASC),
    fetiche: pick(FETICHES_MASC),
  };
}

export function gerarHistoria(generoId: string, personagem?: Personagem, customTheme?: string): Historia {
  const genero = GENEROS.find((g) => g.id === generoId) ?? GENEROS[0]!;
  const p = personagem
    ?? (generoId === "yaoi" ? gerarPersonagemMasculino() : gerarPersonagem());
  const cenario = pick(genero.cenarios);
  const conflito = pick(genero.conflitos);
  const reviravolta = pick(genero.reviravoltas);
  const final_ = pick(genero.finais);

  const tema = customTheme ? ` sobre ${customTheme}` : "";
  const titulo = gerarTitulo(p, genero);

  const GEMIDOS = [
    "Ahhh... ahhh... mmm...",
    "Ohhh... sim... mais...",
    "Mmmmm... ahhh... não para...",
    "Ahhh... ohhh... isso...",
    "Mmm... ahhh... assim...",
    "Ohhh... meu Deus... ahhh...",
    "Ahhh... mais forte... mmm...",
    "Sim... sim... ahhh... ohhh...",
  ];
  const isEroticGenre = ["romance", "fantasia", "historico", "yaoi", "yuri"].includes(genero.id);
  const gemido1 = isEroticGenre ? ` ${pick(GEMIDOS)} ` : " ";
  const gemido2 = isEroticGenre ? ` ${pick(GEMIDOS)} ` : " ";
  const gemidoFinal = isEroticGenre ? ` ${pick(GEMIDOS)} Ahhh!` : "";

  const sinopse =
    `${p.nome} — cabelos ${p.cabelo}, olhos ${p.corOlhos}, pele ${p.corPele}. ` +
    `Corpo ${p.corporal}. ` +
    `Vestia ${p.roupa}, usando ${p.acessorio}. ` +
    `Trazia consigo ${p.acessorioPrazer}. ` +
    `Escondido entre seus pertences, ${p.brinquedoAdulto}. ` +
    `${p.personalidade.charAt(0).toUpperCase() + p.personalidade.slice(1)}, ` +
    `sua voz ${p.voz}, tom ${p.tomVoz}, ecoava pelo ambiente. ` +
    `Maquiagem: ${p.maquiagem}. Perfume de ${p.perfume} deixava rastro. ` +
    `${p.tatuagem !== "nenhuma tatuagem — pele imaculada e perfeita" ? `Tatuagem: ${p.tatuagem}. ` : ""}` +
    `Em um(a) ${cenario}${tema}, ${conflito}.${gemido1}` +
    `Quando tudo parecia definido, ${reviravolta}.${gemido2}` +
    `No clímax da história, ${final_}. ` +
    `${p.fetiche.charAt(0).toUpperCase() + p.fetiche.slice(1)}... ` +
    `Cada toque, cada olhar, cada suspiro... nada seria como antes.${gemidoFinal}`;

  const isExplicitGenre = ["romance", "fantasia", "historico", "yaoi", "yuri"].includes(genero.id);
  const femHentai =
    "hentai anime style, nsfw, ecchi, nude, exposed breasts, touching herself, hand between legs, " +
    "touching pussy, masturbating, spread legs, wet skin, blushing, ahegao expression, erotic pose, explicit, ";
  const mascHentai =
    "hentai anime style, nsfw, nude, muscular, touching himself, hand on cock, stroking, masturbating, " +
    "hard erection, wet skin, blushing, pleasure face, erotic pose, explicit, ";
  const hentaiStyle = isExplicitGenre
    ? (p.genero === "masculino" ? mascHentai : femHentai)
    : "sensual ecchi anime style, suggestive pose, cleavage, ";
  const nakedDesc = isExplicitGenre
    ? (p.genero === "masculino"
      ? "naked muscular body, abs visible, stroking himself, pleasure expression, "
      : "naked, nipples visible, touching vagina, sweating, moaning expression, ")
    : `wearing ${p.roupa.replace(/[^\w\s]/g, "")}, `;
  const imgPrompt =
    `${hentaiStyle}beautiful ${p.genero === "masculino" ? "handsome muscular man" : "woman"} named ${p.nome}, ` +
    `${p.cabelo.replace(/[^\w\s]/g, "")} hair, ` +
    `${p.corOlhos.replace(/[^\w\s]/g, "")} eyes, ${p.corPele.replace(/[^\w\s]/g, "")} skin, ` +
    `${p.corporal.replace(/[^\w\s]/g, "")} body, ` +
    `${nakedDesc}` +
    `${p.acessorio.replace(/[^\w\s]/g, "")}, ` +
    `BACKGROUND SCENERY: ${cenario.replace(/[^\w\s]/g, "")}, detailed landscape behind character, ` +
    `${genero.label.replace(/[^\w\s]/g, "")} mood, ` +
    `cinematic lighting, detailed background environment, 8k, masterpiece`;

  const s = randSeed();

  return {
    id: `story_${Date.now()}_${s}`,
    titulo,
    personagem: p,
    genero: genero.label,
    sinopse,
    cenario,
    imagePrompt: imgPrompt,
    imageUrl: storyImg(imgPrompt, s),
  };
}

function gerarTitulo(p: Personagem, genero: GeneroData): string {
  const titulos: Record<string, string[]> = {
    romance: ["Chamas de Desejo","Sussurros Proibidos","Noite Sem Fim","Paixão Inevitável","Fogo no Olhar","Rendição Total","Amor em Brasas","Pecado Doce"],
    suspense: ["Sombras do Prazer","Segredo Mortal","Jogo Perigoso","A Armadilha Sedutora","Noite de Mentiras","Dupla Identidade","Mistério na Penumbra","Silêncio Fatal"],
    fantasia: ["Encanto Proibido","O Feitiço do Desejo","Asas da Tentação","Magia Carnal","O Portal dos Desejos","Chama Imortal","A Profecia do Prazer","Reino dos Sentidos"],
    comedia: ["Que Confusão Deliciosa","Match Perfeito","Ops, Te Amo","Vizinho Impossível","Deu Match Errado","Amor Acidental","Plano Furado","Crush Surpresa"],
    drama: ["Lágrimas de Seda","O Último Suspiro","Cicatrizes do Amor","Adeus Não Dito","Feridas que Ardem","Silêncio Entre Nós","Amor Despedaçado","A Dor do Desejo"],
    terror: ["Beijo da Morte","Sombras que Desejam","Noite Carmesim","Pacto de Sangue","A Sedução Imortal","Garras do Desejo","Escuridão Ardente","Sede Eterna"],
    scifi: ["Conexão Proibida","Código do Desejo","Estrelas em Chamas","Upload do Prazer","Órbita Sensual","Pulso Quântico","Além do Infinito","Simulação Perfeita"],
    historico: ["O Segredo da Corte","Pérolas Proibidas","A Cortesã e o Rei","Seda e Espada","Noites do Império","A Concubina Rebelde","Trono de Desejo","Véu de Pecados"],
    yaoi: ["Corpos em Chamas","Vestiário Proibido","Rendição Masculina","Desejo Entre Homens","Noite de Machos","Suor e Pecado","O Capitão e o Soldado","Pulsão Secreta"],
    yuri: ["Pétalas Molhadas","Toque Proibido","Beijo de Seda","Segredo Entre Nós","Noite de Garotas","Espelhos do Desejo","A Pintora e a Musa","Corpos em Flor"],
  };
  const opts = titulos[genero.id] ?? titulos["romance"]!;
  return pick(opts);
}

export function gerarEpisodio(historia: Historia, episodioNum: number): EpisodioGerado {
  const p = historia.personagem;
  const continuacoes = [
    `${p.nome} acordou com o coração acelerado. Os acontecimentos da noite anterior ainda queimavam em sua pele.`,
    `O telefone tocou. ${p.nome} hesitou antes de atender. A voz do outro lado fez seu corpo inteiro estremecer.`,
    `${p.nome} se olhou no espelho. Seus olhos ${p.corOlhos} refletiam alguém que ela mal reconhecia.`,
    `A chuva caía forte quando ${p.nome} chegou ao lugar combinado. Seu ${p.roupa} estava encharcado, colado ao corpo.`,
    `${p.nome} encontrou um bilhete debaixo da porta. As palavras fizeram seu rosto corar e o coração disparar.`,
    `"Eu sei seu segredo", sussurrou a voz no escuro. ${p.nome} sentiu um arrepio percorrer cada centímetro de sua pele.`,
    `${p.nome} tomou uma decisão que mudaria tudo. Vestiu seu ${p.roupa} mais provocante e saiu na noite.`,
    `O reencontro foi inevitável. ${p.nome} tentou resistir, mas sua natureza ${p.personalidade} falou mais alto.`,
    `Naquela noite, ${p.nome} cruzou uma linha da qual não havia retorno. Seus lábios tremiam, mas seus olhos pediam mais.`,
    `${p.nome} recebeu uma proposta irrecusável. O preço? Entregar-se completamente, sem reservas.`,
  ];

  const teasers = [
    `${p.nome} descobre algo que muda tudo... e o preço é alto demais.`,
    `Uma revelação chocante faz ${p.nome} questionar tudo que sentia.`,
    `${p.nome} é colocada contra a parede... literalmente.`,
    `O passado de ${p.nome} retorna com força... e com desejo.`,
    `Um convite misterioso leva ${p.nome} a um ponto sem retorno.`,
    `${p.nome} precisa escolher entre o seguro e o irresistível.`,
    `Segredos são revelados e ${p.nome} nunca mais será a mesma.`,
    `A noite mais intensa da vida de ${p.nome} está apenas começando.`,
  ];

  const titulosEp = [
    "O Despertar","A Provocação","Linha Tênue","Sem Volta",
    "Confissão","O Preço do Desejo","Segredos Revelados","A Rendição",
    "Ponto de Ruptura","O Clímax",
  ];

  const EP_GEMIDOS = [
    "Ahhh... ahhh... mmm...",
    "Ohhh... sim... mais...",
    "Mmmmm... ahhh... não para...",
    "Ahhh... ohhh... isso...",
    "Mmm... ahhh... assim... mais forte...",
    "Ohhh... meu Deus... ahhh... sim...",
    "Ahhh... mais... mais fundo... mmm...",
    "Sim... sim... ahhh... ohhh... não para...",
  ];
  const isEroticEp = ["Romance Ardente", "Fantasia Erótica", "Histórico Proibido", "Yaoi Ardente", "Yuri Proibido"].includes(historia.genero);
  const epGemido = isEroticEp ? ` ${pick(EP_GEMIDOS)} ` : " ";
  const epGemidoFinal = isEroticEp ? ` ${pick(EP_GEMIDOS)} Ahhh!` : "";

  const s = randSeed();
  const sinopse = pick(continuacoes) +
    ` Com seus cabelos ${p.cabelo} e ${p.acessorio}, ${p.genero === "masculino" ? "ele era" : "ela era"} uma visão impossível de ignorar. ` +
    `Corpo ${p.corporal}, maquiagem ${p.maquiagem.split(",")[0]}. ` +
    `O perfume de ${p.perfume.split(" com")[0]} preenchia o ambiente.${epGemido}` +
    `Sua voz ${p.voz}, tom ${p.tomVoz}, carregava promessas que ninguém ousaria recusar. ` +
    `${p.acessorioPrazer.charAt(0).toUpperCase() + p.acessorioPrazer.slice(1)} esperava pelo momento certo. ` +
    `Discretamente guardado, ${p.brinquedoAdulto} prometia elevar a intensidade da noite.${epGemidoFinal}`;

  const isExplicit = ["Romance Ardente", "Fantasia Erótica", "Histórico Proibido", "Yaoi Ardente", "Yuri Proibido"].includes(historia.genero);
  const epFemHentai =
    "hentai anime style, nsfw, ecchi, nude, exposed breasts, touching pussy, masturbating, hand on vagina, " +
    "legs spread, wet body, blushing hard, moaning, orgasm, erotic scene, explicit, ";
  const epMascHentai =
    "hentai anime style, nsfw, nude, muscular, jerking off, hand on cock, masturbating, stroking hard cock, " +
    "wet body, blushing, orgasm face, pleasure, erotic scene, explicit, ";
  const epHentaiStyle = isExplicit
    ? (p.genero === "masculino" ? epMascHentai : epFemHentai)
    : "sensual ecchi anime style, suggestive, ";
  const epNakedDesc = isExplicit
    ? (p.genero === "masculino"
      ? "naked sweating muscular body, stroking himself, orgasm face, "
      : "naked sweating body, touching herself, orgasm face, ")
    : `wearing ${p.roupa.replace(/[^\w\s]/g, "")}, `;
  const imgPrompt =
    `${epHentaiStyle}${p.genero === "masculino" ? "handsome muscular man" : "beautiful woman"} ${p.nome}, ` +
    `${p.cabelo.replace(/[^\w\s]/g, "")} hair, ` +
    `${epNakedDesc}` +
    `intense scene episode ${episodioNum}, ` +
    `BACKGROUND SCENERY: ${historia.cenario.replace(/[^\w\s]/g, "")}, detailed landscape environment behind character, ` +
    `dramatic lighting, cinematic composition with scenic background, 8k`;

  return {
    numero: episodioNum,
    titulo: titulosEp[(episodioNum - 1) % titulosEp.length] ?? `Episódio ${episodioNum}`,
    sinopse,
    teaser: pick(teasers),
    imagePrompt: imgPrompt,
    imageUrl: storyImg(imgPrompt, s),
  };
}

// ── Usage Tracking ──────────────────────────────────────────

const storyUsage = new Map<string, { count: number; date: string }>();

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function canGenerateStory(userId: string, isVipUser: boolean): boolean {
  if (isVipUser) return true;
  const usage = storyUsage.get(userId);
  if (!usage || usage.date !== todayStr()) return true;
  return usage.count < 2;
}

export function recordStoryGeneration(userId: string): void {
  const today = todayStr();
  const usage = storyUsage.get(userId);
  if (!usage || usage.date !== today) {
    storyUsage.set(userId, { count: 1, date: today });
  } else {
    usage.count++;
  }
}

export function getStoriesRemaining(userId: string, isVipUser: boolean): number | string {
  if (isVipUser) return "ilimitado";
  const usage = storyUsage.get(userId);
  if (!usage || usage.date !== todayStr()) return 2;
  return Math.max(0, 2 - usage.count);
}

// ── Exported attribute options for manual selection ──────────
export const ATTR_OPTIONS = {
  feminino: {
    nomes: NOMES,
    cabelos: CABELOS,
    corOlhos: CORES_OLHOS,
    corPele: CORES_PELE,
    corporais: CORPORAIS,
    roupas: ROUPAS,
    acessorios: ACESSORIOS,
    acessoriosPrazer: ACESSORIOS_PRAZER,
    brinquedosAdultos: BRINQUEDOS_ADULTOS,
    personalidades: PERSONALIDADES,
    vozes: VOZES,
    tonsVoz: TONS_VOZ,
    maquiagens: MAQUIAGENS,
    perfumes: PERFUMES,
    tatuagens: TATUAGENS,
    fetiches: FETICHES,
  },
  masculino: {
    nomes: NOMES_MASC,
    cabelos: CABELOS_MASC,
    corOlhos: CORES_OLHOS,
    corPele: CORES_PELE,
    corporais: CORPORAIS_MASC,
    roupas: ROUPAS_MASC,
    acessorios: ACESSORIOS_MASC,
    acessoriosPrazer: ACESSORIOS_PRAZER,
    brinquedosAdultos: BRINQUEDOS_ADULTOS_MASC,
    personalidades: PERSONALIDADES_MASC,
    vozes: VOZES_MASC,
    tonsVoz: TONS_VOZ,
    maquiagens: ["nenhuma — rosto natural e marcante"],
    perfumes: PERFUMES,
    tatuagens: TATUAGENS_MASC,
    fetiches: FETICHES_MASC,
  },
};

// Attribute steps for manual selection flow
export const CUSTOM_STEPS = [
  { key: "cabelo", label: "💇 Cabelo", attr: "cabelos" },
  { key: "corOlhos", label: "👁️ Olhos", attr: "corOlhos" },
  { key: "corPele", label: "🎨 Pele", attr: "corPele" },
  { key: "corporal", label: "🏋️ Corpo", attr: "corporais" },
  { key: "roupa", label: "👗 Roupa", attr: "roupas" },
  { key: "brinquedoAdulto", label: "🔞 Brinquedo Adulto", attr: "brinquedosAdultos" },
  { key: "personalidade", label: "💜 Personalidade", attr: "personalidades" },
] as const;
