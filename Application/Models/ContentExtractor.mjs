/** This class ecapsulates the two main methods for extracting content from a big text
 * The mmethods of this class are declared as static, therefore the class can't be instantiated
 */
class ContentExtractor {
  constructor() {}

  /** This method is specifically designed to extract formatted music keywords from big chunks of text whithin a special format*/
  static extractMusicKeywords(content) {
    try {
      const regEx = /\[Music:(.*?)\]/;

      let musicContent = content.match(regEx);

      if (musicContent.length > 0) {
        let musicKeywords = musicContent[1];
        return musicKeywords.trim(" ");
      } else {
        return null;
      }
    } catch (e) {
      console.log("Error extracting music: ", e);
    }
  }
  /** This method is specifically designed to extract formatted script content from big chunks of text */
  static extractScriptContent(content) {
    const extractScript = (textContent) => {
      try {
        //Function to sanitize each of the array elements
        function sanitize(element) {
          return element.replace("**Script:", "").replace("**", "");
        }

        const regex = /\*\*(.*?)\*\*/g;

        let scriptArray = [];
        textContent.forEach((element) => {
          const match = element.match(regex);

          if (match) {
            scriptArray.push(match.join(" "));
          }
        });

        const scriptsExtracted = scriptArray.map(sanitize);

        if (scriptsExtracted.length > 0) {
          return scriptsExtracted;
        } else {
          console.log("scripts are empty");
          return null;
        }
      } catch (e) {
        console.log(`Error extracting script : ${e}`);
      }
    };

    const script = extractScript(content);

    if (script != null) {
      if (script.length > 0 && script != null) {
        console.log(script);
        return script;
      } else {
        console.log("Null is returned for script");
        return null;
      }
    } else {
      console.log("script is null");
    }
  }
}

export default ContentExtractor;
