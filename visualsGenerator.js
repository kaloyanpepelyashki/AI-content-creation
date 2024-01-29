require("dotenv").config();
const OpenAi = require("openai");
const apiKey = process.env.OPENAI_APIKEY;
const fs = require("fs");

const aiClient = new OpenAi({
  apiKey: apiKey,
});

let visualsURLs = [];

const writeToFile = async (URLs) => {
  try {
    const content = URLs.join("\n");

    fs.writeFile("Exports/finaltest/URLs.txt", content, (err) => {
      if (err) {
        console.error("Error writing URLs to file:", err);
      } else {
        console.log(`Data written`);
      }
    });
  } catch (e) {
    console.log("!!======!!");
    console.log("Error writing URLs to file");
  }
};

const generateVisuals = async (promptText) => {
  let response = await aiClient.images
    .generate({
      model: "dall-e-3",
      prompt: `Generate an image for: ${promptText}. The style should be animated`,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    })
    .then((response) => {
      console.log(promptText);
      console.log(`Img url: ${response.data[0].url}`);
      console.log("-------");

      visualsURLs.push(
        `Prompt text: ${promptText} ; URL: ${response.data[0].url}`
      );
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
    //A function to sanitize each of the array items
    function sanitize(element) {
      return element.replace("[Visuals:", " ").replace("]", " ");
    }

    const regex = /\[(.*?)\]/g;

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
  visualsURLs = [];
  console.log(`raw script data : ${rawScriptData}`);
  try {
    let sanitizedData = sanitizeContent(rawScriptData);
    console.log(`Sanitized data in videoGenerator func : ${sanitizedData}`);
    if (sanitizedData != null && sanitizedData.length > 0) {
      let visualsPrompts = extractVisuals(sanitizedData);
      if (visualsPrompts != null && visualsPrompts.length > 0) {
        console.log(`Extracted visuals : ${visualsPrompts}`);

        // visualsPrompts
        //   .forEach((prompt) => {
        //     setTimeout(async () => {
        //       await generateVisuals(prompt);
        //     }, 15000);
        //   })
        //   .then(async () => {
        //     await writeToFile(visualsURLs);
        //   });
        async function processPrompts() {
          for (const prompt of visualsPrompts) {
            await generateVisualsWithDelay(prompt, 10000); // 10-second delay
          }

          // After all prompts are processed, write to file
          await writeToFile(visualsURLs);
        }

        async function generateVisualsWithDelay(prompt, delay) {
          return new Promise((resolve) => {
            setTimeout(async () => {
              await generateVisuals(prompt);
              resolve();
            }, delay);
          });
        }

        // Call the main function
        processPrompts().then(async () => {
          await writeToFile(visualsURLs);
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
