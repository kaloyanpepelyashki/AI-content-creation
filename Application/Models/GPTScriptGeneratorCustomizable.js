const GPTScriptGenerator = require("./GPTScriptGenerator");

//This is the class that encapsulates customizable script generative module.
//The class provides a method for generating textual content based on a few parameters, passed as parameters
//The class inherits its properties from the //* GPTScriptGenerator class
class GPTScriptGeneratorCustomizable extends GPTScriptGenerator {
  #modelSystemMessage;
  #model;
  constructor() {
    super();
    this.#modelSystemMessage = super.systemMessage;
    this.#model = super.getGenerativeModel();
  }

  //The method generates a content based on parameters passed as an object.
  //The method expects string parameters for topic of the video, genre, toneOfVoice, targetAudience, narrativeStyle, duration of the video and langauge
  async generateCustomContent(
    topic,
    { genre, toneOfVoice, targetAudience, narrativeStyle, duration, language }
  ) {
    try {
      const result = await this.OpenAIGPT.chat.completions.create({
        messages: [
          {
            role: "system",
            content: this.#modelSystemMessage,
          },
          {
            role: "user",
            content: `Create a script for a short-form video with duration ${duration} seconds, centered around the topic of ${topic} adjusting it to the ${genre} genre. Begin with a captivating hook to immediately engage the viewer. Add a spice to the content, excite the user about the new things they are about to listent to and learn about. Make sure the content is only accurate. Everything you generate must be highly engaging, informative, and tailored to a specific audience. Focus on delivering meaningful and useful quality content. The audinece is ${targetAudience}. The final product, composed by the script generated, must be exciting, interesting, captivating and ${genre}. Use a ${narrativeStyle} and a ${toneOfVoice} tone of voice when composing the text. The script should be structured in a series of scenes, each ending with a "|". For each scene, provide a concise yet engaging and descriptive script. Always apply the formatting. Each scene should be distinct and formatted as follows:
            First state the topic you have selected to generate content about like Topic: the name of the topic, then begin to outline the content of each scene as it follows:
            (Scene X: **Script: Provide a script segment that is engaging, descriptive, informative and captivating. Each script segment for each scene must reveal a unique part of the story told in the video.** | ). Notice, all the contents for each of the scenes must be wrapped in "(" ")". After the scenes, reference three music keywords, that suit the video. Like "[Music: Upbeat, lo-fi, happy]. 
            Remember, the video is a no-face, short-video format, focusing on the narrative and AI-generated visuals to maintain viewer attention throughout. The video script must be in ${language} language`,
          },
        ],
        model: this.#model,
      });
      if (
        result.choices[0].message.content.length &&
        result.choices[0].message.content.length > 0
      ) {
        console.log("Raw Script content: ", result.choices[0].message.content);
        const rawGeneratedContent = this.contentSanitizer.removeWhiteSpaces(
          result.choices[0].message.content
        );

        const musicKeyWords = this.contentExtractor.extractMusicKeywords(
          result.choices[0].message.content
        );
        const scriptContent =
          this.contentExtractor.extractScriptContent(rawGeneratedContent);

        return { musicKeyWords: musicKeyWords, scriptContent: scriptContent };
      } else {
        return null;
      }
    } catch (e) {
      throw new Error(
        "Script generative model failed to generate content: ",
        e.message
      );
    }
  }

  getModelSystemMessage() {
    try {
      return this.#modelSystemMessage;
    } catch (e) {
      throw new Error("Error getting generative model: ", e.message);
    }
  }
  getGenerativeModel() {
    try {
      return this.#model;
    } catch (e) {
      throw new Error("Error getting generative model: ", e.message);
    }
  }

  setGenerativeModel(newModel) {
    if (model.length > 4) {
      this.#model = newModel;
    } else if (newModel.length < 4) {
      throw new Error(
        `Error in Ideas Generator module, not a valid GPT model: ${newModel} Provide a valid GPT model`
      );
    }
  }

  setModelSystemMessage(systemMessage) {
    this.#modelSystemMessage = systemMessage;
  }
}

module.exports = GPTScriptGeneratorCustomizable;
