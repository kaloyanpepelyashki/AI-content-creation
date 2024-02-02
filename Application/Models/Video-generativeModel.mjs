import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const apiKey = process.env.FLIKI_APIKEY;

export default class VideoModel {
  #APIKey;
  #URL;
  constructor() {
    this.#APIKey = apiKey;
    this.#URL = "https://api.fliki.ai/v1";
  }

  /** This method contacts the fliki.ai API endpoints */
  async callAPI({ method, endpoint, params = null }) {
    try {
      const request = {
        method,
        url: `${this.#URL}${endpoint}`,
        headers: {
          Authorization: `Bearer ${this.#APIKey}`,
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
      console.log(`Error getting from ${endpoint}. Error: ${e.message}`);
      throw `Error getting from ${endpoint}. Error: ${e.message}`;
    }
  }
}
