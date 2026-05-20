import TelegramBot from "node-telegram-bot-api";
import { logger } from "../lib/logger.js";
import { generateDIDVideo, type VideoQuality } from "./did.js";
import {
  DRAMAS,
  VOZES,
  WELCOME_AUDIO,
  WELCOME_CAPTION,
  YUNA_PHOTO,
  getEpisodes,
  getDrama,
} from "./catalog.js";
import {
  register,
  isVip,
  setVip,
  setLanguage,
  getLanguage,
  allSubscribers,
  stats,
} from "./subscribers.js";
import { getNextAd, getRandomAd } from "./ads.js";
import { generateRandomCharacter, getAllCharacters } from "./character-generator.js";

const TOKEN = process.env["TELEGRAM_BOT_TOKEN"] ?? "";
const ADMIN_ID = Number(process.env["TELEGRAM_ADMIN_ID"] ?? "0");
const VIP_PRICE_BRL = process.env["VIP_PRICE_BRL"] ?? "29.90";
const VIP_PRICE_TON = process.env["VIP_PRICE_TON"] ?? "2.5";
let PIX_KEY = process.env["PIX_KEY"] ?? "";
let TONCOIN_ADDRESS = process.env["TONCOIN_ADDRESS"] ?? "";

export function startBot() {
  if (!TOKEN) {
    logger.warn("TELEGRAM_BOT_TOKEN not set — bot disabled");
    return;
  }

  const bot = new TelegramBot(TOKEN, { polling: true });
  logger.info("🤖 DoramaAI Bot started (polling)");

  // ─── helpers ───────────────────────────────────────────────────────────────

  function getVoiceId(telegramId: string): string {
    const lang = getLanguage(telegramId);
    return VOZES[lang]?.didVoiceId ?? "pt-BR-ThalitaMultilingualNeural";
  }

  function getLangLabel(telegramId: string): string {
    const lang = getLanguage(telegramId);
    return VOZES[lang]?.label ?? "Portugues (BR)";
  }

  async function sendDIDVideo(
    chatId: number,
    text: string,
    imageUrl: string,
    voiceId: string,
    caption: string,
    quality: VideoQuality = "standard",
  ): Promise<boolean> {
    const qualityLabel = quality === "hd" ? "🎥 HD VIP" : "🎬";
    const msg = await bot.sendMessage(
      chatId,
      `${qualityLabel} *Yuna está preparando seu vídeo...* Aguarde! ✨\n_Isso pode levar até 90 segundos_`,
      { parse_mode: "Markdown" },
    );

    const videoBuffer = await generateDIDVideo(text, imageUrl, voiceId, quality);

    try { await bot.deleteMessage(chatId, msg.message_id); } catch {}

    if (videoBuffer) {
      await bot.sendVideo(
        chatId,
        videoBuffer,
        { caption, parse_mode: "Markdown" },
        { filename: "dorama.mp4", contentType: "video/mp4" },
      );
      return true;
    }
    // fallback
    try {
      await bot.sendPhoto(chatId, imageUrl, { caption, parse_mode: "Markdown" });
    } catch {}
    return false;
  }

  async function sendAd(chatId: number) {
    const ad = getNextAd();
    try {
      await bot.sendPhoto(chatId, ad.image, {
        caption: `📢 *Publicidade*\n\n*${ad.title}*\n\n${ad.text}`,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: ad.buttonLabel, url: ad.buttonUrl }],
            [{ text: "👑 Remover propagandas — Assinar VIP", callback_data: "assinar_vip" }],
          ],
        },
      });
    } catch {}
  }

  function mainKeyboard(vip: boolean) {
    const rows: { text: string; callback_data: string }[][] = [
      [{ text: "🎭 Gerar Personagem IA", callback_data: "gerar_personagem" }],
      [
        { text: "⭐ Destaques", callback_data: "destaque" },
        { text: "🗣️ Idioma", callback_data: "idioma_menu" },
      ],
    ];
    if (vip) {
      rows.push([{ text: "👑 Minha Área VIP", callback_data: "area_vip" }]);
    } else {
      rows.push([{ text: "👑 Ser VIP — HD sem propagandas", callback_data: "assinar_vip" }]);
    }
    rows.push([
      { text: "📊 Stats", callback_data: "stats" },
      { text: "❓ Ajuda", callback_data: "ajuda" },
    ]);
    return { inline_keyboard: rows };
  }

  function backMenu() {
    return { inline_keyboard: [[{ text: "🏠 Menu", callback_data: "menu" }]] };
  }

  // ─── /start ────────────────────────────────────────────────────────────────

  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const user = msg.from!;
    register(user);
    const vip = isVip(String(user.id));
    const voiceId = getVoiceId(String(user.id));
    const langLabel = getLangLabel(String(user.id));

    await sendDIDVideo(chatId, WELCOME_AUDIO, YUNA_PHOTO, voiceId, WELCOME_CAPTION, "standard");

    const statusText = vip
      ? `👑 *${user.first_name}*, você é VIP!\nTodos os 50 episódios em HD. Sem propaganda.`
      : `Olá, *${user.first_name}*! 🌸\n\n🎁 Episódio 1 de cada dorama — grátis!\n👑 VIP: 50 eps em HD, sem propagandas`;

    await bot.sendMessage(
      chatId,
      `━━━━━━━━━━━━━━━━━━━━━\n✦ D O R A M A  A I ✦\n━━━━━━━━━━━━━━━━━━━━━\n\n${statusText}\n\n🗣️ Voz: ${langLabel}\n\nEscolha uma opção:`,
      { parse_mode: "Markdown", reply_markup: mainKeyboard(vip) },
    );
  });

  // ─── callbacks ─────────────────────────────────────────────────────────────

  bot.on("callback_query", async (query) => {
    const chatId = query.message!.chat.id;
    const userId = String(query.from.id);
    const data = query.data ?? "";
    await bot.answerCallbackQuery(query.id);

    // menu
    if (data === "menu") {
      const vip = isVip(userId);
      await bot.editMessageText(
        `━━━━━━━━━━━━━━━━━━━━━\n✦ D O R A M A  A I ✦\n━━━━━━━━━━━━━━━━━━━━━\n\n🗣️ Voz: ${getLangLabel(userId)}\n\nEscolha uma opção:`,
        { chat_id: chatId, message_id: query.message!.message_id, reply_markup: mainKeyboard(vip) },
      );
      return;
    }

    // catalogo
    if (data === "catalogo") {
      const rows = DRAMAS.map((d) => [
        { text: `🎬 ${d.title} — ${d.genre}`, callback_data: `drama_${d.id}` },
      ]);
      rows.push([{ text: "🏠 Menu", callback_data: "menu" }]);
      await bot.editMessageText(
        "🎬 *Catálogo DoramaAI*\n\n5 doramas · 10 episódios cada · 50 no total\nEp 1 grátis · VIP = todos em HD sem propaganda",
        { chat_id: chatId, message_id: query.message!.message_id, parse_mode: "Markdown", reply_markup: { inline_keyboard: rows } },
      );
      return;
    }

    // destaque
    if (data === "destaque") {
      const rows = DRAMAS.slice(0, 3).map((d) => [
        { text: `🔥 ${d.title}`, callback_data: `drama_${d.id}` },
      ]);
      rows.push([{ text: "🏠 Menu", callback_data: "menu" }]);
      await bot.editMessageText(
        "⭐ *Destaques da Semana*\n\nOs doramas mais assistidos agora:",
        { chat_id: chatId, message_id: query.message!.message_id, parse_mode: "Markdown", reply_markup: { inline_keyboard: rows } },
      );
      return;
    }

    // stats
    if (data === "stats") {
      const s = stats();
      await bot.editMessageText(
        `📊 *DoramaAI Stats*\n\n🎬 ${DRAMAS.length} doramas\n🎞️ 50 episódios\n👥 ${s.total} usuários\n👑 ${s.vip} VIPs`,
        { chat_id: chatId, message_id: query.message!.message_id, parse_mode: "Markdown", reply_markup: backMenu() },
      );
      return;
    }

    // drama detail
    if (data.startsWith("drama_")) {
      const dramaId = Number(data.split("_")[1]);
      const drama = getDrama(dramaId);
      if (!drama) return;
      await bot.editMessageText(
        `🎬 *${drama.title}*\n_${drama.genre}_\n\n${drama.synopsis}`,
        {
          chat_id: chatId,
          message_id: query.message!.message_id,
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "🎞️ Ver Episódios", callback_data: `eps_${dramaId}` }],
              [{ text: "🏠 Menu", callback_data: "menu" }],
            ],
          },
        },
      );
      return;
    }

    // episodes list
    if (data.startsWith("eps_")) {
      const dramaId = Number(data.split("_")[1]);
      const drama = getDrama(dramaId);
      const episodes = getEpisodes(dramaId);
      const vip = isVip(userId);
      if (!drama || !episodes.length) return;

      const rows = episodes.map((ep) => {
        const locked = ep.number > 1 && !vip;
        const icon = locked ? "🔒" : vip ? "👑▶️" : "▶️";
        return [
          {
            text: `${icon} Ep ${ep.number}: ${ep.title}`,
            callback_data: `ep_${dramaId}_${ep.number}`,
          },
        ];
      });
      rows.push([{ text: "🏠 Menu", callback_data: "menu" }]);

      await bot.editMessageText(
        `🎞️ *${drama.title}*\n\n${vip ? "👑 VIP: todos em HD desbloqueados!" : "🎁 Ep 1 grátis · 🔒 demais requerem VIP (HD + sem propaganda)"}`,
        { chat_id: chatId, message_id: query.message!.message_id, parse_mode: "Markdown", reply_markup: { inline_keyboard: rows } },
      );
      return;
    }

    // play episode
    if (data.startsWith("ep_")) {
      const parts = data.split("_");
      const dramaId = Number(parts[1]);
      const epNumber = Number(parts[2]);
      const episodes = getEpisodes(dramaId);
      const ep = episodes.find((e) => e.number === epNumber);
      const drama = getDrama(dramaId);
      if (!ep || !drama) return;

      const vip = isVip(userId);
      const voiceId = getVoiceId(userId);
      const isLocked = ep.number > 1 && !vip;

      await bot.editMessageText(
        isLocked
          ? `🎬 *${drama.title} — Ep ${ep.number}: ${ep.title}*\n\n_Gerando teaser exclusivo..._\nAssine o VIP para o episódio completo em HD! ✨`
          : `🎬 *Gerando vídeo — Ep ${ep.number}...*\n_${ep.title}_\n\nYuna está preparando sua experiência! ✨`,
        { chat_id: chatId, message_id: query.message!.message_id, parse_mode: "Markdown" },
      );

      if (isLocked) {
        // Send LOW quality TEASER to entice VIP signup
        const teaserCaption =
          `🔒 *${drama.title} — Ep ${ep.number}: ${ep.title}*\n\n` +
          `_${ep.teaser}_\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━\n` +
          `👑 *Assine o VIP para assistir completo em HD!*\n` +
          `◆ Narração completa e sensual\n◆ Vídeo em alta definição\n◆ Zero propaganda`;

        await sendDIDVideo(chatId, ep.teaser, ep.image, voiceId, teaserCaption, "standard");

        // Show ad after teaser
        await sendAd(chatId);

        await bot.sendMessage(chatId,
          `🔒 *Este é apenas o teaser do Ep ${ep.number}!*\n\nAssine o VIP e acesse:\n◆ Narração completa e sensual\n◆ Vídeo em HD\n◆ Todos os 50 episódios\n◆ Zero propaganda`,
          {
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [{ text: "👑 QUERO O VIP — HD sem propaganda!", callback_data: "assinar_vip" }],
                [{ text: "📋 Episódios", callback_data: `eps_${dramaId}` }],
                [{ text: "🏠 Menu", callback_data: "menu" }],
              ],
            },
          },
        );
        return;
      }

      // Free ep 1 or VIP — full episode
      const quality: VideoQuality = vip ? "hd" : "standard";
      const hdBadge = vip ? "👑 HD · " : "";
      const caption =
        `🎬 *${drama.title}*\n` +
        `📺 ${hdBadge}Episódio ${ep.number}: _${ep.title}_\n\n` +
        `${ep.synopsis}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `✦ Narrado por Yuna · DoramaAI`;

      await sendDIDVideo(chatId, ep.synopsis, ep.image, voiceId, caption, quality);

      // Show ad after free episode (non-VIP only)
      if (!vip) {
        await sendAd(chatId);
      }

      // Navigation
      const nextEp = episodes.find((e) => e.number === epNumber + 1);
      const rows: { text: string; callback_data: string }[][] = [];
      if (nextEp) {
        rows.push([{
          text: vip ? `▶️ Próximo Ep ${nextEp.number} (HD)` : `🔒 Próximo Ep ${nextEp.number} — VIP`,
          callback_data: `ep_${dramaId}_${nextEp.number}`,
        }]);
      }
      if (!vip) {
        rows.push([{ text: "👑 VIP — HD sem propaganda", callback_data: "assinar_vip" }]);
      }
      rows.push([{ text: "📋 Episódios", callback_data: `eps_${dramaId}` }]);
      rows.push([{ text: "🏠 Menu", callback_data: "menu" }]);

      await bot.sendMessage(
        chatId,
        vip
          ? `✅ *Ep ${ep.number} — HD concluído!*`
          : `✅ *Ep ${ep.number} concluído!*\n\n👑 Desbloqueie os 50 eps em HD sem propaganda!`,
        { parse_mode: "Markdown", reply_markup: { inline_keyboard: rows } },
      );
      return;
    }

    // idioma menu
    if (data === "idioma_menu") {
      const rows = Object.entries(VOZES).map(([key, v]) => [
        { text: v.label, callback_data: `lang_${key}` },
      ]);
      rows.push([{ text: "🏠 Menu", callback_data: "menu" }]);
      await bot.editMessageText(
        "🗣️ *Escolha o idioma da narração:*\n\nYuna vai narrar todos os episódios no idioma selecionado com voz Neural real.",
        { chat_id: chatId, message_id: query.message!.message_id, parse_mode: "Markdown", reply_markup: { inline_keyboard: rows } },
      );
      return;
    }

    // set language
    if (data.startsWith("lang_")) {
      const lang = data.replace("lang_", "");
      setLanguage(userId, lang);
      const label = VOZES[lang]?.label ?? lang;
      await bot.editMessageText(
        `✅ *Idioma: ${label}*\n\nYuna agora fala em *${label}*. Aproveite! 🎙️`,
        { chat_id: chatId, message_id: query.message!.message_id, parse_mode: "Markdown", reply_markup: backMenu() },
      );
      return;
    }

    // vip upsell
    if (data === "assinar_vip") {
      let txt =
        `👑 *VIP DoramaAI*\n\n` +
        `✦ O que você ganha:\n` +
        `🎥 Todos os 50 episódios em *HD*\n` +
        `🎙️ Narrações completas e sensuais\n` +
        `🗣️ 14 idiomas disponíveis\n` +
        `🚫 *Zero propaganda*\n` +
        `⚡ Acesso imediato\n\n` +
        `💰 *R$ ${VIP_PRICE_BRL}/mês* ou *${VIP_PRICE_TON} TON*\n\n`;
      if (PIX_KEY) txt += `📲 PIX: \`${PIX_KEY}\`\n\n`;
      if (TONCOIN_ADDRESS) txt += `💎 Toncoin: \`${TONCOIN_ADDRESS}\`\n\n`;
      txt += `📩 Envie o comprovante aqui (foto ou texto).\n✅ VIP ativado em até 30 min!`;
      await bot.editMessageText(txt, {
        chat_id: chatId,
        message_id: query.message!.message_id,
        parse_mode: "Markdown",
        reply_markup: backMenu(),
      });
      return;
    }

    // area vip
    if (data === "area_vip") {
      if (!isVip(userId)) {
        await bot.editMessageText("🔒 *Área VIP exclusiva.*", {
          chat_id: chatId,
          message_id: query.message!.message_id,
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "👑 Ser VIP", callback_data: "assinar_vip" }],
              [{ text: "🏠 Menu", callback_data: "menu" }],
            ],
          },
        });
        return;
      }
      const rows = DRAMAS.map((d) => [
        { text: `🎬 ${d.title}`, callback_data: `drama_${d.id}` },
      ]);
      rows.push([{ text: "🏠 Menu", callback_data: "menu" }]);
      await bot.editMessageText("👑 *Área VIP — 50 episódios em HD, sem propaganda*", {
        chat_id: chatId,
        message_id: query.message!.message_id,
        parse_mode: "Markdown",
        reply_markup: { inline_keyboard: rows },
      });
      return;
    }

    // gerar personagem via callback
    if (data === "gerar_personagem") {
      const character = generateRandomCharacter();
      const voiceId = getVoiceId(userId);

      const introText =
        `Ola! Eu sou ${character.name}. ` +
        `${character.description} ` +
        `Estou aqui para te contar historias incriveis. Vamos comecar?`;

      const caption =
        `✦ *${character.name}* ✦\n\n` +
        `_${character.description}_\n\n` +
        `🎭 Estilo: ${character.style}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `Personagem gerado com IA + D-ID`;

      await sendDIDVideo(chatId, introText, character.imageUrl, voiceId, caption, "standard");

      await bot.sendMessage(chatId, "🎭 *Personagem gerado!*\nQuer outro? Clique abaixo:", {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "🎭 Gerar Outro", callback_data: "gerar_personagem" }],
            [
              { text: "📋 Galeria", callback_data: "galeria" },
              { text: "🏠 Menu", callback_data: "menu" },
            ],
          ],
        },
      });
      return;
    }

    // galeria via callback
    if (data === "galeria") {
      const characters = getAllCharacters();
      let text = "🎭 *Galeria de Personagens*\n\n";
      for (const char of characters) {
        text += `✦ *${char.name}*\n_${char.description}_\n\n`;
      }
      text += "Use o botão abaixo para gerar um com video D-ID!";
      await bot.sendMessage(chatId, text, {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "🎭 Gerar Personagem", callback_data: "gerar_personagem" }],
            [{ text: "🏠 Menu", callback_data: "menu" }],
          ],
        },
      });
      return;
    }

    // ajuda
    if (data === "ajuda") {
      await bot.editMessageText(
        `❓ *Ajuda DoramaAI*\n\n` +
        `🎭 *Personagem IA:*\n` +
        `Clique em "Gerar Personagem IA" para criar um personagem com video D-ID\n\n` +
        `🎬 *Como assistir doramas:*\n` +
        `1. Clique em "Destaques"\n` +
        `2. Escolha um dorama\n` +
        `3. Clique no Ep 1 (grátis!)\n` +
        `4. Yuna gera o vídeo e narra para você\n\n` +
        `🗣️ *Idiomas:* 14 opções de narração\n` +
        `👑 *VIP:* 50 eps em HD · sem propaganda\n\n` +
        `📩 *Suporte:* Envie mensagem de texto aqui`,
        {
          chat_id: chatId,
          message_id: query.message!.message_id,
          parse_mode: "Markdown",
          reply_markup: backMenu(),
        },
      );
      return;
    }
  });

  // ─── comprovantes ──────────────────────────────────────────────────────────

  bot.on("photo", async (msg) => {
    const user = msg.from!;
    if (isVip(String(user.id))) {
      await bot.sendMessage(msg.chat.id, "👑 Você já é VIP!");
      return;
    }
    try {
      await bot.forwardMessage(ADMIN_ID, msg.chat.id, msg.message_id);
      await bot.sendMessage(ADMIN_ID,
        `💰 Comprovante FOTO\n${user.first_name} (@${user.username ?? "-"}) ID: ${user.id}\n/setvip ${user.id} true`);
    } catch {}
    await bot.sendMessage(msg.chat.id, "✅ Comprovante recebido! VIP em até 30 min. 😊");
  });

  bot.on("message", async (msg) => {
    if (!msg.text || msg.text.startsWith("/")) return;
    const user = msg.from!;
    if (isVip(String(user.id))) return;
    if (msg.text.length > 10) {
      try {
        await bot.sendMessage(ADMIN_ID,
          `💰 Comprovante TEXTO\n${user.first_name} (@${user.username ?? "-"}) ID: ${user.id}\n"${msg.text}"\n/setvip ${user.id} true`);
      } catch {}
      await bot.sendMessage(msg.chat.id, "✅ Comprovante recebido! VIP em até 30 min. 😊");
    }
  });

  // ─── admin ─────────────────────────────────────────────────────────────────

  function adminOnly(fn: (msg: TelegramBot.Message, match: RegExpExecArray | null) => Promise<void>) {
    return async (msg: TelegramBot.Message, match: RegExpExecArray | null) => {
      if (msg.from?.id !== ADMIN_ID) {
        await bot.sendMessage(msg.chat.id, "🚫 Admin apenas."); return;
      }
      await fn(msg, match);
    };
  }

  bot.onText(/\/setvip (\d+) (true|false)/, adminOnly(async (msg, match) => {
    const tid = match![1]!;
    const active = match![2] === "true";
    setVip(tid, active);
    await bot.sendMessage(msg.chat.id, `${active ? "✅ VIP HD ativado" : "❌ VIP removido"} para ${tid}.`);
    try {
      await bot.sendMessage(Number(tid),
        active ? "👑 VIP ativado! 50 eps em HD sem propaganda. Use /start." : "VIP encerrado. Use /start para renovar.");
    } catch {}
  }));

  bot.onText(/\/broadcast (.+)/, adminOnly(async (msg, match) => {
    const text = match![1]!;
    const subs = allSubscribers();
    let ok = 0, fail = 0;
    for (const uid of Object.keys(subs)) {
      try {
        await bot.sendMessage(Number(uid), `📢 *DoramaAI:*\n\n${text}`, { parse_mode: "Markdown" });
        ok++;
      } catch { fail++; }
    }
    await bot.sendMessage(msg.chat.id, `✅ ${ok} enviados, ${fail} falhas.`);
  }));

  bot.onText(/\/setpix (.+)/, adminOnly(async (msg, match) => {
    PIX_KEY = match![1]!;
    await bot.sendMessage(msg.chat.id, `✅ PIX: ${PIX_KEY}`);
  }));

  bot.onText(/\/settoncoin (.+)/, adminOnly(async (msg, match) => {
    TONCOIN_ADDRESS = match![1]!;
    await bot.sendMessage(msg.chat.id, `✅ Toncoin: ${TONCOIN_ADDRESS}`);
  }));

  bot.onText(/\/stats/, adminOnly(async (msg) => {
    const s = stats();
    const adRandom = getRandomAd();
    await bot.sendMessage(msg.chat.id,
      `📊 *Stats Admin*\n🎬 ${DRAMAS.length} doramas · 50 eps\n👥 ${s.total} usuários\n👑 ${s.vip} VIPs\n📢 Próxima propaganda: ${adRandom.title}`,
      { parse_mode: "Markdown" });
  }));

  bot.onText(/\/adminhelp/, adminOnly(async (msg) => {
    await bot.sendMessage(msg.chat.id,
      `📋 *Comandos Admin:*\n/setvip <id> true|false\n/broadcast <msg>\n/setpix <chave>\n/settoncoin <endereço>\n/stats`,
      { parse_mode: "Markdown" });
  }));

  // ─── /personagem — generate anime character with D-ID ──────────────────────

  bot.onText(/\/personagem/, async (msg) => {
    const chatId = msg.chat.id;
    const user = msg.from!;
    const voiceId = getVoiceId(String(user.id));
    const character = generateRandomCharacter();

    const introText =
      `Ola! Eu sou ${character.name}. ` +
      `${character.description} ` +
      `Estou aqui para te contar historias incriveis. Vamos comecar?`;

    const caption =
      `✦ *${character.name}* ✦\n\n` +
      `_${character.description}_\n\n` +
      `🎭 Estilo: ${character.style}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `Personagem gerado com IA + D-ID`;

    await sendDIDVideo(chatId, introText, character.imageUrl, voiceId, caption, "standard");

    await bot.sendMessage(chatId, "Quer gerar outro personagem? Use /personagem novamente!", {
      reply_markup: backMenu(),
    });
  });

  // ─── /galeria — show all anime characters ─────────────────────────────────

  bot.onText(/\/galeria/, async (msg) => {
    const chatId = msg.chat.id;
    const characters = getAllCharacters();

    let text = "🎭 *Galeria de Personagens*\n\n";
    for (const char of characters) {
      text += `✦ *${char.name}*\n_${char.description}_\n\n`;
    }
    text += "Use /personagem para gerar um com video D-ID!";

    await bot.sendMessage(chatId, text, {
      parse_mode: "Markdown",
      reply_markup: backMenu(),
    });
  });

  bot.on("polling_error", (err) => {
    logger.error({ err }, "Telegram polling error");
  });
}
