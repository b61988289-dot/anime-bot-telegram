import { build } from "esbuild";

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  outfile: "dist/index.mjs",
  sourcemap: true,
  external: [
    "pino",
    "pino-http",
    "pino-pretty",
    "thread-stream",
    "node-telegram-bot-api",
  ],
  banner: {
    js: `
import { createRequire } from 'module';
import { fileURLToPath as __fileURLToPath } from 'url';
import { dirname as __dirname_fn } from 'path';
const require = createRequire(import.meta.url);
const __filename = __fileURLToPath(import.meta.url);
const __dirname = __dirname_fn(__filename);
`,
  },
});

console.log("Build complete -> dist/index.mjs");
