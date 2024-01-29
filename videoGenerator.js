//Libraries
require("dotenv").config();
const { Configuration, OpenAi } = require("openai");
const axios = require("axios");
//Env variables

const flikiAPIKey = process.env.FLIKI_APIKEY;
const flikiAPIUrl = "https://api.fliki.ai/v1";

const language = "61b8b2f54268666c126babc9";
const dialect = "61b8b3084268666c126bac57";

async function callApi({ method, endpoint, params = null }) {
  console.log(flikiAPIKey);
  try {
    const request = {
      method,
      url: `${flikiAPIUrl}${endpoint}`,
      headers: {
        Authorization: `Bearer ${flikiAPIKey}`,
        "Content-Type": "application/json",
      },
    };
    if (params) {
      request.data = params;
    }

    const { data } = await axios(request);

    console.log(`Data in callApi method for ${endpoint}: ${data}`);
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(`Error getting from ${endpoint}. Error: ${e}`);
    throw `Error getting from ${endpoint}. Error: ${e}`;
  }
}

const checkStatus = async (id) => {
  const delay = (seconds) => {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  };

  try {
    if (id && id.length > 0) {
      const status = await callApi({
        method: "post",
        endpoint: "/generate/status",
        params: { id },
      });

      console.log("status :", status);

      if (status && status.status === "processing") {
        await delay(5);

        return await checkStatus(id);
      } else if (status && status.status === "queued") {
        await delay(5);

        return await checkStatus(id);
      }
      return status;
    } else {
      console.log("Couldn't check status; Id is empty");
    }
  } catch (e) {
    console.log("Error checking status: ", e);
  }
};

const videoGenerator = async (videoScript, musicKeyWords) => {
  try {
    const voiceId = "61b8b45a4268666c126bb32b";
    const generate = await callApi({
      method: "post",
      endpoint: "/generate",
      params: {
        format: "video",

        scenes: videoScript.map((scene) => {
          return { content: scene, voiceId, image: "neon-punk" };
        }),

        settings: {
          aspectRatio: "portrait",
          style: "neon-punk",
          subtitle: {
            fontColor: "yellow",
            backgroundColor: "black",
            placement: "bottom",
            display: "phrase",
          },
        },

        backgroundMusicKeywords: musicKeyWords,
      },
    });
    console.log("generated id: ", generate.data.id);
    await checkStatus(generate.data.id);
  } catch (e) {
    console.log("Error generating video: ", e);
  }
};

module.exports = videoGenerator;
