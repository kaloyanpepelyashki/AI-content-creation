import VideoModel from "./Video-generativeModel.mjs";

export default class SpeechGenerator extends VideoModel {
  constructor() {
    super();
  }

  async generateTextToSpeech(textContent) {
    try {
      const response = await super.callAPI({
        method: "post",
        endpoint: "/generate/text-to-speech",
        params: {
          content: textContent,
          voiceId: "64ea1f53310bccff6a419175",
        },
      });

      return response;
    } catch (e) {
      console.log("Error generatig audio: " + e.message);
    }
  }
}
