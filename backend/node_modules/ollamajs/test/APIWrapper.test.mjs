import OllamaAPIWrapper from '../src/APIWrapper.mjs';

let availableModels = [];

beforeAll(async () => {
    const api = new OllamaAPIWrapper();
    availableModels = await api.getAvailableModels();
    console.log('Available models: ', availableModels);
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(Array.isArray(availableModels)).toBe(true);
    expect(availableModels.length).toBeGreaterThan(0);
});

test('constructor initializes properties correctly', () => {
    const apiEndpoint = 'http://localhost:11434/api/';
    const defaultModel = availableModels[0];  // Use the first available model
    const api = new OllamaAPIWrapper(apiEndpoint, defaultModel);
    expect(api.apiEndpoint).toBe(apiEndpoint);
    expect(api.defaultModel).toBe(defaultModel);
});

test(`getResponse returns text for a given prompt with first model: ${availableModels[0]}`, async () => {
    const api = new OllamaAPIWrapper();
    const prompt = 'Suggest me a book to read';
    const response = await api.getResponse(prompt, availableModels[0]);
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
}, 
20000);

test(`getResponse returns text for a given prompt with second model: ${availableModels[1]}`, async () => {
    const api = new OllamaAPIWrapper();
    const prompt = 'Suggest me a book to read';
    const response = await api.getResponse(prompt, availableModels[1]);
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
}, 
30000);

test('getResponse throws an error if prompt is not provided', async () => {
    const api = new OllamaAPIWrapper();
    const prompt = '';
    await expect(api.getResponse(prompt)).rejects.toThrow('Prompt is required.');
},
30000);

test('getResponse throws an error if model is not available', async () => {
    const api = new OllamaAPIWrapper();
    const prompt = 'Suggest me a book to read';
    const model = 'notAvailableModel';
    await expect(api.getResponse(prompt, model)).rejects.toThrow(`Model ${model} is not available. Available models are: ${availableModels.join(', ')}`);
},
20000);

test('Copy Model and verify against available models', async () => {
    const api = new OllamaAPIWrapper();
    const originalModels = await api.getAvailableModels();
    const newModelName = 'newTestModel';

    // Copy the model
    await api.copyModel(availableModels[0],newModelName);

    // Get the updated list of models
    const updatedModels = await api.getAvailableModels();

    // Ensure the new model is in the updated list
    expect(updatedModels).toEqual(expect.arrayContaining([...originalModels, newModelName + ":latest"]));
},
20000);

test('Delete Model and verify against available models', async () => {
    const api = new OllamaAPIWrapper();
    const modelToDelete = 'newTestModel';

    // Delete the model
    await api.deleteModel(modelToDelete);

    // Get the updated list of models
    const updatedModels = await api.getAvailableModels();

    // Ensure the deleted model is not in the updated list
    expect(updatedModels).not.toContain(modelToDelete);
},
20000);


afterAll(() => {
    console.error.mockRestore();
});
