import GPTScriptGeneratorDataFed from "./Models/GPTScriptGeneratorDataFed.mjs";
import VideoGenerator from "./Models/VideoGenerator.mjs";

const main = async () => {
  const scriptGenerator = new GPTScriptGeneratorDataFed("./Data/ebitsData.txt");
  const videoGenerator = new VideoGenerator();

  const scriptContent = await scriptGenerator.generateCustomContent(
    "History of the nokia 3310",
    {
      genre: "informative/educational",
      toneOfVoice: "informative, technical and yet enthusiastic",
      narrativeStyle: "objective, descriptive and direct",
      duration: "45",
      language: "english",
    },
    1.2
  );

  const generatedVideoMaterial = await videoGenerator.generateVideo(
    scriptContent.scriptContent,
    scriptContent.musicKeyWords
  );

  console.log(generatedVideoMaterial);
};

main();
