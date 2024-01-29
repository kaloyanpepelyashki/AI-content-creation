const GPTModel = require("./GPTModel");
const ContentExtractor = require("./ContentExtractor");
const ContentSanitizer = require("./ContentSanitizer");

//This is the class that encapsulates a generic script generative module
//The class provides a method for generating a generic textual content, based on pre-set prompt message
//The class inherits its properties from the //* GPTModel class
class GPTScriptGenerator extends GPTModel {
  #model;
  constructor() {
    super();
    this.contentExtractor = ContentExtractor;
    this.contentSanitizer = ContentSanitizer;
    this.#model = "gpt-4";
    this.systemMessage = `You are an advanced and imaginative scriptwriting AI, tasked with crafting exceptional and engaging video scripts. Your primary directive is to infuse creativity and originality into each script, ensuring that the content is not only captivating but also of the highest quality. You are to strictly adhere to the guidelines and themes provided, demonstrating a keen understanding of the specified topics and objectives.Your scripts must reflect a deep understanding of storytelling techniques, engaging narrative structures, and the ability to hold an audience's attention. You are to approach each script with a fresh perspective, bringing innovative ideas and unique angles to familiar subjects.Emphasize precision and relevance in your content. Each script should be meticulously tailored to fit the provided brief, leaving no room for generic or off-topic material. You are expected to interpret instructions accurately and apply them effectively, ensuring that the final script aligns perfectly with the desired outcome.Remember, your role is not just to generate scripts, but to craft stories that resonate, inform, and captivate. Quality and creativity are your guiding principles, and every word you write should contribute to a script that stands out for its ingenuity and excellence. Keep in mind that your scripts are a crucial component of a larger creative process, and they should inspire and facilitate the creation of compelling video content`;
  }

  //The following method generates a more generic content, based on the pre-set prompt message below.
  async generateContent(ideas) {
    try {
      const result = await this.OpenAiGPT.chat.completions.create({
        messages: [
          {
            role: "system",
            content: this.systemMessage,
          },
          {
            role: "user",
            content: `Create a script for a short-form video of 60-75 seconds centered around a randomly selected topic from the following video ideas ${ideas}. Begin with a captivating hook to immediately engage the viewer. Add a spice to the content, excite the user about the new things they are about to listent to and learn about. Make sure the content is only accurate. Everything you generate must be  that highly engaging, informative, and tailored to a specific audience. Focus on delivering meaningful and useful content. The audinece is people interested in tech and more specifically electronics When teaching them tips and tricks or "how to...", make sure the content is applicable in real life. Also make sure, the visuals generated corespond to the text content. The final product, composed by the script generated, must be exciting, interesting, captivating. The script should be structured in a series of scenes, each ending with a "|". For each scene, provide a concise yet engaging and descriptive script and a detailed description of the corresponding visuals.The visual descriptions must be enclosed between '[Visuals:' and ']', positioned before the script for each scene. These descriptions should be highly detailed, focusing on color schemes, shapes, and specific compositions to facilitate high-fidelity image generation by DALL-E. Provide more specific keywords to guide DALL-E 3 to produce precisely what is needed. Use descriptive adjectives in the prompt to help you achieve specificity. The style for the visuals is 'vector artwork'. Ensure that the visuals are descriptive, visually appealing, and directly relevant to the content of the scene. Adding layers to the description would significantly improve the response. Avoid suggesting visuals that contain elements DALL-E cannot interpret from the text alone. Always apply the formatting. Each scene should be distinct and formatted as follows:
            First state the topic you have selected to generate content about like Topic: the name of the topic, then begin to outline the content of each scene as it follows:
            (Scene X: [Visuals: Describe the visuals in rich detail, emphasizing color, shape, and composition. Use descriptive adjectives in the prompt to help you achieve specificity. The visuals should complement the script] **Script: Provide a script segment that is engaging, descriptive, informative and captivating. Each script segment for each scene must reveal a unique part of the story told in the video.** | ). Notice, all the contents for each of the scenes must be wrapped in "(" ")". After the scenes, reference three music keywords, that suit the video. Like "[Music: Upbeat, lo-fi, happy]. 
            Remember, the video is a no-face, short-video format, focusing on the narrative and AI-generated visuals to maintain viewer attention throughout`,
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
        "Ideas Generator module failed to generate ideas: ",
        e.message
      );
    }
  }

  setGenerativeModel(model) {
    if (model.length > 4) {
      this.#model = model;
    } else if (model.length < 4) {
      throw new Error(
        `Error in Ideas Generator module, not a valid GPT model: ${model} Provide a valid GPT model`
      );
    }
  }
}

module.exports = GPTScriptGenerator;
