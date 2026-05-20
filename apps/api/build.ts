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
    target:
      env.BUILD_TARGET === "development" ? "bun-windows-x64" : "bun-linux-x64",
    outfile: "server",
  },
});

export {};
