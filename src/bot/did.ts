import { logger } from "../lib/logger.js";

const DID_API_KEY = process.env["DID_API_KEY"] ?? "";
const DID_BASE = "https://api.d-id.com";

export type VideoQuality = "standard" | "hd";

interface DIDTalkOptions {
  text: string;
  imageUrl: string;
  voiceId?: string;
  quality?: VideoQuality;
  expression?: string;
  movementType?: "speaking" | "idle" | "expressive";
}

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
    const createRes = await fetch(`${DID_BASE}/animations`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${DID_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        source_url: imageUrl,
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

async function createTalk(opts: DIDTalkOptions): Promise<Buffer | null> {
  if (!DID_API_KEY) {
    logger.warn("DID_API_KEY not set — skipping D-ID video");
    return null;
  }

  const isHD = opts.quality === "hd";

  try {
    const body: Record<string, unknown> = {
      source_url: opts.imageUrl,
      script: {
        type: "text",
        input: opts.text,
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
