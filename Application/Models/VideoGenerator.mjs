import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

/** A class that provides access point to the fliki.ai video generative model. The class serves the purpose of providing an entry point to a video-generative model
 * Behind the scenes the class contacts the fliki.ai API endpoints for passing textual content that is to be transformed into a video content
 */
class VideoGenerator {
  #APIKey;
  #URL;
  constructor() {
    this.#APIKey = process.env.FLIKI_APIKEY;
    this.#URL = "https://api.fliki.ai/v1";
  }

  //This method contacts the fliki.ai API endpoints
  //The method may and is only used whithin this class' members
  async #callAPI({ method, endpoint, params = null }) {
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

  //This method checks the status of the genrated video.
  //Can only be used if a video ID is present
  async checkStatus(id) {
    const delay = (seconds) => {
      return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
      });
    };
    try {
      if (id && id.length > 0) {
        const status = await this.#callAPI({
          method: "post",
          endpoint: "/generate/status",
          params: { id },
        });

        if (status && status.status === "processing") {
          delay(6);
          return await this.checkStatus(id);
        }
        if (status && status.status === "queled") {
          delay(6);
          return await this.checkStatus(id);
        } else {
          return status;
        }
      } else {
        console.log("Couldn't check status, id is empty");
      }
    } catch (e) {
      console.log("Error checking status of generated video: ", e.message);
      throw new Error("Error checking status of generated video: ", e.message);
    }
  }

  //Generates a video
  async generateVideo(videoScript, musicKeywords) {
    try {
      const voiceId = "64ea1f53310bccff6a419175"; //Brigitte, Danish
      const generate = await this.#callAPI({
        method: "post",
        endpoint: "/generate",
        params: {
          format: "video",

          scenes: videoScript.map((scene) => {
            return { content: scene, voiceId };
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

          backgroundMusicKeywords: musicKeywords,
        },
      });
      console.log("generate ", generate);
      return await this.checkStatus(generate.data.id);
    } catch (e) {
      console.log("Error generating video: ", e.message);
      throw new Error("Error generating video: ", e);
    }
  }
}

export default VideoGenerator;
