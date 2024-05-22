"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/**
 * Creates and returns an instance of the API wrapper.
 * @param {string} [apiEndpoint='http://localhost:11434/api/'] - The API endpoint.
 * @param {string} [defaultModel=null] - The default model to use.
 * @returns {API} An instance of the API wrapper.
 */
function createAPI() {
  var apiEndpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http://localhost:11434/api/';
  var defaultModel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return new API(apiEndpoint, defaultModel);
}

/**
 * The default API wrapper instance.
 * @type {API}
 */
var ollama = createAPI();
var _default = exports["default"] = ollama;