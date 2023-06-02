const express = require("express");
const cors = require("cors");
const path = require("path");



const app = express();
const memoriesController = require("./controllers/memoriesController");
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/Users/shaniquacoston/Pursuit/module-4/fullstack/welcome-to-the-family/wttf-frontend/public/assets"), { maxAge: 3600000 }));

app.get("/", (req, res) => {
  res.send("Welcome To The Family!");
});

app.use("/memories", memoriesController);

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
