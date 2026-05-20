import esbuild from "esbuild";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// Simple pino transport handling
const pinoPlugin = {
  name: "pino",
  setup(build) {
    build.onResolve({ filter: /^pino$/ }, (args) => {
      return { path: require.resolve("pino"), external: true };
    });
    build.onResolve({ filter: /^pino-pretty$/ }, (args) => {
      return { path: require.resolve("pino-pretty"), external: true };
    });
    build.onResolve({ filter: /^pino-http$/ }, (args) => {
      return { path: require.resolve("pino-http"), external: true };
    });
    build.onResolve({ filter: /^thread-stream$/ }, (args) => {
      return { external: true };
    });
  },
};

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  outdir: "dist",
  outExtension: { ".js": ".mjs" },
  sourcemap: true,
  plugins: [pinoPlugin],
  external: [
    "node-telegram-bot-api",
    "pino",
    "pino-http",
    "pino-pretty",
    "thread-stream",
  ],
  banner: {
    js: `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
`,
  },
});

console.log("Build complete -> dist/index.mjs");
