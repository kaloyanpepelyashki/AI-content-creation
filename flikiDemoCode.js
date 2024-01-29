const axios = require("axios");
require("dotenv").config();

const flikiAPIUrl = "https://api.fliki.ai/v1";
// API key
const API_KEY = process.env.FLIKI_APIKEY; // Get your API key here: https://app.fliki.ai/account/api

// API URL
const API_URL = "https://api.fliki.ai/v1";

// call api
async function api({ method, endpoint, params = null }) {
  try {
    const request = {
      method,
      url: `${API_URL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    };
    if (params) {
      request.data = params;
    }
    const { data } = await axios(request);

    return data ? data.data : null;
  } catch (error) {
    console.log(error);
  }

  return null;
}

(async () => {
  // Get languages
  if (true) {
    const languages = await api({
      method: "get",
      endpoint: "/languages",
    });
    console.log("languages", languages);
  }

  // Get dialects
  if (true) {
    const dialects = await api({
      method: "get",
      endpoint: "/dialects",
    });
    console.log("dialects", dialects);
  }

  // Get voices
  if (true) {
    const voices = await api({
      method: "post",
      endpoint: "/voices",
      params: {
        languageId: "61b8b2f44268666c126babc5", // English
        dialectId: "61b8b3084268666c126bac57", // United States
      },
    });
    console.log("voices", voices);
  }

  // Generate
  if (true) {
    const voiceId = "61b8b45a4268666c126bb32b"; // English, United States, Sara

    const generate = await api({
      method: "post",
      endpoint: "/generate",
      params: {
        format: "video",

        scenes: [
          {
            content:
              "Eating at regular times during the day helps burn calories at a faster rate and reduces the temptation to snack on foods high in fat and sugar.",
            voiceId,
            style: "analog-film",
          },
          {
            content:
              "Fruit and vegetables are low in calories and fat and they also contain plenty of vitamins and minerals.",
            voiceId,
            style: "origami",
          },
        ],

        settings: {
          aspectRatio: "portrait",
          subtitle: {
            fontColor: "yellow",
            backgroundColor: "black",
            placement: "bottom",
            display: "phrase",
          },
        },

        backgroundMusicKeywords: "happy, lofi, beats",
      },
    });

    console.log("generate", generate);

    // next step: use checkStatus(generate.id) for the download link
  }

  // Generate status
  if (true) {
    const checkStatus = async (id) => {
      const status = await api({
        method: "post",
        endpoint: "/generate/status",
        params: { id },
      });

      console.log("status", status);

      if (status && status.status === "processing") {
        await sleep(5);

        return await checkStatus(id);
      }

      return status;
    };

    const sleep = (seconds) => {
      return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    };

    const id = "65a4e6ca7807128f7ce464ef";
    await checkStatus(id);
  }

  // Generate text-to-speech
  if (false) {
    const audio = await api({
      method: "post",
      endpoint: `/generate/text-to-speech`,
      params: {
        content: "Hello, thank you for giving Fliki API a try!",
        voiceId: "61b8b45a4268666c126bb32b", // English, United States, Sara
      },
    });

    console.log("audio", audio);
  }

  // Generate text-to-image
  if (false) {
    const image = await api({
      method: "post",
      endpoint: `/generate/text-to-image`,
      params: {
        content:
          "A close up, studio photographic portrait of a white siamese cat that looks curious",
      },
    });

    console.log("image", image);
  }
})();
