import GPTScriptGeneratorCustomizable from "./Models/GPTScriptGeneratorCustomizable.mjs";
import VideoGenerator from "./Models/VideoGenerator.mjs";

const main = async () => {
  const customContentGenerator = new GPTScriptGeneratorCustomizable();
  const videoGenerator = new VideoGenerator();

  const content = await customContentGenerator.generateCustomContent(
    "Is our phone actually radioactive",
    {
      genre: "informative",
      toneOfVoice: "enthusiastic",
      targetAudience: "tech savyies and everyday phone users",
      narrativeStyle: "direct",
      duration: "65-75",
      language: "english",
    }
  );

  const generatedVideoMaterial = await videoGenerator.generateVideo(
    content.scriptContent,
    content.musicKeyWords
  );

  return generatedVideoMaterial;
};

main();
