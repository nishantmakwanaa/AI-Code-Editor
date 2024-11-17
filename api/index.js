const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const { getOllamaResponse } = require("./routes/chatbot");

app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  const response = getOllamaResponse(userMessage);
  res.json({ response });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
