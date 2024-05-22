/**
 * A wrapper class for interacting with the Ollama API.
 */
class OllamaAPIWrapper {
    /**
     * Creates an instance of OllamaAPIWrapper.
     * @param {string} [apiEndpoint='http://localhost:11434/api/'] - The API endpoint.
     * @param {string} [defaultModel=null] - The default model to use.
     */
    constructor(apiEndpoint = 'http://localhost:11434/api/', defaultModel = null) {
        this.apiEndpoint = apiEndpoint;
        this.defaultModel = defaultModel;
    }

    /**
     * Lists available models.
     * @returns {Promise<Array<string>>} A promise that resolves to an array of available models.
     */
    async getAvailableModels() {
        const response = await fetch(`${this.apiEndpoint}tags`);
        const data = await response.json();
        return data.models.map(modelInfo => modelInfo.name);
    }

    /**
     * Generates a response for a given prompt with a provided model.
     * @param {string} prompt - The prompt to generate a response for.
     * @param {string} [model] - The model to use.
     * @returns {Promise<string>} A promise that resolves to the generated text block.
     */
    async getResponse(prompt, model) {
        try {
            const availableModels = await this.getAvailableModels();
            const selectedModel = model || this.defaultModel;
            if (!prompt) {
                throw new Error('Prompt is required.');
            }

            if (!availableModels.includes(selectedModel)) {
                throw new Error(`Model ${selectedModel} is not available. Available models are: ${availableModels.join(', ')}`);
            }

            const payload = {
                model: selectedModel,
                prompt: prompt
            };

            const response = await fetch(`${this.apiEndpoint}generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const reader = response.body.getReader();
            let text = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                text += new TextDecoder().decode(value);
            }

            return text;

        } catch (error) {
            console.error('Failed to get a response:', error);
            throw error;
        }
    }

    /**
     * Creates a model.
     * @param {string} name - The name of the model to create.
     * @param {string} path - The path to the Modelfile.
     * @returns {Promise<Object>} A promise that resolves to the API response.
     */
    async createModel(name, path) {
        const response = await fetch(`${this.apiEndpoint}create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, path }),
        });
        return await response.json();
    }

    /**
     * Pulls a model from the Ollama library.
     * @param {string} name - The name of the model to pull.
     * @param {boolean} [insecure=false] - Whether to allow insecure connections.
     * @returns {Promise<Object>} A promise that resolves to the API response.
     */
    async pullModel(name, insecure = false) {
        const response = await fetch(`${this.apiEndpoint}pull`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, insecure }),
        });
        return await response.json();
    }

    /**
     * Copies a model.
     * @param {string} source - The source model name.
     * @param {string} destination - The destination model name.
     * @returns {Promise<Object>} A promise that resolves to the API response.
     */
    async copyModel(source, destination) {
        const response = await fetch(`${this.apiEndpoint}copy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source, destination }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to copy model: ${response.statusText}, ${errorText}`);
        }

        // Since the server doesn't return a body on success, 
        // just return a success message or the status code.
        return { status: 'success', code: response.status };
    }


    /**
     * Deletes a model.
     * @param {string} modelName - The model name to delete.
     * @returns {Promise<Object>} A promise that resolves to the API response.
     */
    async deleteModel(modelName) {
        const response = await fetch(`${this.apiEndpoint}delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: modelName })
        });
    
        if (response.status === 200) {
            return { status: 'success', code: response.status };
        } else {
            console.error('Unexpected response status:', response.status);
            throw new Error(`Failed to delete model: ${response.statusText}`);
        }
    }    
}

export default OllamaAPIWrapper;
