const express = require("express");
const cors = require("cors");
const chatRouter = require("./routes/chat");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("Chat-Bot Backend Is Running !");
});

app.listen(port, () => {
  console.log(`Server Is Running On Port : ${port}`);
});