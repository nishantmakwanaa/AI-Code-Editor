# OllamaJS

A JavaScript wrapper for the Ollama API.

## Installation

```bash
npm install ollamajs
```

## Usage

```javascript
import ollama from 'OllamaJS';

const prompt = 'Suggest me a book to read';
const response = ollama.getResponse(prompt);
console.log(response);
```

## Testing

Run tests with the following command:

```bash
npm test
```

## License

This project is licensed under the [Creative Commons CC0 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/).
