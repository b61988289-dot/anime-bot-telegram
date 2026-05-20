export interface Ad {
  id: number;
  image: string;
  title: string;
  text: string;
  buttonLabel: string;
  buttonUrl: string;
}

// Propagandas reais rotativas — afiliados e marcas populares no Brasil
export const ADS: Ad[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=85",
    title: "🛍️ Shopee — Ofertas do Dia",
    text:
      "Aproveite descontos de até 90% na Shopee! Produtos de beleza, moda, eletrônicos e muito mais com entrega grátis. Compre agora e receba em casa!",
    buttonLabel: "Ver Ofertas na Shopee",
    buttonUrl: "https://shope.ee/doramaai",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=85",
    title: "💄 Beleza na Web — Skincare Coreano",
    text:
      "Descubra os segredos de beleza das estrelas dos doramas! Skincare coreano original com até 40% OFF. CREME BB, sérum, tônico e muito mais. Frete grátis acima de R$99.",
    buttonLabel: "Ver Skincare Coreano",
    buttonUrl: "https://www.belezanaweb.com.br",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85",
    title: "📚 Hotmart — Curso de Coreano",
    text:
      "Aprenda coreano do ZERO em 3 meses e entenda seus doramas favoritos sem legenda! Método exclusivo usado por +50.000 alunos. Garantia de 7 dias.",
    buttonLabel: "Quero Aprender Coreano",
    buttonUrl: "https://go.hotmart.com/coreano",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=85",
    title: "🎵 Spotify Premium — 3 Meses Grátis",
    text:
      "Ouça as trilhas sonoras dos seus doramas favoritos sem anúncio! Spotify Premium com 3 meses grátis para novos usuários. Cancele quando quiser.",
    buttonLabel: "Ativar Spotify Premium",
    buttonUrl: "https://www.spotify.com/br/premium",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85",
    title: "👗 Shein — Moda Coreana com até 70% OFF",
    text:
      "Vista-se como as protagonistas dos doramas! Moda coreana, acessórios e calçados com preços incríveis. Frete grátis na primeira compra!",
    buttonLabel: "Ver Coleção Coreana",
    buttonUrl: "https://www.shein.com.br",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85",
    title: "💊 Herbalife — Shakes Gostosos e Saudáveis",
    text:
      "Emagreça com saúde como as atrizes dos doramas! Shakes nutritivos em 20+ sabores. Resultado em 30 dias ou seu dinheiro de volta!",
    buttonLabel: "Conhecer Herbalife",
    buttonUrl: "https://www.herbalife.com.br",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=800&q=85",
    title: "📱 Amazon Brasil — App com Cupom Exclusivo",
    text:
      "Economize nas suas compras com o cupom exclusivo DoramaAI! Eletrônicos, livros, cosméticos e muito mais com entrega Prime em 1 dia!",
    buttonLabel: "Usar Cupom na Amazon",
    buttonUrl: "https://www.amazon.com.br",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85",
    title: "🍱 iFood — R$20 de Desconto",
    text:
      "Maratone seus doramas com o melhor da culinária! R$20 de desconto no primeiro pedido usando o código DORAMAI20. Peça comida japonesa, coreana e muito mais!",
    buttonLabel: "Pedir com Desconto",
    buttonUrl: "https://www.ifood.com.br",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=85",
    title: "💻 Alura — Aprenda Tecnologia Online",
    text:
      "Quer trabalhar de casa como os programadores dos doramas tech? Alura tem +1500 cursos online. Primeiro mês por apenas R$1!",
    buttonLabel: "Começar por R$1",
    buttonUrl: "https://www.alura.com.br",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=85",
    title: "💳 Nubank — Cartão Sem Anuidade",
    text:
      "Assine o VIP DoramaAI sem preocupação! Nubank tem cartão sem anuidade, conta digital gratuita e cashback em todas as compras. Solicite já!",
    buttonLabel: "Solicitar Nubank Grátis",
    buttonUrl: "https://nubank.com.br",
  },
];

let adIndex = 0;

export function getNextAd(): Ad {
  const ad = ADS[adIndex % ADS.length]!;
  adIndex++;
  return ad;
}

export function getRandomAd(): Ad {
  return ADS[Math.floor(Math.random() * ADS.length)]!;
}
