const express = require("express");

const generativeModule = require("./generativeModule");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world, that's a content-creation system");
});

app.get("/generateContent", async (req, res) => {
  const module = generativeModule;
  const generationOutput = await module();
  res.send(generationOutput);
});

app.listen(port, () => {
  console.log(`Application is up on port: ${port}`);
});
