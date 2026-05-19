import { env } from "@/env";

Bun.build({
  entrypoints: ["src/app.ts"],
  outdir: "./build",
  target: "bun",
  minify: {
    whitespace: true,
    syntax: true,
  },
  compile: {
    target: env.BUILD_TARGET ? "bun-linux-x64" : "bun-windows-x64",
    outfile: "server",
  },
});

export {};
