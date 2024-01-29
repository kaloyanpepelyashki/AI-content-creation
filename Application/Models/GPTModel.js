require("dotenv").config();
const OpenAi = require("openai");
const apiKey = process.env.OPENAI_APIKEY;
const fs = require("fs");

class GPTModel {
  APIKey;
  OpenAiGPT;
  constructor() {
    this.APIKey = apiKey;
    this.OpenAiGPT = new OpenAi({
      apiKey: apiKey,
    });
  }
  getAPIKey() {
    return this.APIKey;
  }
  getGPT() {
    return this.OpenAiGPT;
  }
}

module.exports = GPTModel;
