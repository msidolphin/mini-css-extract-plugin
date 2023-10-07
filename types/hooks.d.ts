export type WebpackCompiler = import("webpack").Compiler;
export type VarNames = {
  tag: string;
  chunkId: string;
  href: string;
  resolve: string;
  reject: string;
};
export type MiniCssExtractHooks = {
  beforeTagInsert: import("tapable").SyncWaterfallHook<[string, VarNames]>;
};
/**
 * @param {WebpackCompiler} complier
 */
export function getHooks(complier: WebpackCompiler): MiniCssExtractHooks;
