/** @typedef {import("webpack").Compiler} WebpackCompiler */
/**
 * @typedef {Object} VarNames
 * @property {string} tag
 * @property {string} chunkId
 * @property {string} href
 * @property {string} resolve
 * @property {string} reject
 */
/**
 * @typedef {Object} MiniCssExtractHooks
 * @property {import("tapable").SyncWaterfallHook<[string, VarNames]>} beforeTagInsert
 */

const { SyncWaterfallHook } = require("tapable");

/**
 * @type {WeakMap<WebpackCompiler, MiniCssExtractHooks>}}
 */
const miniCssExtractHooksMap = new WeakMap();

/**
 * @param {WebpackCompiler} complier
 */
function getHooks(complier) {
  let hooks = miniCssExtractHooksMap.get(complier);
  // Setup the hooks only once
  if (!hooks) {
    hooks = createHooks();
    miniCssExtractHooksMap.set(complier, hooks);
  }
  return hooks;
}

/**
 * @returns {MiniCssExtractHooks}
 */
function createHooks() {
  return {
    beforeTagInsert: new SyncWaterfallHook(["source", "varNames"]),
  };
}

module.exports = {
  getHooks,
};
