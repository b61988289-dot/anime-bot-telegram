import { logger } from "../lib/logger.js";

const DID_API_KEY = process.env["DID_API_KEY"] ?? "";
const DID_BASE = "https://api.d-id.com";

export type VideoQuality = "standard" | "hd";

export async function generateDIDVideo(
  text: string,
  imageUrl: string,
  voiceId: string = "pt-BR-ThalitaMultilingualNeural",
  quality: VideoQuality = "standard",
): Promise<Buffer | null> {
  if (!DID_API_KEY) {
    logger.warn("DID_API_KEY not set — skipping D-ID video");
    return null;
  }

  const isHD = quality === "hd";

  try {
    const createRes = await fetch(`${DID_BASE}/talks`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${DID_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        source_url: imageUrl,
        script: {
          type: "text",
          input: text,
          provider: {
            type: "microsoft",
            voice_id: voiceId,
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
      }),
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

    logger.info({ talkId, quality }, "D-ID talk created, polling...");

    for (let i = 0; i < 80; i++) {
      await sleep(3000);
      const statusRes = await fetch(`${DID_BASE}/talks/${talkId}`, {
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
        logger.info({ kb: Math.round(buf.byteLength / 1024), quality }, "D-ID video ready");
        return Buffer.from(buf);
      }
      if (data.status === "error") {
        logger.error({ data }, "D-ID processing error");
        return null;
      }
    }

    logger.error("D-ID timeout after 240s");
    return null;
  } catch (err) {
    logger.error({ err }, "D-ID exception");
    return null;
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
