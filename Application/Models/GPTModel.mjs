import dotenv from "dotenv";
import OpenAi from "openai";

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;

class GPTModel {
  /**The OpenAI secret API key, used to access the OpenAI model endpoints */
  #APIKey;
  /**The OpenAI object */
  #OpenAiGPT;
  /**The OpenAI model to be used by the OpenAI object */
  #model;
  constructor() {
    this.#APIKey = apiKey;
    this.#OpenAiGPT = new OpenAi({
      apiKey: this.#APIKey,
    });
    this.#model = "gpt-4";
  }
  /**Returns the OpenAI secret API key */
  getAPIKey() {
    return this.#APIKey;
  }
  /**Returns the OpenAI object */
  getGPT() {
    return this.#OpenAiGPT;
  }
  /**Returns the model used by the OpenAI object */
  getGPTModel() {
    return this.#model;
  }
}

export default GPTModel;
