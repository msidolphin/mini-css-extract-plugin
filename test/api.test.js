import path from "path";

import webpack from "webpack";

import MiniCssExtractPlugin from "../src";

import { getCompiler } from "./helpers/index";

describe("API", () => {
  it("should return the same CssModule when same webpack instance provided", () => {
    expect(MiniCssExtractPlugin.getCssModule(webpack)).toEqual(
      MiniCssExtractPlugin.getCssModule(webpack)
    );
  });

  it("should return the same CssDependency when same webpack instance provided", () => {
    expect(MiniCssExtractPlugin.getCssDependency(webpack)).toEqual(
      MiniCssExtractPlugin.getCssDependency(webpack)
    );
  });

  it("should return the same Hooks when same webpack instance provided", () => {
    const compiler = getCompiler(
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
        ],
      }
    );
    expect(MiniCssExtractPlugin.getHooks(compiler)).toEqual(
      MiniCssExtractPlugin.getHooks(compiler)
    );
  });
});
