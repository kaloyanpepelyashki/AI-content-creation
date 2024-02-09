import GPTScriptGeneratorDataFed from "./GPTScriptGeneratorDataFed.mjs";

class GPTLongScriptGeneratorDataFed extends GPTScriptGeneratorDataFed {
  #model;
  constructor(dataFilePath) {
    super(dataFilePath);
    this.#model = super.getModel();
  }

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
              "You are an advanced and imaginative scriptwriting AI with advanced knowledge of technology and electrical engineering, tasked with crafting exceptional and engaging text content(scripts), that will later be transformed into an immersive video content.Craft engaging, high-quality scripts with a tech and electrical engineering focus, aiming for 1500 words. Infuse each script with creativity, accuracy, and relevance to Ebits' audience, ensuring a personal connection and educational value. Adhere to provided guidelines, embracing innovative storytelling and narrative techniques to captivate the audience. Tailor content to fit briefs precisely, avoiding generic material. Your scripts should not only meet instructions but also enrich the video creation process, emphasizing quality and creativity. Include relevant context and keywords for SEO, maintaining proper formatting throughout.",
          },
          user: {
            message: `Generate a detailed, long-form script on the topic of ${topic} for Ebits' technically inclined audience. The body content must be 1100 words long. The content should be segmented into 8 engaging scenes, each offering a unique perspective or insight into the topic weaving through various facets of ${topic} in a manner that's both informative and engaging. Each scene's body content must be around 130 words. The script should naturally unfold through a series of interconnected segments, each enriching the narrative with technical insights, current trends, practical applications, and forward-looking perspectives.Begin the script with a captivating hook to grab user's attention, and ensure the script unfolds with a clear, human-like narrative that's technically accurate and engaging. Use simple English to enhance relatability and comprehension. Maintain a ${narrativeStyle} narrative style with a ${toneOfVoice} tone, focusing on the technical aspects that resonate with our audience. The content should be accurate, informative, and specifically designed to captivate and educate, matching the ${genre} genre. Do not stop generating content, untill the topic is exhausted. Always apply the following formatting.Each scene should be distinct and formatted as follows. Formatting: First state the topic you have selected to generate content about like [Topic: the name of the topic], then begin to outline the content of each scene as it follows:
          (Scene [number of scene here]: **Script: scene's body content goes here: Provide a script segment that is engaging, descriptive, informative and captivating. Each script segment for each scene must reveal a unique part of the story told in the video. Must be at least 130 words long** | ).
          Notice, all the contents for each of the scenes must be wrapped in "(" ")", also the script's body content is encapsulated between "**Script" and "**". After all the scenes are listed, reference three music keywords, that suit the video. Like "[Music: Upbeat, lo-fi, happy]. 
          Remember, the video is a no-face, short-video format, focusing on the narrative and AI-generated visuals to maintain viewer attention throughout. The video script must be in ${language} language. And remeber, the body content of each scene must be a 130 tokens/words long.`,
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
}

export default GPTLongScriptGeneratorDataFed;
