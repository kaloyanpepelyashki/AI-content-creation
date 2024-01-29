const GPTIdeasGenerator = require("./Models/GPTIdeasGenerator");
const GPTScriptGenerator = require("./Models/GPTScriptGenerator");
const VideoGenerator = require("./Models/VideoGenerator");

const ContentSanitizer = require("./Models/ContentSanitizer");

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

module.exports = main;
