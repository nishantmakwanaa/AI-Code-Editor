const express = require("express");
const cors = require("cors");
const app = express();

const { getOllamaResponse } = require("./routes/chatbot");

app.use(cors());
app.use(express.json());

app.post("/api/chat", (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }
  const response = getOllamaResponse(userMessage);
  res.json({ response });
});

module.exports = app;