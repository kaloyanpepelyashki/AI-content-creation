require("dotenv").config();
const OpenAi = require("openai");
const apiKey = process.env.APIKEY;

const aiClient = new OpenAi({
  apiKey: apiKey,
});

const generateVisuals = async (promptText) => {
  let response = await aiClient.images
    .generate({
      model: "dall-e-3",
      prompt: `Generate an image for: ${promptText}. The style should be animated`,
      size: "1024x1024",
      n: 1,
    })
    .then((response) => {
      console.log(promptText);
      console.log(`Img url: ${response.data[0].url}`);
      console.log("-------");
    })
    .catch((e) => {
      console.log(`Error generating visuals : ${e}`);
    });
};
//Sanitizes the array contents
const sanitizeContent = (dataToSanitize) => {
  // const fileContent = await getFileContent();

  try {
    console.log(`Data to sanitize : ${dataToSanitize}`);
    const newArray = dataToSanitize.split("(");

    function sanitize(element) {
      return element.replace(/\n/g, " ");
    }

    let sanitizedArray = newArray.map(sanitize);

    if (sanitizedArray.length > 1 && sanitizedArray != null) {
      return sanitizedArray;
    } else {
      console.log("sanitizedArray is empty");
      return null;
    }
  } catch (e) {
    console.log(`Error sanitizing content : ${e}`);
  }
};

const extractVisuals = (content) => {
  try {
    function sanitize(element) {
      return element.replace("[Visuals:", " ").replace("]", " ");
    }
    // let sanitizedArray = await sanitizeContent();
    const regex = /\[(.*?)\]/g;

    // sanitizedArray.shift();
    console.log("sanitizedArray:", content);

    let visualsArray = [];
    // Use match to find all occurrences of the pattern
    content.forEach((element) => {
      const matches = element.match(regex);
      if (matches) {
        visualsArray.push(matches.join(" "));
      }
    });

    const newVisualsArray = visualsArray.map(sanitize);

    if (newVisualsArray.length > 0) {
      return newVisualsArray;
    } else {
      console.log("newVisualsArray is empty");
      return null;
    }
  } catch (e) {
    console.log(`Error extracting visuals : ${e}`);
    return null;
  }
};

async function videoGenerator(rawScriptData) {
  // const visuals = await extractVisuals();
  // generateVisuals(visualsToGenerate[0]);
  console.log(`raw script data : ${rawScriptData}`);
  try {
    let sanitizedData = sanitizeContent(rawScriptData);
    console.log(`Sanitized data in videoGenerator func : ${sanitizedData}`);
    if (sanitizedData != null && sanitizedData.length > 0) {
      let visualsPrompts = extractVisuals(sanitizedData);
      if (visualsPrompts != null && visualsPrompts.length > 0) {
        console.log(`Extracted visuals : ${visualsPrompts}`);
        visualsPrompts.forEach((prompt) => {
          setTimeout(async () => {
            await generateVisuals(prompt);
          }, 2000);
        });
      } else {
        console.log("Error with visualsPrompts array");
        console.log(`visualsPrompts array : ${visualsPrompts}`);
        return null;
      }
    } else {
      console.log("Error with sanitizedData");
      console.log(`sanitizedData : ${sanitizedData}`);
      return null;
    }
  } catch (e) {
    console.log(`Error in video generation module : ${e}`);
  }
}

module.exports = videoGenerator;
