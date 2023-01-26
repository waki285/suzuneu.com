const { context } = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const { copy: copyPlugin } = require("esbuild-plugin-copy");
const { default: postcss } = require("postcss");
const tailwindcss = require("tailwindcss");
const TailwindSettings = require("./tailwind.config.js");
const postcssPresetEnv = require("postcss-preset-env");

(async () => {
  const ctx = await context({
    entryPoints: ["src/js/client.tsx"],
    bundle: true,
    minify: true,
    sourcemap: "inline",
    target: "ES2021",
    outdir: "dist",
    platform: "browser",
    tsconfig: "tsconfig.json",
    external: ["tailwindcss", "autoprefixer"],
    logLevel: "info",
    loader: {
      ".png": "file",
    },
    plugins: [
      sassPlugin({
        type: "style",
        filter: /\.s(c|a)ss$/,
        async transform(source, resolveDir) {
          const { css } = await postcss([tailwindcss(TailwindSettings), require("autoprefixer"), postcssPresetEnv]).process(source, { from: undefined });
          return css;
        }
      }),
      copyPlugin({
        resolveFrom: "cwd",
        assets: [
          { from: "src/assets/icon.png", to: "dist/icon.png" },
          { from: "public/**/*", to: "dist/" }
        ]
      }),
      {
        name: 'on-end',
        setup(build) {
          build.onEnd((result) => {
          })
        }
      }
    ]
  });

  await ctx.watch();
  const { host, port } = await ctx.serve({
    servedir: "dist",
  });

})();