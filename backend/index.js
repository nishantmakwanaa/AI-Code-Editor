const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const port = 3000;

// Import the chatbot module
const { getOllamaResponse } = require('./routes/chatbot');

app.use(cors()); // Enable CORS
app.use(express.json());

// /chat route to interact with the Ollama model
app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const response = getOllamaResponse(userMessage);
  res.json({ response });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
