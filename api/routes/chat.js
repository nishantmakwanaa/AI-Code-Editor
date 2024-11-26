const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const dataPath = path.join(__dirname, "data.json");
let chatData = {};

fs.readFile(dataPath, "utf-8", (err, data) => {
  if (err) {
    console.error("Error Reading data.json:", err);
    chatData = {};
  } else {
    chatData = JSON.parse(data);
  }
});

router.post("/", (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question Is Required." });
  }

  const normalizedQuestion = question.toLowerCase().trim();

  let answer = "Sorry, I Don't Know The Answer.";
  for (const category in chatData) {
    if (chatData[category][normalizedQuestion]) {
      answer = chatData[category][normalizedQuestion];
      break;
    }
  }

  res.json({ question, answer });
});

module.exports = router;