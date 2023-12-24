require("dotenv").config();
const OpenAi = require("openai");
const apiKey = process.env.APIKEY;
const fs = require("node:fs/promises");

const aiClient = new OpenAi({
  apiKey: apiKey,
});
const generateVisuals = () => {
  response = aiClient.images.generate(
    (model = "dall-e-2"),
    (prompt = ""),
    (size = ""),
    (quality = "")
  );
};

const getFileContent = async () => {
  try {
    const data = await fs.readFile("videoScriptAndVisuals1Test.txt", "utf8");
    return data.trim();
  } catch (e) {
    console.log(`Error extracting data from file : ${e.message}`);
  }
};

//Sanitizes the array contents
const sanitizeContent = async () => {
  const fileContent = await getFileContent();

  const newArray = fileContent.split("(");

  function sanitize(element) {
    return element.replace(/\n/g, " ");
  }

  let sanitizedArray = newArray.map(sanitize);

  return sanitizedArray;
};

const extractVisuals = async () => {
  function sanitize(element) {
    return element.replace("[Visuals:", " ");
  }
  let sanitizedArray = await sanitizeContent();
  const regex = /\[(.*?)\]/g;

  sanitizedArray.shift();
  console.log("sanitizedArray:", sanitizedArray);

  let visualsArray = [];
  // Use match to find all occurrences of the pattern
  sanitizedArray.forEach((element) => {
    const match = element.match(regex);
    visualsArray.push(match);
  });

  const newvisualsArray = visualsArray.map(sanitize);
  console.log("newvisualsArray:", newvisualsArray);
  return newvisualsArray;
};

const test = async () => {
  const log = await extractVisuals();
  console.log(log);
};

test();
