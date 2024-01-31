import GPTIdeasGenerator from "./Models/GPTIdeasGenerator";
import GPTScriptGenerator from "./Models/GPTScriptGenerator";
import VideoGenerator from "./Models/VideoGenerator.mjs";

import ContentSanitizer from "./Models/ContentSanitizer.mjs";

const main = async () => {
  //The text content generators
  const ideasGenerator = new GPTIdeasGenerator();
  const scriptGenerator = new GPTScriptGenerator();

  const ideas = ContentSanitizer.removeWhiteSpaces(
    await ideasGenerator.generateIdeasForTopic("Software Development")
  );
  const scriptContent = await scriptGenerator.generateContent(ideas);

  const videoGenerator = new VideoGenerator();

  const video = await videoGenerator.generateVideo(
    scriptContent.scriptContent,
    scriptContent.musicKeyWords
  );

  return video;
};
//! Remove in production
main();
