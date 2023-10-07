/* eslint-env browser */
import path from "path";

import MiniCssExtractPlugin from "../src";

import { runInJsDom, compile, getCompiler } from "./helpers/index";

describe("hooks", () => {
  it(`beforeTagInsert`, async () => {
    const webpackCompiler = getCompiler(
      "insert.js",
      {},
      {
        mode: "none",
        output: {
          publicPath: "",
          path: path.resolve(__dirname, "../outputs"),
          filename: "[name].bundle.js",
        },
        plugins: [
          new MiniCssExtractPlugin({
            filename: "[name].css",
          }),
          {
            apply: (compiler) => {
              MiniCssExtractPlugin.getHooks(compiler).beforeTagInsert.tap(
                "sri",
                (source, varNames) =>
                  compiler.webpack.Template.asString([
                    source,
                    `${varNames.tag}.setAttribute("integrity", "sriHashes[${varNames.chunkId}]");`,
                  ])
              );
            },
          },
          {
            apply: (compiler) => {
              MiniCssExtractPlugin.getHooks(compiler).beforeTagInsert.tap(
                "changeHref",
                (source, varNames) =>
                  compiler.webpack.Template.asString([
                    source,
                    `${varNames.tag}.setAttribute("href", "https://github.com/webpack-contrib/mini-css-extract-plugin");`,
                  ])
              );
            },
          },
        ],
      }
    );
    const stats = await compile(webpackCompiler);
    runInJsDom("main.bundle.js", webpackCompiler, stats, (dom) => {
      const [tag] = dom.window.document.head.getElementsByTagName("link");
      expect(tag.getAttribute("integrity")).toBe("sriHashes[chunkId]");
      expect(tag.getAttribute("href")).toBe(
        "https://github.com/webpack-contrib/mini-css-extract-plugin"
      );
    });
  });
});
