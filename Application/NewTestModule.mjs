import GPTScriptGeneratorDataFed from "./Models/GPTScriptGeneratorDataFed.mjs";
import VideoGenerator from "./Models/VideoGenerator.mjs";

const main = async () => {
  const scriptGenerator = new GPTScriptGeneratorDataFed("./Data/ebitsData.txt");
  const videoGenerator = new VideoGenerator();

  const scriptContent = await scriptGenerator.generateCustomContent(
    "The invetion of BlueTooth",
    {
      genre: "informative",
      toneOfVoice: "enthusiastic",
      narrativeStyle: "direct",
      duration: "65-75",
      language: "english",
    }
  );

  const generatedVideoMaterial = videoGenerator.generateVideo(
    scriptContent.scriptContent,
    scriptContent.musicKeyWords
  );

  console.log(generatedVideoMaterial);
};

main();
