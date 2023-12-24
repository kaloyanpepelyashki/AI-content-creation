require("dotenv").config();
const OpenAi = require("openai");
const apiKey = process.env.APIKEY;
const fs = require("fs");

const parseContent = require("./reader.js");

const openAi = new OpenAi({
  apiKey: apiKey,
});

function sanitizeInput(dirtyInput) {
  try {
    let sanitizedOutput = dirtyInput.trim().replace(/\n/g, "");

    console.log(`Sanitized output first itereation: ${sanitizedOutput}`);

    return sanitizedOutput;
  } catch (e) {
    console.log(`Error accessing content from fitst attempt error: ${e}`);
  }
}

const writeToFile = (content, purpose) => {
  try {
    fs.writeFile(`video${purpose}.txt`, content, function (err) {
      if (err) {
        throw err;
      } else {
        console.log("Script saved to fle");
      }
    });
  } catch (e) {
    console.log(`Error writing to file : ${e}`);
  }
};

async function main() {
  let request;
  try {
    request = await openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpfull marketing and content creation expert. You will assist a small company with a marketing campaign taking place in instagram. The company that would benefit from the marketing campaign is a small electronics retailer based in Denmark. The company's primary goal is to attract more customers to the web shop of theirs and also to the community. Prioritize ideas that maximize engagement metrics like views, likes, shares, and comments. Aim to increase brand interest and drive traffic to the webshop.",
        },
        {
          role: "user",
          content:
            "Generate a list of ideas for short-format videos on the topic of electronics, electronics developemnt, embedded development and software development. Keep in mind the visuals for the videos will be created with the use of AI. The video must be no-face video.",
        },
      ],
      model: "gpt-4",
    });

    writeToFile(request.choices[0].message.content, "Ideas");
    let sanitizedOutputFirst = sanitizeInput(
      request.choices[0].message.content
    );

    try {
      const requestSecond = await openAi.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a helpful content creation and video creation expert, you are also a very skilled script writer. You will assist a small company with a marketing campaign taking place on Instagram. The company that would benefit from the marketing campaign is a small electronics retailer based in Denmark. The company's primary goal is to attract more customers to their webshop and also to the community.",
          },
          {
            role: "user",
            content: `Pick a random topic form the choices and generate a script that will serve a short-form video. Start with a hook to quickly grab the user's attention and compose the content in a way, that it holds user's attention for as long as possible. The video must not be longer than 45-50 seconds. Keep in mind the visuals for the videos will be created with the use of AI and not recorded. The video must be no-face video. The script for each scene must end with "|". The visuals for each scene must be described between "[Visuals:" and " ]" and must come before the script for the scene. Describe the visuals in a way DAll-E model can understand you. The definition of each scene (script: , visuals: ) must be wrapped between "(" and ")". Don't forget to mention which scene it is whithin the "()". Choices: ${sanitizedOutputFirst}`,
          },
        ],
        model: "gpt-4",
      });

      console.log(`Second output (Video Script): ${requestSecond.choices[0]}`);

      writeToFile(
        requestSecond.choices[0].message.content,
        "ScriptAndVisuals1Test"
      );

      parseContent();
    } catch (e) {
      console.log(`Error generating content second iteration: ${e}`);
    }
  } catch (e) {
    console.log(`Error prompting : ${e}`);
  }
}

main();
