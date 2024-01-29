const fs = require("node:fs/promises");
const videoGenerator = require("./videoGenerator.js");

async function extractFromFile() {
  try {
    console.log("in extractFromFile");
    const data = await fs.readFile("Exports/finaltest/script.txt", "utf8");
    const splitData = data.split("\n");
    console.log("split data: ", splitData);
    return splitData;
  } catch (e) {
    console.log("Error reading from file: ", e);
  }
}

const main = async () => {
  try {
    const script = await extractFromFile();

    videoGenerator(script);
  } catch (e) {
    console.log("Error: ", e);
  }
};

main();
