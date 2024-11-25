const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const qaPairs = {
  "What is JavaScript?":
    "JavaScript is a programming language used for web development.",
  "What is React?":
    "React is a JavaScript library for building user interfaces.",
  "What is Node.js?":
    "Node.js is a runtime environment that allows you to run JavaScript on the server.",
  "How do I deploy an app?":
    "You can deploy an app using platforms like Vercel, Render, or AWS.",
};

app.post("/chat", (req, res) => {
  const { question } = req.body;

  const answer = qaPairs[question] || "Sorry, I Don't Know The Answer To That.";
  res.json({ question, answer });
});

app.get("/", (req, res) => {
  res.send("Chat-Bot Backend Is Running !");
});

app.listen(port, () => {
  console.log(`Server Is Running On Port : ${port}`);
});