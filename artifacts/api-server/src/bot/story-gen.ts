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
      "cobertura luxuosa com vista para a cidade à noite",
      "praia deserta iluminada pela lua cheia",
      "suite presidencial de um hotel cinco estrelas em Paris",
      "jardim secreto com rosas vermelhas e fontes",
      "iate particular navegando pelo Mediterrâneo",
      "onsen japonês privativo ao entardecer",
      "mansão vitoriana durante uma tempestade",
      "camarim de um teatro após o espetáculo",
      "vinícola na Toscana ao pôr do sol",
      "cobertura em Mônaco com piscina de borda infinita",
    ],
    conflitos: [
      "amor proibido entre rival e herdeira","paixão secreta pelo melhor amigo do noivo",
      "reencontro com o ex após 5 anos","chefe e funcionária cruzam a linha",
      "casamento arranjado com estranho irresistível","vizinho misterioso que ouve tudo",
      "triângulo amoroso com gêmeas idênticas","amor à primeira vista no elevador quebrado",
      "professora e aluno de MBA proibido","médica e paciente com química explosiva",
    ],
    reviravoltas: [
      "ele tem uma esposa que ninguém sabia","ela descobre que ele é príncipe de verdade",
      "o diário secreto revela a verdade","uma foto comprometedora vaza",
      "gravidez inesperada muda tudo","o rival se apaixona também",
      "amnésia faz ela esquecer tudo","uma carta antiga revela o passado",
    ],
    finais: [
      "entrega total sob as estrelas","fuga juntos para recomeçar",
      "casamento secreto ao amanhecer","reconciliação ardente após a briga",
      "declaração pública de amor proibido","noite inesquecível que muda tudo",
      "escolha impossível feita com o coração","reencontro depois de anos separados",
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
      "castelo flutuante entre nuvens de cristal",
      "floresta encantada com árvores luminescentes",
      "templo submerso de uma civilização perdida",
      "palácio de gelo com aurora boreal",
      "torre de feiticeira no topo da montanha",
      "jardim proibido com flores que sussurram",
      "caverna de dragão com tesouros e sedas",
      "reino das fadas sob a lua de sangue",
      "biblioteca mágica com livros vivos",
      "trono de obsidiana em reino sombrio",
    ],
    conflitos: [
      "feiticeira e guerreiro de reinos rivais","elfa seduzida pelo rei demônio",
      "princesa que deve entregar-se ao dragão","sereia que atrai o capitão pirata",
      "vampira apaixonada por caçadora de vampiros","deusa banida que deseja um mortal",
      "bruxa que troca poderes por prazer","guerreira amazona captura príncipe inimigo",
      "fada proibida de amar humanos","sacerdotisa que quebra voto de castidade",
    ],
    reviravoltas: [
      "o feitiço de amor era real o tempo todo","ela é a profecia que destruirá o reino",
      "a maldição se quebra com beijo verdadeiro","o dragão se transforma em mulher",
      "os poderes dela despertam com o prazer","o portal entre mundos se fecha para sempre",
      "a poção do esquecimento não funcionou","ele era um deus disfarçado",
    ],
    finais: [
      "ritual de união mágica sob eclipse","fuga para dimensão onde o tempo não existe",
      "trono compartilhado entre luz e trevas","sacrifício que salva o reino e o amor",
      "metamorfose final em criatura imortal","pacto eterno selado com sangue e beijo",
      "despertar de poderes com a consumação","renúncia ao trono por amor proibido",
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
      "palácio imperial da China antiga",
      "harém otomano em Istambul",
      "corte de Versalhes no século XVIII",
      "navio pirata no Caribe",
      "templo grego durante festival dionisíaco",
      "castelo medieval durante cerco",
      "vila dos prazeres em Kyoto feudal",
      "Roma antiga durante as saturnálias",
      "tenda do sultão no deserto do Saara",
      "bordel elegante na Paris de 1920",
    ],
    conflitos: [
      "concubina que seduz o imperador rival","gueixa proibida de amar o samurai",
      "pirata e prisioneira nobre","rainha e cavaleiro da guarda real",
      "escrava que domina o faraó","cortesã que muda o rumo da guerra",
      "sacerdotisa e guerreiro bárbaro","princesa prometida que ama outro",
      "espiã na corte que se apaixona pelo rei","gladiadora que conquista o senador",
    ],
    reviravoltas: [
      "ela é a herdeira legítima do trono","o inimigo é irmão perdido",
      "o mapa do tesouro estava no vestido","a profecia se cumpre na cama real",
      "o veneno era afrodisíaco","o diário da rainha revela o complô",
      "a escrava era princesa disfarçada","o pirata é nobre banido",
    ],
    finais: [
      "fuga do palácio para viver livres","coroação juntos após a revolução",
      "noite no templo que muda a história","sacrifício que salva o império e o amor",
      "navegação para terra desconhecida a dois","pacto secreto entre reinos selado na cama",
      "revolução inspirada pelo amor proibido","renúncia ao trono por paixão",
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
  const p = personagem ?? gerarPersonagem();
  const cenario = pick(genero.cenarios);
  const conflito = pick(genero.conflitos);
  const reviravolta = pick(genero.reviravoltas);
  const final_ = pick(genero.finais);

  const tema = customTheme ? ` sobre ${customTheme}` : "";
  const titulo = gerarTitulo(p, genero);

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
    `Em um(a) ${cenario}${tema}, ${conflito}. ` +
    `Quando tudo parecia definido, ${reviravolta}. ` +
    `No clímax da história, ${final_}. ` +
    `${p.fetiche.charAt(0).toUpperCase() + p.fetiche.slice(1)}... ` +
    `Cada toque, cada olhar, cada suspiro... nada seria como antes.`;

  const imgPrompt =
    `cinematic anime style, beautiful ${p.genero === "masculino" ? "handsome man" : "woman"} named ${p.nome}, ` +
    `${p.cabelo.replace(/[^\w\s]/g, "")} hair, ` +
    `${p.corOlhos.replace(/[^\w\s]/g, "")} eyes, ${p.corPele.replace(/[^\w\s]/g, "")} skin, ` +
    `${p.corporal.replace(/[^\w\s]/g, "")} body, ` +
    `wearing ${p.roupa.replace(/[^\w\s]/g, "")}, ${p.acessorio.replace(/[^\w\s]/g, "")}, ` +
    `BACKGROUND SCENERY: ${cenario.replace(/[^\w\s]/g, "")}, detailed landscape behind character, ` +
    `${genero.label.replace(/[^\w\s]/g, "")} mood, ` +
    `sensual, cinematic lighting, detailed background environment, panoramic scenery, 8k, masterpiece`;

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

  const s = randSeed();
  const sinopse = pick(continuacoes) +
    ` Com seus cabelos ${p.cabelo} e ${p.acessorio}, ela era uma visão impossível de ignorar. ` +
    `Corpo ${p.corporal}, maquiagem ${p.maquiagem.split(",")[0]}. ` +
    `O perfume de ${p.perfume.split(" com")[0]} preenchia o ambiente. ` +
    `Sua voz ${p.voz}, tom ${p.tomVoz}, carregava promessas que ninguém ousaria recusar. ` +
    `${p.acessorioPrazer.charAt(0).toUpperCase() + p.acessorioPrazer.slice(1)} esperava pelo momento certo. ` +
    `Discretamente guardado, ${p.brinquedoAdulto} prometia elevar a intensidade da noite.`;

  const imgPrompt =
    `cinematic anime style, ${p.genero === "masculino" ? "handsome man" : "beautiful woman"} ${p.nome}, ` +
    `${p.cabelo.replace(/[^\w\s]/g, "")} hair, ` +
    `wearing ${p.roupa.replace(/[^\w\s]/g, "")}, sensual scene episode ${episodioNum}, ` +
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
