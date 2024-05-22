/**
 * Creates and returns an instance of the API wrapper.
 * @param {string} [apiEndpoint='http://localhost:11434/api/'] - The API endpoint.
 * @param {string} [defaultModel=null] - The default model to use.
 * @returns {API} An instance of the API wrapper.
 */
function createAPI(apiEndpoint = 'http://localhost:11434/api/', defaultModel = null) {
    return new API(apiEndpoint, defaultModel);
}

/**
 * The default API wrapper instance.
 * @type {API}
 */
const ollama = createAPI();

export default ollama;
