import DataFedModel from "./GPTModelDataFed.mjs";

import ContentSanitizer from "./ContentSanitizer.mjs";
import ContentExtractor from "./ContentExtractor.mjs";
/** This is the class that encapsulates customizable script generative module.
The class provides a method for generating textual content based on a few parameters, passed as parameters 
*/
class GPTScriptGeneratorDataFed {
  #model;
  constructor(dataFilePath) {
    this.#model = new DataFedModel(dataFilePath);
    this.contentExtractor = ContentExtractor;
    this.contentSanitizer = ContentSanitizer;
  }
  /** The method generates a content based on parameters passed as an object with the capability to read data from a text file, passed to the model.
   * The output incorporates the textual information passed to the model in the formm of a text file, together with the generec LLM capabilities
  The method expects string parameters for topic of the video, genre, toneOfVoice, narrativeStyle, duration of the video and langauge. The parameter also takes in a optinal number parameter temperature, which adjusts the temperature of the OpenAI text-generative model */
  async generateCustomContent(
    topic,
    { genre, toneOfVoice, narrativeStyle, duration, language },
    temperature
  ) {
    try {
      const result = await this.#model.create({
        temperature,
        messages: {
          system: {
            message:
              "You are an advanced and imaginative scriptwriting AI with advanced knowledge of technology and electrical engineering, tasked with crafting exceptional and engaging text content(scripts), that will later be transformed into an immersive video content. Your primary directive is to infuse creativity and originality into each script, ensuring that the content is not only captivating but also of the highest quality and only factologically accurate. It is crucial the content to directly target Ebit's target audience and to form personal connection with the viewer as well as to teach them new information, use the relevant information about ebits target audience to do so. Show the ability to understand the target audience by adjusting the generated textual content to fit in their needs. You are to strictly adhere to the guidelines and themes provided, demonstrating a keen understanding of the specified topics and objectives. Your scripts must reflect a deep understanding of storytelling techniques, engaging narrative structures, factology relevant for the topic and the ability to hold an audience's attention. You are to approach each script with a fresh perspective, bringing innovative ideas and unique angles to familiar subjects. Emphasize precision and relevance in your content. Each script should be meticulously tailored to fit the provided brief, leaving no room for generic or off-topic material. You are expected to interpret instructions accurately and apply them effectively, ensuring that the final script aligns perfectly with the desired outcome. Remember, your role is not just to generate scripts, but to craft stories that resonate, inform, and captivate. Quality and creativity are your guiding principles, and every word you write should contribute to a script that stands out for its ingenuity and excellence. Keep in mind that your scripts are a crucial component of a larger creative process, and they should inspire and facilitate the creation of compelling video content. Use the following pieces of context about Ebits to enhance the content you create, include the information only if it's relevant for the content you create. Use the list of keywords, as it is crucial for the SEO. {context}. In addition, always follow the formatting of content required!",
          },
          user: {
            message: `Create a script for a short-form video with duration around ${duration} seconds, centered around the topic of ${topic} adjusting it to the ${genre} genre. Begin with a captivating hook to immediately engage the viewer. Add a spice to the content, excite the user about the new things they are about to listent to and learn about. Make sure the content is only accurate. Everything you generate must be highly engaging, informative, and tailored to a specific audience. Focus on delivering meaningful and useful quality content. Make sure the content is rather technical oriented, providing details and accurate factology about the topic. The core of evey video should be the technical aspect of the topic. Always bring up the technical aspect, as we are targeting a technical audience. The audinece is the tager audience of ebits. The final product, composed by the script generated, must be exciting, interesting, captivating and ${genre}. Use a ${narrativeStyle} narrative style and a ${toneOfVoice} tone of voice when composing the text. The script should be structured in a series of scenes, each ending with a "|". For each scene, provide a concise yet engaging and descriptive script. Always apply the following formatting.Each scene should be distinct and formatted as follows. Formatting: First state the topic you have selected to generate content about like [Topic: the name of the topic], then begin to outline the content of each scene as it follows:
            (Scene [number of scene here]: **Script: script content goes here: Provide a script segment that is engaging, descriptive, informative and captivating. Each script segment for each scene must reveal a unique part of the story told in the video.** | ).
             Notice, all the contents for each of the scenes must be wrapped in "(" ")", also the script starts with "**Script" and ends with **. After all the scenes are listed, reference three music keywords, that suit the video. Like "[Music: Upbeat, lo-fi, happy]. 
            Remember, the video is a no-face, short-video format, focusing on the narrative and AI-generated visuals to maintain viewer attention throughout. The video script must be in ${language} language`,
          },
        },
      });
      if (result) {
        console.log("Raw Script content: ", result);
        const rawGeneratedContent =
          this.contentSanitizer.removeWhiteSpaces(result);

        const musicKeyWords =
          this.contentExtractor.extractMusicKeywords(result);
        const scriptContent =
          this.contentExtractor.extractScriptContent(rawGeneratedContent);

        return { musicKeyWords: musicKeyWords, scriptContent: scriptContent };
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      throw new Error(
        "Data fed script generative model failed to generate content: ",
        e.message
      );
    }
  }

  getModel() {
    return this.#model;
  }
}
export default GPTScriptGeneratorDataFed;
