require("dotenv").config();
const axios = require("axios");

const flikiAPIKey = process.env.FLIKI_APIKEY;
const flikiAPIUrl = "https://api.fliki.ai/v1";

async function api({ method, endpoint, params = null }) {
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

    return data ? data.data : null;
  } catch (error) {
    console.log(error);
  }

  return null;
}

const main = async () => {
  // Get languages
  const languages = await api({
    method: "get",
    endpoint: "/languages",
  });
  console.log(languages);

  // Get dialects
  const dialects = await api({
    method: "get",
    endpoint: "/dialects",
  });
  console.log("dialects", dialects);

  // Get voices
  const voices = await api({
    method: "post",
    endpoint: "/voices",
    params: {
      languageId: "61b8b2f54268666c126babc9", // English
      dialectId: "61b8b31c4268666c126bace7", // United States
    },
  });
  console.log("voices", voices);
};

main();
