import { logger } from "../lib/logger.js";
import { writeFileSync, unlinkSync, mkdirSync } from "fs";
import { join } from "path";

const DID_API_KEY = process.env["DID_API_KEY"] ?? "";
const DID_BASE = "https://api.d-id.com";
const TMP_DIR = "/tmp/doramaai";

try { mkdirSync(TMP_DIR, { recursive: true }); } catch {}

export type VideoQuality = "standard" | "hd";

interface DIDTalkOptions {
  text: string;
  imageUrl: string;
  voiceId?: string;
  quality?: VideoQuality;
  expression?: string;
  movementType?: "speaking" | "idle" | "expressive";
}

// ─── Upload image to D-ID ─────────────────────────────────────────────────
// D-ID requires URLs ending in .jpg/.png/.jpeg. Pollinations URLs don't have
// extensions, so we download the image and upload it to D-ID's /images endpoint.

const imageCache = new Map<string, string>();

async function getDIDImageUrl(sourceUrl: string): Promise<string | null> {
  const cached = imageCache.get(sourceUrl);
  if (cached) return cached;

  try {
    // Download image from Pollinations
    const imgRes = await fetch(sourceUrl);
    if (!imgRes.ok) {
      logger.error({ status: imgRes.status }, "Failed to download source image");
      return null;
    }

    const imgBuf = Buffer.from(await imgRes.arrayBuffer());
    const contentType = imgRes.headers.get("content-type") ?? "image/jpeg";

    // Upload to D-ID's /images endpoint
    const formData = new FormData();
    const blob = new Blob([imgBuf], { type: contentType });
    formData.append("image", blob, "character.jpg");

    const uploadRes = await fetch(`${DID_BASE}/images`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${DID_API_KEY}`,
      },
      body: formData,
    });

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      logger.error({ status: uploadRes.status, err }, "D-ID image upload failed");
      return null;
    }

    const uploadData = (await uploadRes.json()) as { url?: string; id?: string };
    const didUrl = uploadData.url;

    if (didUrl) {
      imageCache.set(sourceUrl, didUrl);
      logger.info({ didUrl }, "Image uploaded to D-ID");
      return didUrl;
    }

    logger.error("D-ID image upload returned no URL");
    return null;
  } catch (err) {
    logger.error({ err }, "D-ID image upload exception");
    return null;
  }
}

// ─── Generate TTS Audio (free fallback via Google Translate TTS) ───────────

export async function generateTTSAudio(
  text: string,
  lang: string = "pt-br",
): Promise<Buffer | null> {
  try {
    // Split text into chunks of ~180 chars at sentence boundaries
    const chunks = splitTextForTTS(text, 180);
    const audioBuffers: Buffer[] = [];

    for (const chunk of chunks) {
      const encoded = encodeURIComponent(chunk);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encoded}`;

      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Referer: "https://translate.google.com/",
        },
      });

      if (!res.ok) {
        logger.warn({ status: res.status, chunk: chunk.slice(0, 30) }, "Google TTS chunk failed");
        continue;
      }

      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length > 0) {
        audioBuffers.push(buf);
      }
    }

    if (audioBuffers.length === 0) return null;

    // Concatenate MP3 buffers
    return Buffer.concat(audioBuffers);
  } catch (err) {
    logger.error({ err }, "TTS generation error");
    return null;
  }
}

function splitTextForTTS(text: string, maxLen: number): string[] {
  const sentences = text.match(/[^.!?…]+[.!?…]+/g) ?? [text];
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    if ((current + " " + trimmed).length > maxLen && current) {
      chunks.push(current.trim());
      current = trimmed;
    } else {
      current = current ? current + " " + trimmed : trimmed;
    }
  }
  if (current.trim()) chunks.push(current.trim());

  return chunks;
}

// Map voice IDs to Google TTS language codes for fallback
const voiceToLang: Record<string, string> = {
  "pt-BR-ThalitaMultilingualNeural": "pt-br",
  "en-US-AvaMultilingualNeural": "en",
  "es-ES-ElviraNeural": "es",
  "ko-KR-SunHiNeural": "ko",
  "ja-JP-NanamiNeural": "ja",
  "fr-FR-DeniseNeural": "fr",
  "it-IT-ElsaNeural": "it",
  "de-DE-KatjaNeural": "de",
  "zh-CN-XiaoxiaoNeural": "zh-cn",
  "hi-IN-SwaraNeural": "hi",
  "ru-RU-SvetlanaNeural": "ru",
  "ar-SA-ZariyahNeural": "ar",
  "tr-TR-EmelNeural": "tr",
  "th-TH-PremwadeeNeural": "th",
};

export function getTTSLang(voiceId: string): string {
  return voiceToLang[voiceId] ?? "pt-br";
}

// ─── Public API ───────────────────────────────────────────────────────────

export async function generateDIDVideo(
  text: string,
  imageUrl: string,
  voiceId: string = "pt-BR-ThalitaMultilingualNeural",
  quality: VideoQuality = "standard",
): Promise<Buffer | null> {
  return createTalk({ text, imageUrl, voiceId, quality });
}

export async function generateAnimatedAvatar(
  imageUrl: string,
  text: string,
  voiceId: string = "pt-BR-ThalitaMultilingualNeural",
): Promise<Buffer | null> {
  return createTalk({
    text,
    imageUrl,
    voiceId,
    quality: "standard",
    expression: "happy",
    movementType: "expressive",
  });
}

export async function generateIdleVideo(
  imageUrl: string,
  durationSec: number = 5,
): Promise<Buffer | null> {
  if (!DID_API_KEY) {
    logger.warn("DID_API_KEY not set — skipping idle video");
    return null;
  }

  try {
    const didImageUrl = await getDIDImageUrl(imageUrl);
    if (!didImageUrl) return null;

    const createRes = await fetch(`${DID_BASE}/animations`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${DID_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        source_url: didImageUrl,
        config: { result_format: "mp4" },
        driver_url: "bank://lively",
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      logger.error({ status: createRes.status, err }, "D-ID animation create failed");
      return null;
    }

    const createData = (await createRes.json()) as { id?: string };
    const animId = createData.id;
    if (!animId) return null;

    return pollResult(`${DID_BASE}/animations/${animId}`);
  } catch (err) {
    logger.error({ err }, "D-ID animation exception");
    return null;
  }
}

// ─── Core D-ID Talk creation ──────────────────────────────────────────────

async function createTalk(opts: DIDTalkOptions): Promise<Buffer | null> {
  if (!DID_API_KEY) {
    logger.warn("DID_API_KEY not set — skipping D-ID video");
    return null;
  }

  const isHD = opts.quality === "hd";

  try {
    // Upload image to D-ID first (fixes Pollinations URL rejection)
    const didImageUrl = await getDIDImageUrl(opts.imageUrl);
    if (!didImageUrl) {
      logger.error("Could not upload image to D-ID");
      return null;
    }

    const body: Record<string, unknown> = {
      source_url: didImageUrl,
      script: {
        type: "text",
        input: opts.text.slice(0, 1500), // D-ID text limit
        provider: {
          type: "microsoft",
          voice_id: opts.voiceId ?? "pt-BR-ThalitaMultilingualNeural",
          voice_config: {
            style: "Narration-Professional",
            rate: isHD ? "0.78" : "0.88",
            pitch: isHD ? "-12%" : "-6%",
          },
        },
      },
      config: {
        fluent: true,
        stitch: true,
        pad_audio: isHD ? 1.2 : 0.5,
        result_format: "mp4",
        ...(isHD ? { sharpen: true } : {}),
      },
    };

    if (opts.expression) {
      (body as Record<string, unknown>)["user_data"] = opts.expression;
    }

    const createRes = await fetch(`${DID_BASE}/talks`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${DID_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      logger.error({ status: createRes.status, err }, "D-ID create failed");
      return null;
    }

    const createData = (await createRes.json()) as { id?: string };
    const talkId = createData.id;
    if (!talkId) {
      logger.error("D-ID: no talk ID returned");
      return null;
    }

    logger.info({ talkId, quality: opts.quality }, "D-ID talk created, polling...");
    return pollResult(`${DID_BASE}/talks/${talkId}`);
  } catch (err) {
    logger.error({ err }, "D-ID exception");
    return null;
  }
}

async function pollResult(url: string): Promise<Buffer | null> {
  for (let i = 0; i < 80; i++) {
    await sleep(3000);
    const statusRes = await fetch(url, {
      headers: {
        Authorization: `Basic ${DID_API_KEY}`,
        Accept: "application/json",
      },
    });
    if (!statusRes.ok) continue;

    const data = (await statusRes.json()) as {
      status?: string;
      result_url?: string;
      error?: unknown;
    };

    if (data.status === "done" && data.result_url) {
      const videoRes = await fetch(data.result_url);
      if (!videoRes.ok) return null;
      const buf = await videoRes.arrayBuffer();
      logger.info({ kb: Math.round(buf.byteLength / 1024) }, "D-ID video ready");
      return Buffer.from(buf);
    }
    if (data.status === "error") {
      logger.error({ data }, "D-ID processing error");
      return null;
    }
  }

  logger.error("D-ID timeout after 240s");
  return null;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
