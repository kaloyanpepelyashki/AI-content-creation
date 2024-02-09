import GPTScriptGeneratorDataFed from "./Models/GPTScriptGeneratorDataFed.mjs";
import VideoGenerator from "./Models/VideoGenerator.mjs";
import GPTLongScriptGeneratorDataFed from "./Models/GPTLongScriptGeneratorDataFed.mjs";

const main = async () => {
  // const scriptGenerator = new GPTScriptGeneratorDataFed("./Data/ebitsData.txt");
  // const videoGenerator = new VideoGenerator();

  // const scriptContent = await scriptGenerator.generateCustomContent(
  //   "History of the internet",
  //   {
  //     genre: "informative/educational",
  //     toneOfVoice: "informative, technical and yet enthusiastic",
  //     narrativeStyle: "objective, descriptive and direct",
  //     duration: "5",
  //     language: "english",
  //   },
  //   1.1
  // );

  // const generatedVideoMaterial = await videoGenerator.generateVideo(
  //   scriptContent.scriptContent,
  //   scriptContent.musicKeyWords
  // );

  // console.log(generatedVideoMaterial);

  const scriptGenerator = new GPTLongScriptGeneratorDataFed(
    "./Data/ebitsData.txt"
  );
  const scriptContent = await scriptGenerator.generateCustomContent(
    "History of the internet and how was the internet invented",
    {
      genre: "informative/educational",
      toneOfVoice: "informative, technical and yet enthusiastic",
      narrativeStyle: "objective, descriptive and direct",
      duration: "5",
      language: "english",
    },
    1.1
  );

  console.log(scriptContent);
};

main();
