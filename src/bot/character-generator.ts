import { logger } from "../lib/logger.js";

const ANIME_STYLES = [
  "anime girl with long dark hair, gentle eyes, cherry blossom background, portrait",
  "anime girl with short silver hair, confident expression, city night background, portrait",
  "anime boy with dark messy hair, mysterious look, moonlit garden background, portrait",
  "anime girl with auburn hair, warm smile, autumn leaves background, portrait",
  "anime girl with blonde hair in business suit, powerful stance, skyscraper background, portrait",
  "anime boy with blue eyes, warrior outfit, fantasy castle background, portrait",
  "anime girl with pink hair, dreamy expression, starry sky background, portrait",
  "anime boy with brown hair, gentle smile, sakura tree background, portrait",
  "anime girl with purple hair, elegant kimono, traditional garden background, portrait",
  "anime boy with white hair, intense gaze, storm clouds background, portrait",
];

const CHARACTER_NAMES = [
  "Mei Hua",
  "Soo-Ah",
  "General Han",
  "Yuki Tanaka",
  "Chae-Won",
  "Ryu Kaze",
  "Sakura Hime",
  "Jin Woo",
  "Hana Violet",
  "Storm Lee",
];

export interface AnimeCharacter {
  name: string;
  style: string;
  imageUrl: string;
  description: string;
}

/**
 * Generate a random anime character with a description.
 * Uses a preset portrait image (compatible with D-ID face detection).
 */
export function generateRandomCharacter(): AnimeCharacter {
  const idx = Math.floor(Math.random() * CHARACTER_NAMES.length);
  const name = CHARACTER_NAMES[idx]!;
  const style = ANIME_STYLES[idx]!;

  const PORTRAIT_URLS = [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=90",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=900&q=90",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=90",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=90",
    "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=900&q=90",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=90",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=90",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=90",
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=900&q=90",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=900&q=90",
  ];

  const imageUrl = PORTRAIT_URLS[idx % PORTRAIT_URLS.length]!;

  const DESCRIPTIONS: Record<string, string> = {
    "Mei Hua": "Uma pintora talentosa da corte imperial, com olhos que guardam segredos do passado.",
    "Soo-Ah": "Detetive brilhante e implacavel. Seu olhar frio esconde um coracao apaixonado.",
    "General Han": "O general mais temido do imperio. Por tras da armadura, um homem que nunca conheceu o amor.",
    "Yuki Tanaka": "Sacerdotisa mistica com poderes ancestrais. Seu destino esta ligado ao principe dragao.",
    "Chae-Won": "CEO poderosa que domina o mundo dos negocios. Elegante, estrategica e imbativel.",
    "Ryu Kaze": "Guerreiro solitario que busca redencao. Cada cicatriz conta uma historia de batalha.",
    "Sakura Hime": "Princesa do reino das cerejeiras. Sua beleza e tao fragil quanto uma petala ao vento.",
    "Jin Woo": "O medico que perdeu a memoria. Cada dia e uma nova chance de se apaixonar.",
    "Hana Violet": "Cantora misteriosa que encanta todos com sua voz. Ninguem sabe seu verdadeiro nome.",
    "Storm Lee": "Hacker genial e rebelde. Vive nas sombras da cidade digital.",
  };

  logger.info({ name, style }, "Generated anime character");

  return {
    name,
    style,
    imageUrl,
    description: DESCRIPTIONS[name] ?? "Personagem misterioso de um mundo de fantasia.",
  };
}

/**
 * Get all predefined anime characters
 */
export function getAllCharacters(): AnimeCharacter[] {
  return CHARACTER_NAMES.map((_, i) => {
    const saved = Math.floor(Math.random() * 1000);
    const name = CHARACTER_NAMES[i]!;
    const style = ANIME_STYLES[i]!;

    const PORTRAIT_URLS = [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=90",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=900&q=90",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=90",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=90",
      "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=900&q=90",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=90",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=90",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=90",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=900&q=90",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=900&q=90",
    ];

    const DESCRIPTIONS: Record<string, string> = {
      "Mei Hua": "Uma pintora talentosa da corte imperial, com olhos que guardam segredos do passado.",
      "Soo-Ah": "Detetive brilhante e implacavel. Seu olhar frio esconde um coracao apaixonado.",
      "General Han": "O general mais temido do imperio. Por tras da armadura, um homem que nunca conheceu o amor.",
      "Yuki Tanaka": "Sacerdotisa mistica com poderes ancestrais. Seu destino esta ligado ao principe dragao.",
      "Chae-Won": "CEO poderosa que domina o mundo dos negocios. Elegante, estrategica e imbativel.",
      "Ryu Kaze": "Guerreiro solitario que busca redencao. Cada cicatriz conta uma historia de batalha.",
      "Sakura Hime": "Princesa do reino das cerejeiras. Sua beleza e tao fragil quanto uma petala ao vento.",
      "Jin Woo": "O medico que perdeu a memoria. Cada dia e uma nova chance de se apaixonar.",
      "Hana Violet": "Cantora misteriosa que encanta todos com sua voz. Ninguem sabe seu verdadeiro nome.",
      "Storm Lee": "Hacker genial e rebelde. Vive nas sombras da cidade digital.",
    };

    return {
      name,
      style,
      imageUrl: PORTRAIT_URLS[i % PORTRAIT_URLS.length]!,
      description: DESCRIPTIONS[name] ?? "Personagem misterioso.",
    };
  });
}
