require("dotenv").config();
const OpenAi = require("openai");
const apiKey = process.env.OPENAI_APIKEY;
const fs = require("fs");

class GPTModel {
  #APIKey;
  #OpenAiGPT;
  #model;
  constructor() {
    this.#APIKey = apiKey;
    this.#OpenAiGPT = new OpenAi({
      apiKey: this.#APIKey,
    });
    this.#model = "gpt-4";
  }
  getAPIKey() {
    return this.#APIKey;
  }
  getGPT() {
    return this.#OpenAiGPT;
  }

  getGPTModel() {
    return this.#model;
  }
}

module.exports = GPTModel;
