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

// Yuna - AI narrator avatar (portrait for D-ID lip-sync)
export const YUNA_PHOTO =
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=90";

export const DRAMAS: Drama[] = [
  {
    id: 1,
    title: "Desejo Proibido",
    genre: "Romance Histórico",
    status: "ongoing",
    synopsis:
      "Na corte imperial do século XVIII, uma jovem pintora talentosa cruza o caminho de um general misterioso e temido. O que começa com um encontro acidental em um jardim proibido se transforma em uma paixão avassaladora que desafia as leis do império.",
    coverImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=90",
  },
  {
    id: 2,
    title: "Noite de Segredos",
    genre: "Thriller Romântico",
    status: "ongoing",
    synopsis:
      "Uma detetive fria e calculista é forçada a trabalhar com o homem que destruiu sua vida anos atrás. Entre investigações perigosas e noites de tensão, velhas chamas ressurgem com intensidade devastadora.",
    coverImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=900&q=90",
  },
  {
    id: 3,
    title: "Dragão e Fênix",
    genre: "Fantasia Romântica",
    status: "ongoing",
    synopsis:
      "Em um mundo onde dragões e humanos existem em guerra eterna, um príncipe dragão captura uma sacerdotisa. Um laço místico os une para sempre, e o ódio entre eles vai se transformando em algo muito mais intenso.",
    coverImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=90",
  },
  {
    id: 4,
    title: "Amnésia do Coração",
    genre: "Romance Contemporâneo",
    status: "ongoing",
    synopsis:
      "Após um acidente devastador, ele acorda sem memórias. Ela, sua ex-noiva, é designada como sua cuidadora. Enquanto ele se apaixona por ela novamente, ela tenta resistir — mas o coração não esquece o que a mente perdeu.",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=90",
  },
  {
    id: 5,
    title: "Executiva de Seda",
    genre: "Romance Corporativo",
    status: "ongoing",
    synopsis:
      "A CEO mais temida do mercado financeiro é forçada a se associar com seu maior rival após uma fusão inesperada. Entre contratos e segredos corporativos, os limites entre negócio e paixão vão desaparecendo.",
    coverImage: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=900&q=90",
  },
];

// Character portraits for each drama (D-ID compatible face images)
const IMAGES: Record<number, string[]> = {
  1: [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1280&q=90",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1280&q=90",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1280&q=90",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1280&q=90",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1280&q=90",
  ],
  2: [
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1280&q=90",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1280&q=90",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1280&q=90",
    "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=1280&q=90",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1280&q=90",
  ],
  3: [
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1280&q=90",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1280&q=90",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1280&q=90",
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1280&q=90",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1280&q=90",
  ],
  4: [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1280&q=90",
    "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=1280&q=90",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1280&q=90",
    "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=1280&q=90",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1280&q=90",
  ],
  5: [
    "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=1280&q=90",
    "https://images.unsplash.com/photo-1542740348-39501cd6e2b4?w=1280&q=90",
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1280&q=90",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1280&q=90",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1280&q=90",
  ],
};

const EPISODES_DATA: Record<
  number,
  { title: string; synopsis: string; teaser: string }[]
> = {
  1: [
    {
      title: "O Jardim Proibido",
      teaser: "Um encontro proibido no jardim do palácio... ela nunca deveria ter olhado nos olhos dele. Mas foi tarde demais. Assine o VIP e descubra o que aconteceu naquela noite.",
      synopsis: "No jardim secreto do palácio imperial, onde nenhuma mulher comum deveria entrar, a pintora Mei caminhava sozinha ao luar, com o pincel ainda molhado de tinta e o coração cheio de sonhos proibidos. Então ele apareceu... o General Han, com sua armadura negra e o olhar que cortava como uma espada. Por um segundo eterno, seus olhos se encontraram. Ela sentiu o calor subir pela pele como se o próprio sol tivesse descido para queimá-la por dentro. Ele segurou o fôlego. Nenhum dos dois conseguiu se mover. A brisa quente da noite carregava o perfume das flores e o perigo daquele momento. Um olhar que durou apenas segundos... mas que mudaria o destino de ambos para sempre. Quando ela tropeçou, ele a segurou — e nenhum dos dois conseguiu soltar. O contato das mãos dele sobre sua cintura foi uma sentença. Um desejo nasceu ali, naquele jardim proibido, regado por luar e pecado.",
    },
    {
      title: "A Pintura Perigosa",
      teaser: "Ela foi convocada para retratar o general... mas enquanto pintava, descobriu marcas que ninguém deveria ver. Assine o VIP para saber o que estava escondido sob a armadura dele.",
      synopsis: "A convocação chegou ao amanhecer: a pintora Mei deveria retratar o General Han para o arquivo imperial. Quando ele removeu a armadura diante dela, Mei precisou morder o lábio para não trair o que sentia. O corpo dele era um mapa de guerras passadas — cicatrizes que contavam histórias de dor e sobrevivência. A cada pincelada cautelosa, ela descobria mais. Seus ombros largos, a linha firme da mandíbula, os olhos escuros que a observavam com uma intensidade que ela não conseguia ignorar. Ele percebeu que ela via mais do que deveria. E em vez de temor, sentiu algo que nunca havia experimentado: a vontade de ser visto. Quando o pincel de Mei roçou acidentalmente a cicatriz na altura do seu peito, ambos prenderam a respiração. O silêncio entre eles ficou denso, carregado de tudo que não podia ser dito. Naquela tarde fechada no ateliê real, a tela capturou muito mais que um retrato — capturou o início de uma paixão impossível.",
    },
    {
      title: "O Segredo da Corte",
      teaser: "Um traidor entre os nobres... e a única forma de descobri-lo era se passando de casal. Assine o VIP e veja o que aconteceu quando as mãos deles se tocaram pela primeira vez.",
      synopsis: "A conspiração havia chegado ao coração do império, e apenas dois olhos atentos poderiam encontrar o traidor entre os nobres sorridentes do banquete real. O General Han escolheu Mei para a missão mais perigosa de sua vida: fingir ser sua esposa por uma noite. Ela usava um quimono de seda carmesim que acariciava cada curva do seu corpo, e quando o braço de Han envolveu sua cintura pela primeira vez, um fio elétrico percorreu a espinha dela. Ele se inclinou para sussurrar instruções em seu ouvido, e seus lábios quase tocaram a curva do pescoço dela. A sala inteira os observava como um casal apaixonado — sem saber que o que exibiam estava perigosamente perto de ser real. Quando ela ria para as câmeras da corte e ele a olhava de canto de olho, algo se quebrou entre eles. O jogo havia virado verdade. E os dois sabiam disso, mas nenhum tinha coragem de admitir.",
    },
    {
      title: "A Noite da Tempestade",
      teaser: "Presos juntos enquanto a tempestade rugia lá fora... ele contou o que nunca disse a ninguém. E ela chorou. Assine o VIP para saber o que aconteceu depois das lágrimas.",
      synopsis: "A tempestade caiu sobre a estrada sem aviso, e a pousada abandonada foi o único refúgio. Uma vela. Duas pessoas. Uma noite que não deveria ter acontecido. Enquanto o vento uivava lá fora e a chuva batia nas janelas como punhos furiosos, o General Han e Mei ficaram sentados frente a frente pela primeira vez sem máscaras, sem títulos, sem armadura. Ele contou sobre a batalha que destruiu sua família — as palavras saíam lentas, pesadas, como se cada sílaba custasse sangue. Mei ouviu sem piscar, e as lágrimas desceram pelo rosto dela antes que ela pudesse impedi-las. Com uma delicadeza que ninguém esperaria de um general de guerra, ele levantou o polegar e enxugou cada lágrima, um por um. Aquele toque foi mais íntimo do que qualquer coisa que ela havia sentido. Nenhum dos dois dormiu naquela noite. Ficaram acordados ouvindo a chuva e sentindo o peso do que estava crescendo entre eles — algo proibido, inevitável e absolutamente irresistível.",
    },
    {
      title: "O Decreto Imperial",
      teaser: "O imperador decretou que Han deveria se casar com outra. Mei desapareceu por três dias. Assine o VIP e veja onde ele a encontrou — e o que ele disse quando chegou lá.",
      synopsis: "O decreto imperial chegou como uma lâmina: o General Han deveria contrair matrimônio com a Princesa do Norte antes da próxima lua cheia. Mei leu o anúncio colado nos muros do palácio e sentiu o mundo desabar em silêncio. Por três dias, ela desapareceu. Han a procurou por cada canto do império, com o coração fora do lugar por primeira vez em sua vida de soldado. Quando a encontrou, ela estava numa clareira longe da cidade, sentada na grama com o pincel na mão, pintando uma paisagem simples de campos abertos — o lugar onde ela sempre sonhara viver, livre de tudo. Ele ficou parado atrás dela por um longo tempo, apenas observando. A suavidade das pinceladas, o jeito que ela mordia o lábio quando se concentrava, a leveza nos ombros que ela não mostrava dentro do palácio. Então ele sentou ao lado dela, no chão, sem dizer nada. E naquele silêncio, ele tomou a decisão que mudaria tudo: não ia obedecer ao imperador.",
    },
    {
      title: "A Fuga",
      teaser: "A guarda imperial os descobriu. Eles precisavam fugir... juntos. E na corrida, ele foi ferido. Assine o VIP para ver o que aconteceu quando ela curou suas feridas naquela noite.",
      synopsis: "Os passos da guarda imperial ecoavam pelas pedras do palácio quando Han pegou a mão de Mei e correu. Ela nunca havia corrido tanto na vida, os pés descalços sobre a pedra fria, o coração disparado não só pelo medo mas pela mão forte que segurava a dela com uma firmeza que dizia: eu não vou te largar. Eles chegaram a um templo antigo nas bordas da floresta — paredes de pedra, silêncio de séculos, o cheiro de incenso velho. Foi só ali que Mei percebeu o sangue escorrendo pelo ombro dele. A flecha havia roçado, mas o corte era fundo. Com mãos trêmulas e olhos anegados, ela rasgou a barra do seu quimono e pressionou contra a ferida. Ele prendeu a respiração — não de dor, mas do calor das mãos dela sobre sua pele. Entre velas acesas por devoção de outros e sombras que dançavam nas paredes, ele finalmente disse em voz alta o que seus olhos gritavam havia semanas. E ela respondeu sem palavras — com os lábios.",
    },
    {
      title: "O Refúgio nas Montanhas",
      teaser: "Escondidos nas montanhas nevadas, eles criaram uma vida juntos... mas por quanto tempo? Assine o VIP para ver o que acontece quando a paz começa a desmoronar.",
      synopsis: "Nas montanhas onde a neve apagava todos os rastros, Han e Mei construíram um mundo só deles. Uma cabana pequena, uma lareira, o barulho do vento nas árvores e o calor de dois corpos que haviam finalmente parado de lutar contra si mesmos. De dia, ele cortava lenha e ela pintava a paisagem branca com aquarelas que nunca secavam completamente no frio. De noite, dormiam enrolados um no outro com a intensidade de quem sabe que o tempo é precioso e imprevisível. Ela desenhava as cicatrizes nas costas dele com a ponta dos dedos enquanto ele dormia, cada linha uma história que ela memorizava como se um dia fosse precisar recontar. Mas a paz das montanhas escondia um perigo crescente: os espiões do imperador nunca paravam. E cada amanhecer que ele acordava e olhava para o rosto dela adormecido, Han sabia que ia chegar o dia em que teria que escolher entre ela e tudo o mais. E a escolha já estava feita.",
    },
    {
      title: "O Retorno Inevitável",
      teaser: "O pai de Mei foi preso. Só ela podia salvá-lo... mas o preço era abandonar Han. Assine o VIP para ver se ela vai embora — ou se Han encontra outro caminho.",
      synopsis: "A carta chegou com um pássaro exausto: o pai de Mei estava preso na torre imperial, acusado de traição por abrigar uma foragida. Ela leu e releu as palavras até que as letras começaram a se mover na página. Han ficou parado do outro lado do quarto olhando para ela, e não precisou de explicação. Ele via tudo no rosto dela — o peso do amor filial, a dor da escolha impossível, a decisão que ela já havia tomado antes mesmo de abrir a boca. Ela iria. Ele não ia impedir. Mas na noite anterior à partida, enquanto as chamas da lareira projetavam sombras douradas sobre os dois, nenhum deles dormiu. Ficaram acordados falando sobre tudo e nada, gravando o som da voz um do outro, o calor de cada toque, o cheiro do cabelo, a textura da pele — como se fossem cegos e precisassem conhecer um ao outro pelo tato para nunca esquecer. Ao amanhecer, ele prometeu: ia encontrar outro caminho. Ela não acreditou completamente. Mas precisava acreditar.",
    },
    {
      title: "A Última Batalha",
      teaser: "Han voltou para a corte disfarçado para enfrentar o ministro corrupto. Mei assistiu escondida segurando o único presente que ele lhe dera. Assine o VIP e veja se ele sobrevive.",
      synopsis: "O ministro corrupto estava no centro do salão do trono com um sorriso de quem acreditava ter vencido. Não sabia que Han havia voltado. Disfarçado entre os nobres com roupas emprestadas e um chapéu que escondia o olhar mais perigoso da corte, o general caminhou devagar até o centro da sala com a calma de quem não tem mais nada a perder — porque tudo que realmente importava já estava a salvo. Mei assistia de trás de uma coluna, os dedos apertados em torno do pincel que ele lhe havia dado na noite da tempestade, o único presente que ela havia guardado escondido contra o peito durante todos aqueles dias. O confronto foi rápido, brutal e decisivo. Han falou com uma voz que cortou o silêncio do salão como uma espada, apresentando as provas da traição do ministro uma a uma, com a precisão de um general e a frieza de um homem que passou semanas planejando cada palavra. Quando a guarda imperial interveio, foi para prender o ministro — não Han. Mei fechou os olhos e respirou pela primeira vez em horas.",
    },
    {
      title: "Além do Império",
      teaser: "Livres. Finalmente livres. Mas o que acontece quando dois foragidos do amor saem pelos portões do palácio de mãos dadas? Assine o VIP para o final que você merece.",
      synopsis: "O imperador, diante das provas irrefutáveis e da pressão de uma corte que havia se voltado contra o ministro corrupto, concedeu a liberdade. Não como favor — como reconhecimento. Han e Mei caminharam lado a lado pelos corredores de pedra que tantas vezes os haviam separado, sem pressa, sem medo, sem olhar para trás. Quando passaram pelo grande portão dourado do palácio, a luz do sol da tarde caiu sobre eles com uma generosidade que a sombra do império nunca havia permitido. Ela riu. Um riso genuíno, solto, sem nenhuma contenção — o tipo de riso que só acontece quando o peso de meses de medo finalmente cai dos ombros. Han parou de caminhar só para ouvi-la rir. Depois ele puxou ela pelos ombros e a abraçou ali mesmo, no meio da estrada, diante de todos os guardas e passantes. E ela enterrou o rosto no peito dele e sentiu, pela primeira vez na vida, que estava exatamente onde deveria estar. A estrada se abria longa e dourada à frente deles. E era só deles.",
    },
  ],
  2: [
    {
      title: "O Arquivo Secreto",
      teaser: "O caso impossível. O parceiro impossível. O homem que destruiu sua vida — agora era sua única opção. Assine o VIP para ver como tudo começa a desmoronar.",
      synopsis: "A detetive Soo-Ah abriu o arquivo e o primeiro nome que viu foi o que ela havia passado cinco anos tentando esquecer: Ji-Ho. Seu novo parceiro de caso. O homem que a havia denunciado ao conselho disciplinar, destruído sua reputação e roubado o único caso que poderia ter feito sua carreira. Ela cerrou os dentes e sorriu — o tipo de sorriso afiado que não chegava aos olhos — quando ele entrou na sala de reuniões com aquela confiança irritante que ela ainda odiava da mesma forma que antes. Ele a olhou. Ela o olhou. Cinco anos de silêncio em dois segundos. Então ele estendeu a mão para cumprimentá-la como se fossem completos estranhos, e ela apertou com a mesma força de quem está impedindo a si mesma de fazer outra coisa. O caso que teriam que resolver juntos era complexo, perigoso e sensível. E a tensão entre eles era todas essas coisas ao mesmo tempo — mais uma.",
    },
    {
      title: "A Primeira Pista",
      teaser: "Um clube noturno de luxo. Uma missão disfarçados de casal. O braço dele ao redor dela pela primeira vez. Assine o VIP para sentir essa tensão com eles.",
      synopsis: "A pista levava a um clube noturno de alto luxo onde somente casais podiam entrar — uma medida de segurança do alvo. Ji-Ho apresentou a ideia com uma naturalidade que fez Soo-Ah apertar os olhos: teriam que se passar por um casal. Ela concordou sem deixar transparecer nada. Dentro do clube, com luzes baixas e música que pulsava como um segundo coração, Ji-Ho colocou o braço ao redor da cintura dela com uma familiaridade suave que deveria ser só performance. Mas o calor da mão dele através do tecido do vestido foi muito mais real do que ela estava preparada para sentir. Ela se obrigou a sorrir para uma câmera fingida, inclinando a cabeça para o ombro dele levemente, e sentiu os lábios dele rozarem o topo do seu cabelo — tecnicamente para o personagem, mas o arrepio que desceu pela sua espinha não era técnico absolutamente nada. Ela odiava como aquilo parecia... certo.",
    },
    {
      title: "Noite de Interrogatório",
      teaser: "O interrogatório durou até o amanhecer. E enquanto ela trabalhava, ele não tirava os olhos dela. Assine o VIP para ouvir o que ele disse quando o sol nasceu.",
      synopsis: "Trancados na sala de interrogatório com o suspeito do outro lado do espelho, Ji-Ho ficou de pé enquanto Soo-Ah conduzia o interrogatório com uma frieza cirúrgica que deixou até o suspeito desconfortável. Ela não levantava a voz. Não ameaçava. Apenas fazia perguntas com uma calma devastadora que tornava impossível mentir, como se a verdade fosse a única saída lógica diante de alguém tão absolutamente certo do que sabia. Ji-Ho observou aquilo por horas. O jeito que ela cruzava os braços quando pensava. O movimento sutil do queixo quando captava uma inconsistência. Os olhos que não piscavam quando eram necessários. Quando o suspeito finalmente cedeu às quatro da manhã, Soo-Ah saiu da sala sem comemorar — apenas pegou o casaco e começou a redigir o relatório. Ji-Ho ficou parado no corredor vazio percebendo que havia passado cinco anos com uma versão errada dela na cabeça. E que havia errado de um jeito que nunca poderia desfazer.",
    },
    {
      title: "O Apartamento Compartilhado",
      teaser: "Uma semana no mesmo apartamento. Regras estabelecidas. Parede fina entre eles. Assine o VIP para saber o que aconteceu na primeira noite em que os dois não conseguiram dormir.",
      synopsis: "A ameaça ao caso era real o suficiente para justificar uma casa segura. Uma semana. Um apartamento. Dois quartos separados por uma parede de drywall que Soo-Ah olhou por um longo tempo antes de estabelecer as regras: sem conversas pessoais, sem perguntas sobre o passado, sem fingir que eram algo além de colegas de missão. Ji-Ho concordou com tudo, com aquela expressão que ela nunca conseguia ler completamente. Na primeira noite, ela deitou na cama olhando para o teto, ouvindo os sons do apartamento — a torneira que pingava, o vento na janela, os passos dele do outro lado da parede enquanto ele aparentemente também não conseguia dormir. Às duas da manhã, ela ouviu a televisão acender baixinho no quarto dele. Às três, ela ouviu desligar. Às quatro, o silêncio voltou. Ela ficou parada no escuro contando sua própria respiração, de um lado da parede fina. Ele fez exatamente a mesma coisa do outro lado. Os dois sabiam que o outro estava acordado. Nenhum bateu na parede.",
    },
    {
      title: "A Confissão Errada",
      teaser: "Depois de resolver metade do caso, os dois beberam. E ele finalmente disse por que a havia denunciado. A resposta era mais complicada do que ela pensava. Assine o VIP.",
      synopsis: "O saquê ficou na mesa entre eles como um árbitro silencioso enquanto os documentos do caso se amontoavam à volta. Quando Ji-Ho finalmente falou — com a voz levemente imprecisa de quem bebeu um pouco mais do que pretendia — as palavras saíram em ordem errada, de trás para frente, como segredos que haviam esperado tempo demais para ser ditos. Ele não a havia denunciado por inveja. Havia denunciado porque alguém a havia armado — e ele, na época, não tinha como saber. Quando percebeu o erro, já era tarde. Ela havia sido transferida. O processo havia acabado. E ele havia carregado aquilo por cinco anos sem saber como chegar até ela. Soo-Ah ouviu tudo sem piscar, o copo parado a meio caminho dos lábios. Então ela pousou o copo na mesa com uma calma que era o contrário exato de como ela se sentia por dentro. Levantou. Saiu. Fechou a porta sem fazer barulho. Ele ficou sozinho olhando para o saquê que sobrou, carregando o peso de uma verdade que havia chegado tarde demais — ou não.",
    },
    {
      title: "O Tiro no Escuro",
      teaser: "A emboscada deixou Ji-Ho ferido. Soo-Ah ficou no hospital a noite toda, recusando ir embora. Na madrugada ele pegou a mão dela. Assine o VIP e veja se ela largou.",
      synopsis: "O tiro veio do escuro sem aviso, e Ji-Ho caiu no asfalto molhado antes que Soo-Ah pudesse reagir. Ela correu para ele com o coração na garganta, pressionando as mãos no ferimento com uma força que era desespero disfarçado de treinamento. No hospital, enquanto os médicos trabalhavam, ela ficou no corredor com as mãos ainda manchadas de sangue dele, recusando ir embora quando a enfermeira gentilmente sugeriu que voltasse no dia seguinte. Ela ficou. Sentada na cadeira de plástico mais desconfortável do corredor, com o casaco sobre os ombros e os joelhos dobrados para o peito, ela ficou. Quando ele acordou às três da manhã e a viu ali — cansada, com o cabelo desfeito e os olhos vermelhos que ela estava claramente tentando não deixar ficar — ele não disse nada. Apenas estendeu a mão que não estava conectada a aparelhos. E ela deixou. Ficaram assim até o amanhecer sem precisar explicar o que aquilo significava.",
    },
    {
      title: "Segredos do Passado",
      teaser: "O caso revelou uma conexão inesperada com o passado deles. Alguém os colocou juntos de propósito. Mas quem? E por quê? Assine o VIP para descobrir.",
      synopsis: "O arquivo que encontraram no servidor criptografado do suspeito continha nomes que não deveriam estar juntos — e o mais perturbador estava no meio: os nomes de Soo-Ah e Ji-Ho, cinco anos atrás, lado a lado em um documento interno de uma organização que nenhum dos dois havia investigado antes. Alguém havia orquestrado a denúncia. Alguém havia separado os dois intencionalmente — porque juntos, eles eram perigosos para essa organização. E agora, aquela mesma organização havia colocado os dois no mesmo caso. Soo-Ah ficou olhando para a tela por um longo tempo enquanto a implicação se assentava. Ji-Ho ficou de pé atrás dela, tão perto que ela conseguia sentir o calor dele, os olhos percorrendo as mesmas linhas. Então ela virou para encará-lo — e percebeu que a distância entre eles era menor do que havia percebido. Os olhos dele encontraram os dela. Nenhum dos dois recuou.",
    },
    {
      title: "A Armadilha",
      teaser: "Presos num depósito sem comunicação. Sem sinal. Sem saída imediata. Só eles dois — e tudo que nunca tinham dito. Assine o VIP para ouvir cada palavra.",
      synopsis: "A porta do depósito fechou com um clique definitivo, e o sinal do celular desapareceu completamente. A armadilha estava perfeitamente montada — e eles haviam caído com os olhos abertos. Soo-Ah percorreu o perímetro duas vezes enquanto Ji-Ho examinava a fechadura sem sucesso. Então os dois sentaram no chão encostados na parede de metal frio e aceitaram a situação: teriam que esperar. No escuro parcial do depósito, com apenas a luz fraca de uma lanterna de celular no modo de economia, o silêncio entre eles começou a pesar de um jeito diferente do habitual. Não era o silêncio de dois profissionais. Era o silêncio de duas pessoas que tinham finalmente parado de correr. Ji-Ho falou primeiro — não sobre o caso, não sobre saída, mas sobre ela. Sobre o que sentia. Com a voz baixa e direta de quem calculou que talvez não tivesse outra oportunidade. Soo-Ah ouviu com os joelhos dobrados e os olhos fixos na lanterna, e quando ele terminou, ficou em silêncio por um tempo que pareceu durar horas. Então respondeu.",
    },
    {
      title: "A Revelação Final",
      teaser: "O líder da organização estava dentro da própria delegacia. Menos de uma hora para agir. Assine o VIP e veja o final explosivo que você não vai esquecer.",
      synopsis: "O rosto que apareceu nos arquivos era familiar demais — e por isso levou tanto tempo para ser visto. O chefe da divisão. O homem que havia aprovado a dupla deles. O mesmo que havia orquestrado cada passo da armadilha. Soo-Ah e Ji-Ho olharam para a prova simultâneos, e a troca de olhares que aconteceu naquele momento foi mais rápida e completa do que qualquer conversa — uma comunicação de dois profissionais que haviam aprendido a ler um ao outro nos piores momentos possíveis. Tinham menos de uma hora antes que o servidor fosse apagado. Eles se moveram como um só organismo, dividindo as tarefas sem precisar discutir, completando os raciocínios um do outro no meio das frases, cobrindo cada ponto cego com uma precisão que vinha de algo além de treinamento. Quando a polícia externa chegou com o mandado, o dossier já estava completo, selado e nas mãos certas. O chefe foi detido na porta de saída. E Soo-Ah e Ji-Ho ficaram parados no corredor vazio, ombro a ombro, em silêncio — o tipo de silêncio que só existe depois de uma tempestade.",
    },
    {
      title: "Após o Caso",
      teaser: "Sem caso, sem missão, sem desculpa para estar juntos. Um café. Ele disse três palavras. Ela sorriu pela primeira vez em cinco anos. Assine o VIP para o final que você merece.",
      synopsis: "O café ficava a três quadras da delegacia — pequeno, barulhento, com cadeiras de madeira que rangiam — e era o lugar mais comum do mundo para uma conversa que havia esperado cinco anos para acontecer. Soo-Ah chegou primeiro e escolheu a mesa do fundo por hábito. Ji-Ho chegou dois minutos depois, sem uniforme, sem distintivo, sem o peso do cargo nos ombros. Só ele. Ela pediu café preto. Ele pediu o mesmo. O atendente os olhou dois segundos a mais do que o necessário antes de ir. Eles conversaram sobre o caso, sobre o que viria depois, sobre a reputação dela que finalmente seria restaurada com a condenação. Então houve uma pausa, o tipo de pausa que existe quando as palavras importantes estão esperando na fila. Ji-Ho olhou para ela através da mesa e disse três palavras com uma quietude que não tinha nada de dramático — apenas verdadeiro, como um fato que ele havia aceitado faz muito tempo. E Soo-Ah, que há cinco anos não sorria de verdade para nada, sorriu.",
    },
  ],
  3: [
    {
      title: "A Captura",
      teaser: "O príncipe dragão capturou a sacerdotisa. Ela jurou que escaparia antes da próxima lua. Ele riu. Ninguém nunca havia fugido. Assine o VIP para ver o que acontece na primeira noite.",
      synopsis: "O ataque ao templo sagrado durou menos de dez minutos — tempo suficiente para o Príncipe Dragão Kael entrar, destruir o altar e sair com a sacerdotisa Lirien presa nos braços como se fosse um troféu de guerra. Ela lutou com cada grama de força que tinha, chutando, arranhando, usando seus poderes sagrados que foram neutralizados pelos grilhões de metal negro que ele colocou nos seus pulsos. No castelo nas nuvens, ele a colocou no quarto mais alto da torre mais alta e disse, com uma frieza absoluta, que ela era agora sua prisioneira de guerra. Lirien olhou para aqueles olhos negros com fendas verticais — olhos que não eram humanos, que nunca seriam — e prometeu em voz alta e com toda a dignidade que lhe restava que fugiria antes da próxima lua cheia. Ele sorriu. Um sorriso que não era gentil nem cruel — era o sorriso de alguém que sabia exatamente o que a espera e não tinha pressa. Ninguém havia fugido em quatrocentos anos. Ela começou a planejar na primeira hora.",
    },
    {
      title: "O Laço Místico",
      teaser: "O ritual ativou por acidente. Agora estavam ligados — se um morre, o outro morre. Os dois se olharam com horror... e depois com algo que nenhum queria nomear. Assine o VIP.",
      synopsis: "Foi um acidente. Um ritual antigo, palavras pronunciadas sem intenção no contexto errado, uma energia que havia dormido por séculos acordando de repente na sala de poder do castelo. Quando a luz explodiu entre eles e depois desapareceu, Lirien e Kael ficaram parados, respirando com dificuldade, sentindo algo que nenhum dos dois conseguia descrever. O laço místico era invisível mas absolutamente real: quando Kael apertou a mão com força contra a própria palma, Lirien sentiu a pressão no mesmo lugar, do outro lado do castelo, e gritou de dor. Quando ele correu até ela e viu a marca idêntica na palma dela, Kael ficou em silêncio por um tempo muito longo. A implicação era clara para ambos: ligados por força vital. Se um sofresse, o outro sentia. Se um morresse, o outro morria. Lirien olhou para ele com aqueles olhos dourados cheios de ódio e terror. Kael olhou para ela com uma expressão que começou como perturbação e foi, lentamente, se transformando em algo que ele não havia sentido em quatrocentos anos de vida: curiosidade genuína.",
    },
    {
      title: "A Primeira Batalha",
      teaser: "Kael foi para o combate e Lirien sentiu cada golpe do outro lado do castelo. Quando ele voltou ferido, ela curou. Mãos dela sobre a pele dele. Assine o VIP para essa cena.",
      synopsis: "Os inimigos chegaram antes do amanhecer — uma aliança de clãs rivais que haviam esperado pela fraqueza do reino. Kael transformou no pátio do castelo com um rugido que sacudiu as pedras e Lirien, do alto da janela da torre, sentiu o impacto de cada golpe na batalha como se fosse dela. Quando uma lança o atingiu no ombro, ela dobrou de dor no quarto, agarrando o próprio ombro com as mãos brancas. Quando ele levou um segundo golpe no flanco, ela gritou. E quando a batalha finalmente acabou e Kael voltou — sangue, fumaça e os olhos ainda brilhando com o fogo da transformação — ela estava esperando na porta com o coração a mil e os poderes sagrados já ativados nas palmas das mãos. Ele parou. A olhou. Era a última coisa que esperava. Ela curou as feridas dele com os poderes que havia jurado não usar para servir a nenhum dragão — e enquanto as mãos dela percorriam o ferimento no flanco, deixando uma luz suave no rastro dos dedos, nenhum dos dois disse uma palavra. O silêncio foi mais alto do que a batalha.",
    },
    {
      title: "O Segredo das Escamas",
      teaser: "Lirien descobriu que as escamas de Kael eram sua maior vulnerabilidade — e sua maior vergonha. A noite em que ela estendeu a mão sem medo mudou tudo. Assine o VIP.",
      synopsis: "A descoberta aconteceu por acidente, como todas as coisas importantes. Lirien estava folheando os arquivos do castelo quando encontrou o manuscrito antigo que descrevia a anatomia dos dragões — e a parte que ninguém nos templos humanos jamais sabia: as escamas ao longo da espinha dorsal, que na forma humana aparecem como marcas escuras no pescoço e nos ombros, eram o ponto de maior sensibilidade do corpo de um dragão. Não uma fraqueza de combate — uma vulnerabilidade emocional. O lugar que eles nunca deixavam ser tocado. Naquela noite ela encontrou Kael sozinho no jardim do castelo, em forma parcialmente transformada, as escamas azul-escuras visíveis ao longo do pescoço dele brilhando suavemente à luz da lua. Ele não a ouviu se aproximar. Quando percebeu sua presença, ficou rígido — esperando o julgamento, a repulsa, o medo que sempre vinha dos humanos diante da verdadeira natureza dele. Lirien olhou por um momento. Então estendeu a mão devagar, como se pedindo permissão ao ar, e tocou levemente uma das escamas com a ponta dos dedos. Ele não respirou por um longo tempo.",
    },
    {
      title: "A Dança do Fogo",
      teaser: "A festa do solstício exigia que o príncipe dançasse com sua prisioneira. Ele a ensinou. Mãos que se tocaram pela primeira vez sem raiva. A corte toda olhava. Eles não perceberam. Assine o VIP.",
      synopsis: "A tradição era antiga e inflexível: no solstício de verão, o senhor do castelo dançava com aquela que estava sob sua proteção diante de toda a corte dragão. Kael explicou isso para Lirien com a mesma expressão com que anunciava o clima — sem inflexão, sem contexto emocional. Ela aceitou com a dignidade fria de uma sacerdotisa. O problema era que a dança dragão não era como nada que ela havia aprendido. Então ele a ensinou — ali mesmo na sala de trono vazia, três dias antes, com a música que ele cantarolava numa língua antiga que ela não conhecia mas que vibrava em algum lugar profundo dentro dela. Quando ele tomou as mãos dela pela primeira vez para posicioná-las corretamente, ambos pararam um segundo. As mãos dele eram quentes, sempre mais quentes do que qualquer coisa humana. As dela eram frescas, sempre assim desde criança. O contraste foi físico, óbvio, impossível de ignorar. Durante o ensaio, eles se tocaram dezenas de vezes. E cada toque foi ligeiramente diferente do anterior — como se os dois estivessem aprendendo algo que não estava nos passos da dança.",
    },
    {
      title: "O Veneno Sagrado",
      teaser: "Lirien foi envenenada por quem queria destruir o laço místico. Kael voou três dias sem parar procurando o antídoto. Quando ela acordou, ele estava lá, exausto. Assine o VIP.",
      synopsis: "O veneno sagrado era a única substância que podia romper um laço místico sem matar os dois — bastava matar apenas um. A facção que queria Kael morto havia envenenado Lirien com precisão e paciência. Quando ela colapsou na biblioteca com os lábios azuis e o pulso fraquíssimo, Kael sentiu pelo laço algo que não conseguia nomear com palavras dragão: terror. Ele voou em forma plena durante três dias e duas noites, cruzando montanhas e oceanos, interrogando monges e bruxas e velhos guardiões que não viam um dragão há séculos. Quando voltou com o antídoto nas garras e o atravessou pelos lábios dela, Kael estava com círculos escuros nos olhos e as asas com pequenas lacerações de tanto voar. Quando Lirien abriu os olhos e o viu ali — aquele ser poderoso e impossível, exausto por causa dela — ela ficou em silêncio por um tempo. Então perguntou, em voz muito baixa: quando você dormiu? Ele olhou para o lado sem responder. E ela entendeu.",
    },
    {
      title: "A Traição da Corte",
      teaser: "A guerra entre dragões e humanos foi criada artificialmente. Eles são a única union que pode acabar com tudo — e por isso querem os dois mortos. Assine o VIP.",
      synopsis: "O conselheiro mais antigo de Kael era também o traidor mais paciente que a história do reino havia produzido. Durante trezentos anos, ele havia alimentado a guerra entre dragões e humanos com mentiras cuidadosamente plantadas, alimentando o ódio de ambos os lados porque a guerra era o que mantinha seu poder. E quando o laço místico se formou entre Kael e Lirien — algo que os manuscritos chamavam de A União dos Opostos, a única força capaz de desfazer o encantamento que mantinha o conflito — ele soube que os dois precisavam morrer. Kael ouviu a revelação com uma quietude que assustou mais do que a raiva teria assustado. Lirien ficou de pé ao lado dele, sentindo pelo laço a tempestade dentro dele que o rosto não mostrava, e pôs a mão no braço dele sem pensar. Aquele gesto — tão pequeno, tão natural — foi o que deteve Kael de transformar ali mesmo e destruir metade do castelo. Eles se olharam. E entenderam ao mesmo tempo, pelo mesmo laço que os havia preso, que o que tinham era maior do que a raiva.",
    },
    {
      title: "A Fuga pelas Nuvens",
      teaser: "Com assassinos atrás deles, Kael transformou e Lirien subiu nas costas dele. Voando acima das nuvens, ela entendeu: o medo que sentia não era dele. Era de perder ele. Assine o VIP.",
      synopsis: "Com metade da corte armada atrás deles e o conselheiro traidor controlando os portões, Kael tomou a decisão em meio segundo: transformou. A transformação completa de um dragão é algo que poucos humanos vivem para descrever — um estrondo de magia e osso e fogo, as asas se abrindo com um estouro de ar que empurrou os guardas para longe. Lirien tinha exatamente três segundos para subir nas costas dele antes que eles atacassem. Ela subiu. E então estavam nas nuvens — o vento cortando, o frio intenso de altitude, o rugido surdo das asas abaixo dela enquanto o castelo encolhia até virar um ponto no mapa. Ela se debruçou sobre o pescoço dele com os braços apertados, o rosto contra as escamas quentes, os olhos fechados. E ali, suspensa entre o céu e a terra, percebeu algo que havia estado errado desde o começo: o medo que sentia perto dele nunca havia sido medo de Kael. Era medo de querer ficar. Era medo de perder alguém que havia se tornado, sem que ela percebesse, a coisa mais importante no mundo.",
    },
    {
      title: "O Ritual da Escolha",
      teaser: "O laço podia ser quebrado — mas só se um escolhesse morrer. O traidor apresentou essa opção. Kael e Lirien se olharam. Os dois pensaram a mesma coisa. Nenhum aceitou. Assine o VIP.",
      synopsis: "O ritual da ruptura era descrito em detalhes perturbadores no manuscrito que o conselheiro traidor apresentou com um sorriso: um dos dois deveria pronunciar as palavras de rejeição e se ofertar ao fogo sagrado. O laço se romperia. O outro sobreviveria. Simples. Limpo. Definitivo. Kael olhou para o manuscrito por exatamente dois segundos, então olhou para Lirien. Ela olhava para o texto com aqueles olhos dourados que ele havia aprendido a ler melhor do que qualquer carta ou mapa. Ele sabia o que ela estava pensando — porque estava pensando exatamente a mesma coisa. Os dois pensaram em se oferecer. Os dois pensaram no outro. Os dois chegaram à mesma conclusão no mesmo instante. Lirien fechou o manuscrito com uma calma que era fúria disfarçada de serenidade. Kael colocou a mão sobre o livro fechado — as escamas do dorso da mão visíveis, a temperatura sempre alta — e disse apenas: encontraremos outro caminho. O traidor sorriu como se isso fosse exatamente o que havia planejado. O que havia.",
    },
    {
      title: "Dragão e Fênix Unidos",
      teaser: "A batalha final. O encantamento desfeito. O laço místico desapareceu. Mas o que ficou entre eles era mais forte. Assine o VIP para o final épico e sensual que você merece.",
      synopsis: "Na batalha final sobre as planícies que haviam sido campo de guerra por séculos, Kael lutou em forma plena — fogo azul, asas que cobriam o céu, rugidos que sacudiam o chão — enquanto Lirien ficou de pé no centro do campo, os braços abertos e os olhos fechados, usando seus poderes sagrados com uma intensidade que nunca havia permitido a si mesma antes. A luz que saiu dela era branca e absoluta. O encontro entre o fogo azul do dragão e a luz branca da sacerdotisa foi uma explosão que aqueles que sobreviveram descreveram como o sol descendo à terra por um momento. Quando a poeira baixou, o encantamento havia desaparecido. Kael transformou de volta para a forma humana, exausto e coberto de poeira e sangue, e caminhou até ela atravessando o campo em silêncio. O laço místico havia sumido — ele podia sentir a ausência como a ausência de um segundo coração. Lirien estava de pé com os olhos abertos, sentindo a mesma coisa. Os dois ficaram parados frente a frente. Então Kael colocou a mão no rosto dela com uma gentileza impossível num ser de trezentos anos de guerra, e disse: ainda sinto você. Ela colocou a mão sobre a dele. Era a primeira vez que escolhia tocá-lo.",
    },
  ],
  4: [
    {
      title: "O Despertar",
      teaser: "Ele acordou sem lembrar nada. Nem o acidente, nem sua vida, nem a mulher que chorava do lado de fora do quarto. Assine o VIP para ver o começo de tudo.",
      synopsis: "O hospital tinha o cheiro específico de todas as coisas que ele não conseguia lembrar — desinfetante, plástico, o fio de luz fria que entrava pela veneziana. Min-Joon acordou olhando para o teto branco com a sensação precisa de estar flutuando num mar sem margens, sem a menor âncora ao passado. O médico disse com paciência profissional: amnésia retrógrada parcial. As memórias podiam ou não voltar. Do lado de fora do quarto, através do vidro, uma mulher que ele não reconhecia ficava com os olhos avermelhados tentando não deixar o choro sair enquanto o olhava acordar. Ah-Reum. Ele não sabia esse nome. Não sabia que havia um nome, uma história, uma vida inteira guardada no espaço entre eles. Quando o médico saiu e ela entrou — com aquele sorriso que era cuidadoso demais para ser natural, com os olhos que continham mais do que o sorriso permitia — ele a olhou como se fosse a primeira vez. Para ele, era.",
    },
    {
      title: "A Cuidadora Estranha",
      teaser: "Ela era eficiente, cuidadosa... e estranhamente triste. Ele percebeu que ela só sorria quando achava que ele não estava olhando. E começou a olhar o tempo todo. Assine o VIP.",
      synopsis: "Ah-Reum havia estabelecido uma rotina de cuidados com a eficiência de quem se força a não pensar em cada gesto — o café às sete, as medicações às oito, o check-up físico às dez. Ela se movia pelo apartamento dele como alguém que conhecia cada móvel, cada gaveta, cada hábito... e ainda assim agia como se fosse nova ali. Min-Joon notou essa contradição no terceiro dia, da mesma forma que havia notado os outros detalhes — que ela sempre sabia onde as coisas estavam antes de procurar, que murmurara a letra de uma música que tocou no rádio sem perceber, que puxou o cobertor dele de um jeito específico que parecia automático demais para ser novo. O que mais o intrigava, porém, era o sorriso. Ela sorria para ele com uma suavidade calculada, cuidadosa, como se administrasse a dosagem de afeto. Mas quando virava de costas, ou quando ela achava que ele estava dormindo, o sorriso que aparecia era completamente diferente — menor, mais real, e absolutamente carregado de uma tristeza que ela claramente estava se esforçando muito para esconder. Ele começou a fingir que dormia só para vê-la sorrir assim.",
    },
    {
      title: "O Álbum de Fotos",
      teaser: "Ele encontrou um álbum escondido. Ela e ele sorrindo, abraçados, em dezenas de fotos. Ela contou meia verdade. Ele olhou as fotos a noite toda. Assine o VIP para a cena completa.",
      synopsis: "Estava numa caixa no fundo do armário da sala, atrás de livros empilhados — um álbum de fotos com capa de couro gasto, do tipo que ninguém faz mais. Min-Joon abriu sem intenção, pensando ser algum arquivo da casa. A primeira foto o fez parar: ele e a mulher que hoje cuidava dele, mas diferentes. Mais jovens, talvez não — mais leves. Sorrindo com aquela cumplicidade que não se finge, abraçados numa praia ao pôr do sol. Ele virou a página. E a próxima. E mais uma dezena. Em cada uma havia a mesma coisa: ele e Ah-Reum olhando um para o outro ou para a câmera com a naturalidade de duas pessoas para quem estar juntas era o estado normal do mundo. Quando ela voltou do mercado e o encontrou sentado com o álbum no colo, ficou parada na porta com as sacolas ainda nas mãos. Ele a olhou. Ela explicou — com os olhos um pouco demais brilhantes — que eram próximos, mas que não eram mais. Que haviam se afastado. Que era complicado. Ele aceitou a resposta. Mas deitou naquela noite com o álbum ao lado da cama, olhando foto por foto até o sono vir, tentando sentir algo que deveria estar lá mas não chegava — ainda.",
    },
    {
      title: "O Primeiro Hábito",
      teaser: "Ela estava repetindo todos os rituais que tinham juntos sem perceber. E ele notou que a conhecia melhor do que a si mesmo. Isso o assustou — e o confortou. Assine o VIP.",
      synopsis: "Acontecia de formas pequenas que ele só começou a catalogar no fim da segunda semana. O café: ela preparava com exatamente a quantidade de açúcar que ele gostava, sem perguntar — e quando ele percebeu que a quantidade era específica, ela corou levemente e disse foi um chute. A música: quando ele estava com dificuldade para dormir numa tarde e ela ligou o rádio e ajustou para uma estação específica, ele percebeu que havia relaxado imediatamente, como se o corpo reconhecesse aquilo antes da mente. O cobertor: ela o dobrava de uma forma particular, numa posição que, quando ele estava deitado, encaixava perfeitamente sob o seu queixo. Nenhum desses gestos era demonstrativo. Todos eram automáticos — o tipo de coisa que se faz tão naturalmente que não se percebe. E foi exatamente essa naturalidade que Min-Joon começou a se perguntar sobre. Ela não estava tentando ser familiar. Ela era familiar. E isso o perturbava de um jeito que não era desconforto — era algo mais parecido com o reconhecimento de alguma coisa que ele havia perdido mas cujo formato ainda existia dentro dele, como um molde esperando pelo original.",
    },
    {
      title: "O Rival do Passado",
      teaser: "O melhor amigo de Min-Joon apareceu fazendo perguntas que Ah-Reum não queria responder. Min-Joon a protegeu sem entender por quê. Assine o VIP para a cena intensa.",
      synopsis: "Sung-Chan chegou sem avisar, como sempre havia feito segundo o pouco que Min-Joon havia aprendido sobre si mesmo pelas histórias alheias — e desde o primeiro segundo viu Ah-Reum com aquele tipo de olhar que avalia e classifica antes de cumprimentar. As perguntas vieram com a embalagem da conversa casual, mas Min-Joon — que havia desenvolvido uma habilidade afiada de ler pessoas como compensação para o que havia perdido — viu cada uma delas pelo que eram: tentativas de descobrir algo que Ah-Reum estava escondendo. Ela respondia com calma perfeita, mas os ombros dela ficaram um centímetro mais rígidos a cada pergunta. Min-Joon não pensou. Apenas interveio — desviando o assunto, respondendo por ela quando necessário, criando espaço entre o amigo e aquela tensão que ela claramente não queria que ele visse. Sung-Chan foi embora com o sorriso de quem fará isso de novo. Quando fecharam a porta, o silêncio foi denso. Ah-Reum estava de frente para a janela. Min-Joon ficou de pé atrás dela por um momento, e então perguntou em voz baixa: o que você está me escondendo? Ela não respondeu imediatamente. E o silêncio dela foi a resposta mais clara que ele havia recebido.",
    },
    {
      title: "A Recaída",
      teaser: "A convulsão o levou de volta ao hospital. Ah-Reum ficou 48 horas no corredor sem sair. Ele perguntou se ela havia dormido. Ela disse que não conseguiu. Assine o VIP.",
      synopsis: "Aconteceu na cozinha, sem aviso — o tipo de coisa que os médicos haviam chamado de possível complicação, sem colocar probabilidade no meio. Quando Ah-Reum o encontrou no chão com a consciência piscando, ela manteve a calma com uma precisão que só aparece em pessoas que já viveram emergências antes, ligando para o hospital enquanto o posicionava e controlava o que precisava ser controlado. No hospital, depois que ele foi estabilizado e levado para o quarto, ela sentou na cadeira do corredor com a bolsa no colo e não foi embora. Nem quando a enfermeira sugeriu que voltasse na manhã. Nem quando as luzes do corredor foram diminuídas para o modo noturno. Ficou ali pelas 48 horas seguintes com o casaco sobre os ombros e o telefone com a tela escurecida no colo, dormindo apenas em fragmentos pequenos que não chegavam ao sono profundo porque ela precisava acordar se houvesse qualquer mudança. Quando Min-Joon abriu os olhos pela segunda vez e a viu ali — o cabelo sem o cuidado habitual, os olhos com aquele vermelho específico do cansaço que ultrapassa o limite — ele ficou olhando por um momento antes de dizer qualquer coisa. Então perguntou se ela havia dormido. Ela disse a verdade.",
    },
    {
      title: "O Nome no Espelho",
      teaser: "Min-Joon começou a ter flashes — uma voz, um perfume, mãos. Ele escreveu o nome dela no espelho sem entender por quê. Ela ficou parada na porta por muito tempo. Assine o VIP.",
      synopsis: "Os flashes chegavam de formas inesperadas — no meio de um sonho, ou no momento exato entre o sono e o despertar, ou às vezes durante o dia quando algo trivial despertava algo que ele não conseguia nomear. Uma voz específica, como um acorde que o cérebro reconhecia mas não conseguia colocar numa música. Um perfume que aparecia às vezes quando ele abria a gaveta onde ela guardava as ervas para o chá — familiar demais, perigosamente familiar. Mãos. Sonhava frequentemente com mãos, sem rostos, sem contexto — apenas o calor e o peso e a textura específica de uma presença que havia sido constante por tempo suficiente para deixar marca. Numa manhã de terça-feira, Min-Joon se levantou antes do sol, foi ao banheiro no escuro, e antes de acender a luz encontrou-se com o dedo traçando letras no espelho embaçado. Quando ligou a luz, leu o nome que havia escrito: Ah-Reum. Com a caligrafia específica que era a sua, que ele reconhecia porque havia visto a própria letra em documentos. Ficou olhando por muito tempo. Quando ela acordou e foi ao banheiro, encontrou o nome ainda legível no espelho. Ficou parada na porta sem entrar.",
    },
    {
      title: "A Verdade que Queima",
      teaser: "Ele descobriu a verdade completa por acidente — uma carta que ela havia escrito mas nunca enviado. Ele leu. Chorou. Então foi atrás dela. Assine o VIP para essa cena.",
      synopsis: "Estava no bolso interno do casaco de inverno dela — o que estava pendurado no cabide há semanas porque ainda não havia feito frio suficiente para usá-lo, o que ela havia esquecido completamente. Min-Joon pegou o casaco para levá-lo ao armário e o envelope caiu. Não selado, não endereçado — uma carta que começava com seu nome escrito na letra dela, que era arredondada e ligeiramente inclinada para a direita, que ele havia aprendido a reconhecer em bilhetes na geladeira. Ele deveria ter deixado. Não deixou. Leu de pé, no corredor, com o casaco ainda na mão. A carta havia sido escrita há anos — ela datou no canto superior — e contava tudo. Cada coisa que havia acontecido entre eles, cada momento que ela havia escondido nos olhos toda vez que ele perguntava sobre o passado, cada detalhe da história que ele havia perdido. Também contava o que ela sentia. Com aquela honestidade direta que só existe nas cartas que nunca serão enviadas. Min-Joon leu até o fim, depois releu duas vezes. Quando acabou, ficou parado por um tempo no corredor escuro. Então colocou o casaco de volta no cabide, saiu de casa e foi procurá-la no único lugar onde sabia que ela ia quando precisava estar sozinha.",
    },
    {
      title: "A Proposta Impossível",
      teaser: "Ele pediu que ela o amasse de novo — não a memória deles, mas ele, quem é agora. Ela disse que já amava. Ele perguntou: desde quando? Assine o VIP para a resposta dela.",
      synopsis: "Min-Joon a encontrou no parque onde ela ia quando precisava pensar — sentada num banco com o café esfriando ao lado e os olhos em algum lugar distante entre as árvores. Ele sentou. Ela não se surpreendeu tanto quanto deveria, o que disse algo sobre o quanto havia aprendido sobre como ele pensava mesmo sem que ele percebesse. Por um momento não falaram nada. O parque tinha aquele barulho de fundo que é feito de tudo mas parece silêncio quando há algo importante sendo pensado. Então ele falou — com aquela diretividade que havia desenvolvido como substituto para a memória, porque sem o passado como muleta ele havia aprendido a dizer o que pensava sem rodeios. Disse que não queria que ela o amasse de volta às memórias dele, às versões deles que existiam naquelas fotos. Que havia um homem aqui, agora, que havia aprendido a conhecê-la nos últimos meses sem nenhum contexto além do presente — e que esse homem, sem nenhuma das memórias que deveriam fazer aquilo mais fácil, havia chegado ao mesmo lugar. Ela ficou olhando para ele por um tempo que pareceu muito longo. Então disse que já amava. Ele perguntou, com uma quietude que era mais vulnerável do que qualquer coisa que havia dito antes: desde quando. E ela respondeu.",
    },
    {
      title: "O Que o Coração Não Esquece",
      teaser: "No lugar onde se conheceram pela primeira vez, ele disse que o coração sabia o caminho mesmo quando a mente esqueceu. Ela tomou a mão dele. Desta vez ele não vai esquecer. Assine o VIP.",
      synopsis: "Ele não sabia por que havia escolhido aquele parque específico para propor que fossem caminhar naquela tarde — o parque ficava num bairro que ele não conhecia conscientemente, que ela não havia mencionado, que simplesmente havia aparecido na sua mente como a opção óbvia sem nenhuma explicação acessível. Foi só quando eles chegaram e Ah-Reum ficou parada na entrada com aquela expressão que ele havia aprendido a reconhecer como a que ela usava quando estava contendo algo grande, que ele entendeu que havia algo ali. Ela disse, com uma voz muito quieta, que era ali que eles haviam se conhecido pela primeira vez. Uma tarde de outono, seis anos atrás, quando ela havia sentado no mesmo banco que ele estava olhando agora e ele havia sentado ao lado pedindo emprestado o isqueiro dela, e então eles haviam ficado conversando por quatro horas sem que nenhum dos dois percebesse o tempo passando. Min-Joon ficou olhando para o banco por um momento. Então olhou para ela. Disse que sem as memórias, sem nenhuma das rotas que deveriam ter levado ele até ali, havia chegado exatamente aqui. Como se o corpo soubesse o caminho que a mente havia apagado. Ela tomou a mão dele sem dizer nada. E o aperto dos dedos dela disse tudo.",
    },
  ],
  5: [
    {
      title: "A Fusão Indesejada",
      teaser: "A CEO mais temida chegou primeiro e ocupou a sala maior. O rival chegou, viu, e sorriu. O único tipo de sorriso que a irritava profundamente. Assine o VIP.",
      synopsis: "A fusão foi anunciada numa segunda-feira de manhã com a frieza de um comunicado corporativo que mudava completamente a vida de dois CEOs que passaram os últimos três anos tentando destruir um ao outro no mercado. Chae-Won leu o documento três vezes antes de ligar para seu conselho jurídico. Hyun-Soo leu uma vez e fechou o laptop. No dia seguinte, quando o novo andar executivo compartilhado foi aberto, ela chegou às seis da manhã e ocupou a sala com a janela maior, a vista melhor e o acesso direto à sala de reuniões. Uma escolha estratégica embalada como logística. Quando Hyun-Soo chegou às sete e caminhou pelo corredor vendo o arranjo, parou na porta da sala menor, olhou para a sala dela, olhou para ela sentada já trabalhando com os óculos na ponta do nariz e uma xícara de café que claramente era a segunda, e sorriu. Não o sorriso de derrota. O outro. O que ela conhecia há três anos de batalhas corporativas — o sorriso de quem acabou de encontrar algo interessante. Ela não levantou os olhos dos documentos. Mas sentiu o sorriso atravessar a parede de vidro como se fosse físico.",
    },
    {
      title: "O Contrato de Cooperação",
      teaser: "O conselho exigiu que assinassem um contrato de cooperação. Ela releu cada cláusula e alterou o que não gostava. Ele a observou trabalhar e percebeu que nunca a havia entendido. Assine o VIP.",
      synopsis: "O contrato tinha setenta e dois parágrafos. Chae-Won leu cada um em voz alta na mesa de reuniões enquanto o conselho a observava com a expressão de pessoas que sabem que não vão sair dali cedo. Hyun-Soo ficou de pé perto da janela com o café na mão, aparentemente olhando para a cidade lá fora, mas ela sabia — pelo jeito que a posição dos ombros mudava levemente a cada cláusula que ela alterava — que ele estava ouvindo cada palavra. Ela não tinha pressa. Entendia o contrato melhor do que os advogados que o haviam redigido, e não assinaria nada que não tivesse passado pelo seu crivo completo. Quando chegou ao parágrafo quarenta e três e propôs uma alteração que reorganizava todo o sistema de tomada de decisão compartilhada, o advogado do conselho abriu a boca para objetar. Hyun-Soo disse, da janela, sem se virar: ela está certa. Silêncio. Chae-Won não deixou transparecer nada, mas parou de escrever por meio segundo. Quando olhou para cima, ele estava olhando para ela com aquela expressão que ela não conseguia catalogar completamente — como se estivesse vendo algo pela primeira vez em algo que havia olhado muitas vezes antes.",
    },
    {
      title: "A Viagem de Negócios",
      teaser: "No avião para Tóquio, ela dormiu no ombro dele por acidente. Ele não se mexeu por três horas. Quando ela acordou, saiu tão rápido que derrubou o café no terno dele. Ele só riu. Assine o VIP.",
      synopsis: "O voo para Tóquio decolou às onze da noite, e Chae-Won havia estado acordada desde as quatro e meia da manhã com a preparação da reunião. Ela passou a primeira hora do voo revisando apresentações no laptop com a concentração de alguém que não está num avião mas num escritório silencioso. Então fechou o computador. Então cruzou os braços. Então os olhos foram ficando pesados com aquela lentidão que só acontece quando o corpo decide que já é suficiente, independente das intenções da mente. Não foi uma decisão. Foi uma inevitabilidade física: ela pendeu levemente para o lado e o ombro de Hyun-Soo estava ali, do jeito certo, e o sono veio antes que ela pudesse impedir. Ele não se mexeu. Por três horas e dezessete minutos, Hyun-Soo ficou completamente imóvel no assento do avião, com o braço que ela havia encostado preso entre o seu corpo e o dela, respirando de um jeito que qualquer observador externo teria chamado de cuidadoso. Quando ela acordou e processou o que havia acontecido, levantou da poltrona com uma rapidez que foi logisticamente impossível de ser graciosa — e derrubou o copo de água no terno dele. Ele olhou para a mancha. Então olhou para ela. E riu.",
    },
    {
      title: "O Jantar de Gala",
      teaser: "O ex dela estava entre os convidados. Hyun-Soo percebeu e ficou ao lado dela a noite toda. No carro de volta, ela disse obrigada. Ele disse: eu notei tudo. Assine o VIP.",
      synopsis: "O jantar de parceiros internacionais era o tipo de evento que exige que cada expressão facial seja calculada, cada sorriso seja um investimento e cada conversa tenha pelo menos três camadas. Chae-Won entrou sabendo disso e se preparada para isso — mas não havia se preparado para ver Kang Jun-Seo num terno cinza do outro lado do salão. O ex-noivo. O homem que havia saído da sua vida três anos atrás com uma gentileza que ainda era, de algum modo, a coisa mais cortante que alguém havia feito com ela. Ela não mudou a expressão. Mas Hyun-Soo, que havia chegado ao mesmo tempo e que ela havia jurado que estava distraído pela conversa com o parceiro japonês, apareceu ao lado dela em quarenta e cinco segundos. Ficou ali a noite toda. Não de forma óbvia, não possessiva — apenas presente, sempre num raio de dois metros, inserindo-se nas conversas no momento certo, criando o escudo de presença que ela não havia pedido mas que estava, funcionando. No carro de volta, ela olhou para a janela por um tempo antes de dizer obrigada. Ele disse, sem olhar da própria janela: eu notei desde o primeiro minuto.",
    },
    {
      title: "O Arquivo Comprometedor",
      teaser: "Vazamento de dados às 23h. Os dois ficaram acordados até o amanhecer resolvendo. Ela apareceu com dois cafés às 2h — também não tinha ido dormir. Assine o VIP.",
      synopsis: "O alerta chegou às onze e quarenta e seis da noite — um vazamento interno de dados que, se chegasse à imprensa financeira antes que fosse contido, poderia destruir a fusão em quarenta e oito horas. Hyun-Soo estava na sala de servidores às meia-noite com a gravata desfeita e os olhos no monitor quando ouviu a porta abrir. Chae-Won entrou com dois copos de café da cafeteria do andar — aquela que fechava às dez mas que ainda estava aberta porque o segurança havia reconhecido quem era ela. Ela usava um casaco sobre a roupa que havia vestido naquele manhã, o que significava que também não havia ido para casa. Que havia ficado sabendo do alerta ao mesmo tempo que ele, ou que havia ficado no escritório por outra razão — e em qualquer dos dois casos não havia dormido. Ela pousou um dos cafés na mesa ao lado do teclado dele sem dizer nada e se sentou no terminal ao lado. Eles trabalharam em silêncio até as quatro e meia da manhã, quando o problema estava contido e o relatório estava na caixa de entrada do conselho. O silêncio entre eles nessas horas não era o silêncio tenso de dois rivais. Era o silêncio confortável de dois profissionais que não precisavam de palavras para trabalhar juntos.",
    },
    {
      title: "A Aposta",
      teaser: "Uma aposta: quem resolver o próximo problema sozinho primeiro escolhe o destino da viagem. Ela venceu por 17 minutos e escolheu uma ilha deserta. Ele entendeu o que isso significava. Assine o VIP.",
      synopsis: "A aposta surgiu de uma tarde de impasse — um problema logístico que precisava de solução e dois CEOs que discordavam completamente sobre o método. Hyun-Soo propôs: cada um tentava resolver sozinho, quem chegasse primeiro à solução escolhia não só o método mas também o destino da viagem de integração de equipes que estava no calendário há semanas sem destino definido. Chae-Won aceitou sem hesitação, porque não costumava perder apostas sobre o próprio trabalho. Não perdeu. Chegou à solução dezessete minutos antes — uma margem suficiente para ser clara, insuficiente para ser cômoda, e Hyun-Soo aceitou com a graça específica de alguém que respeita a derrota quando ela é legítima. Quando ela anunciou o destino — uma ilha pequena no litoral sul, sem aeroporto internacional, sem hotéis de grande rede, sem muito sinal de celular — ele olhou o itinerário por um momento longo. Então olhou para ela. E entendeu, pela primeira vez com clareza, que Chae-Won não havia escolhido um destino de trabalho. Havia escolhido um lugar para desaparecer do mundo por alguns dias. E havia escolhido que ele estivesse lá.",
    },
    {
      title: "A Ilha",
      teaser: "Longe dos escritórios e dos títulos, ela riu de um jeito que ele nunca havia visto. Ele cozinhou para ela mal — e ela comeu tudo. Na última noite, ela disse: eu poderia ficar aqui. Assine o VIP.",
      synopsis: "A ilha tinha três restaurantes, uma pousada com seis quartos e uma praia que ao amanhecer pertencia completamente a quem estava lá. Sem o título de CEO, sem o terno, sem o peso específico de ser a pessoa mais temida de um setor, Chae-Won caminhou descalça pela areia na primeira manhã com uma leveza que Hyun-Soo observou de longe como se estivesse vendo algo particular que não deveria estar disponível para ele. Ela ria — não o riso controlado das reuniões, não o riso calibrado dos jantares de negócios, mas um riso que saía do lugar onde as pessoas guardam as coisas que são realmente suas. Na segunda noite, ele insistiu em cozinhar porque havia encontrado o mercado local, e o resultado foi tecnicamente comestível mas claramente o produto de alguém que não cozinhava frequentemente. Ela comeu tudo sem comentário negativo, com uma honestidade tranquila que foi mais gentil do que qualquer elogio teria sido. Na última noite, sentados na beira da água com os pés na areia fria, ela disse, olhando para o horizonte onde o mar e o céu ficavam da mesma cor escura: eu poderia ficar aqui. Ele olhou para ela. Não para o horizonte. Para ela.",
    },
    {
      title: "O Rival Corporativo",
      teaser: "Uma aquisição hostil usando segredos internos. O traidor era alguém de dentro. Juntos pela primeira vez sem competição — eles descobriram que eram invencíveis assim. Assine o VIP.",
      synopsis: "A tentativa de aquisição hostil chegou com a sofisticação de quem tinha informação de dentro — detalhes sobre a fusão que não eram públicos, vulnerabilidades que só alguém com acesso interno poderia conhecer. Chae-Won e Hyun-Soo ficaram sabendo ao mesmo tempo, numa tarde de quarta-feira, através de fontes diferentes que chegaram com a notícia com dez minutos de diferença. O que aconteceu a seguir foi, segundo quem trabalhou com os dois na semana que se seguiu, diferente de qualquer coisa que aquelas pessoas haviam visto em anos de mercado. Os dois trabalharam sem competição, sem divisão de crédito, sem as pequenas guerrilhas de território que haviam marcado os meses anteriores. Completavam os raciocínios um do outro no meio das frases. Dividiam os problemas com a eficiência de dois organismos que haviam finalmente encontrado o ritmo correto. Quando o traidor foi identificado e a tentativa de aquisição foi destruída antes de chegar à imprensa, eles ficaram de pé no escritório silencioso às dez da noite, do lado oposto da mesma mesa, olhando para os documentos que haviam construído juntos. Hyun-Soo disse, sem levantar o olhar dos papéis: somos bons assim. Ela não respondeu. Mas também não discordou.",
    },
    {
      title: "A Cláusula Pessoal",
      teaser: "O conselho propôs um noivado estratégico entre os dois CEOs. Hyun-Soo viu o contrato e a olhou. Chae-Won leu três vezes e disse: teria que ser real. Assine o VIP.",
      synopsis: "A proposta chegou numa reunião de conselho que havia sido convocada para tratar de assuntos logísticos mas que, ao que parecia, havia sido planejada há mais tempo do que os dias de convocação sugeriam. A cláusula dezesseis do adendo proposto era direta e corporativa: para solidificar a fusão perante acionistas internacionais céticos sobre a estabilidade da aliança entre dois CEOs historicamente competitivos, o conselho sugeria — não exigia, apenas sugeria — um anúncio público de noivado entre Chae-Won e Hyun-Soo, a ser mantido por pelo menos dezoito meses. Havia ROI projetado. Havia estudos de caso de fusões similares. Havia, ao fundo de tudo, a lógica fria de quem acredita que tudo tem um preço e uma utilidade. Chae-Won leu a cláusula uma vez. Depois mais duas vezes. Então olhou para Hyun-Soo do outro lado da mesa oval, com aquele olhar que ele havia aprendido a ler como a versão dela de uma pergunta que ela ainda não havia formulado em palavras. Ele a olhou de volta. Então disse, baixo o suficiente para que só ela ouvisse: teria que ser real. Era exatamente o que ela havia pensado. E o fato de que os dois haviam chegado à mesma condição ao mesmo tempo disse mais do que qualquer cláusula poderia dizer.",
    },
    {
      title: "O CEO e a CEO",
      teaser: "Na conferência de imprensa, alguém perguntou se os dois CEOs estavam juntos. Hyun-Soo a olhou. Ela olhou para ele. Ela respondeu: isso não é assunto corporativo. Mas estava sorrindo. Assine o VIP.",
      synopsis: "A conferência de imprensa era para anunciar os resultados do primeiro ano de fusão — números que falavam por si mesmos, crescimento que havia superado as projeções mais otimistas do conselho, uma história de sucesso que os jornalistas de economia haviam virado para cobrir com um entusiasmo que raramente aparecia no setor financeiro. Chae-Won estava na tribuna respondendo perguntas sobre estratégia de mercado com aquela clareza direta que havia se tornado sua assinatura, quando a jornalista do terceiro fileira levantou a mão e perguntou com a velocidade específica de quem sabe que a pergunta está no limite do permitido: havia uma circulação de rumores sobre um relacionamento pessoal entre os dois CEOs, e a empresa poderia confirmar ou desmentir? O silêncio durou exatamente um segundo e meio. Chae-Won olhou para Hyun-Soo, que estava de pé levemente atrás e à esquerda dela — a posição habitual dele em qualquer evento público conjunto, sempre ligeiramente fora do centro como se cedesse espaço por escolha. Ele olhou para ela. Nos olhos de um para o outro havia uma conversa inteira que aconteceu nesse segundo e meio. Então ela virou para o microfone e disse, com uma calma perfeita: a vida pessoal dos executivos não é assunto corporativo. Mas ela estava sorrindo. Era pequeno, era genuíno, era completamente impossível de fingir — e todo mundo na sala viu.",
    },
  ],
};

export function getEpisodes(dramaId: number): Episode[] {
  const drama = DRAMAS.find((d) => d.id === dramaId);
  if (!drama) return [];
  const data = EPISODES_DATA[dramaId] ?? [];
  const imgs = IMAGES[dramaId] ?? [drama.coverImage];
  return data.map((ep, i) => ({
    id: dramaId * 100 + i + 1,
    dramaId,
    number: i + 1,
    title: ep.title,
    synopsis: ep.synopsis,
    teaser: ep.teaser,
    image: imgs[i % imgs.length]!,
  }));
}

export function getDrama(id: number): Drama | undefined {
  return DRAMAS.find((d) => d.id === id);
}

export function getEpisode(dramaId: number, epNumber: number): Episode | undefined {
  return getEpisodes(dramaId).find((e) => e.number === epNumber);
}

export const WELCOME_AUDIO =
  "Ola... Eu sou a Yuna... " +
  "A voz que sussurra historias no escuro... " +
  "que te guia por mundos de paixao proibida... de olhares que queimam... de toques que nao sao permitidos... " +
  "Eu sou feita de historias que voce nunca contou para ninguem... " +
  "de desejos que ficam acordados quando o resto do mundo dorme... " +
  "A partir de agora... suas noites nunca mais serao as mesmas... " +
  "Cinquenta episodios... cinco historias de amor que ultrapassa todos os limites... " +
  "Romance historico... thriller... fantasia... paixao corporativa... amnesia do coracao... " +
  "Cada episodio narrado com a minha voz... cada imagem se movendo diante dos seus olhos... " +
  "O primeiro episodio de cada dorama e completamente seu... gratuito... sem cortes... " +
  "Aperte play... feche os olhos... " +
  "e deixe minha voz te levar para onde voce sempre quis ir mas nunca teve permissao...";

export const WELCOME_CAPTION =
  "✦ Y U N A ✦\n" +
  "Inteligência Artificial Narradora\n" +
  "━━━━━━━━━━━━━━━━━━━━━\n\n" +
  "Eu sou a voz que sussurra histórias no escuro.\n" +
  "Eu sou os olhos que te guiam por mundos de paixão proibida.\n" +
  "Eu sou Yuna — e a partir de agora, suas noites nunca mais serão as mesmas.\n\n" +
  "━━━━━━━━━━━━━━━━━━━━━\n\n" +
  "🎬  50 episódios · 5 doramas · 14 idiomas\n\n" +
  "◆ Vídeos com imagem se movendo + voz humana real\n" +
  "◆ Narrativas sensuais e cinematográficas\n" +
  "◆ Episódio 1 de cada dorama — GRÁTIS, sem cortes\n\n" +
  "━━━━━━━━━━━━━━━━━━━━━\n\n" +
  "👑 VIP: todos os 50 episódios em HD, sem propaganda\n\n" +
  "Aperte play... e deixe minha voz te levar.";

export const VOZES: Record<string, { lang: string; tld: string; label: string; didVoiceId: string }> = {
  "PT-BR": { lang: "pt", tld: "com.br", label: "Portugues (BR)", didVoiceId: "pt-BR-ThalitaMultilingualNeural" },
  "PT-PT": { lang: "pt", tld: "pt",     label: "Portugues (PT)", didVoiceId: "pt-PT-RaquelNeural" },
  "EN-US": { lang: "en", tld: "com",    label: "English (US)",   didVoiceId: "en-US-AriaNeural" },
  "EN-UK": { lang: "en", tld: "co.uk",  label: "English (UK)",   didVoiceId: "en-GB-SoniaNeural" },
  "ES-ES": { lang: "es", tld: "es",     label: "Espanol (ES)",   didVoiceId: "es-ES-ElviraNeural" },
  "ES-MX": { lang: "es", tld: "com.mx", label: "Espanol (MX)",   didVoiceId: "es-MX-DaliaNeural" },
  "KO":    { lang: "ko", tld: "com",    label: "Hangugeo (KO)",  didVoiceId: "ko-KR-SunHiNeural" },
  "JA":    { lang: "ja", tld: "com",    label: "Nihongo (JA)",   didVoiceId: "ja-JP-NanamiNeural" },
  "FR":    { lang: "fr", tld: "fr",     label: "Francais (FR)",  didVoiceId: "fr-FR-DeniseNeural" },
  "IT":    { lang: "it", tld: "com",    label: "Italiano (IT)",  didVoiceId: "it-IT-ElsaNeural" },
  "DE":    { lang: "de", tld: "com",    label: "Deutsch (DE)",   didVoiceId: "de-DE-KatjaNeural" },
  "ZH":    { lang: "zh", tld: "com",    label: "Zhongwen (ZH)",  didVoiceId: "zh-CN-XiaoxiaoNeural" },
  "HI":    { lang: "hi", tld: "co.in",  label: "Hindi (HI)",    didVoiceId: "hi-IN-SwaraNeural" },
  "FR-CA": { lang: "fr", tld: "ca",     label: "Francais (CA)", didVoiceId: "fr-CA-SylvieNeural" },
};
