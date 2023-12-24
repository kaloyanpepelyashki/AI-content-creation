const fs = require("node:fs/promises");

const readFile = async () => {
  try {
    const data = await fs.readFile("VideoScriptNotTrimmed2.txt", "utf8");
    return data.trim();
  } catch (err) {
    console.log(`Error getting data from a file: ${err}`);
    throw err;
  }
};

async function shapeData(data) {
  try {
    const trimmedData = await data;
    const splitArray = trimmedData.split("|");
    let newArray = [];
    splitArray.forEach((element) => {
      let sanitizedElement = element.trim().replace(/\n/g, "");
      newArray.push(sanitizedElement);
    });

    if (newArray.length > 0) {
      return newArray;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

async function parseContent() {
  console.log(await shapeData(readFile()));
}

parseContent();

module.exports = parseContent();
