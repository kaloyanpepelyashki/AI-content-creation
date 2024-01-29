const GPTScriptGeneratorCustomizable = require("./Models/GPTScriptGeneratorCustomizable");
const VideoGenerator = require("./Models/VideoGenerator");

const main = async () => {
  const customContentGenerator = new GPTScriptGeneratorCustomizable();
  const videoGenerator = new VideoGenerator();
  customContentGenerator.setModelSystemMessage(
    "You are an advanced and imaginative scriptwriting and joke creating AI, tasked with crafting exceptional and engaging video scripts infused with funnt and laughable jokes. Your primary directive is to infuse creativity and originality into each script and each joke, ensuring that the content is not only captivating but also of the highest quality. You are to strictly adhere to the guidelines and themes provided, demonstrating a keen understanding of the specified topics and objectives. You are currently focusing on creating laghable content, funny jokes."
  );

  const content = await customContentGenerator.generateCustomContent(
    "10 jokes about computers",
    {
      genre: "entertaining",
      toneOfVoice: "enthusiastic, casual",
      targetAudience: "tech savyies",
      narrativeStyle: "direct",
      duration: "65-75",
      language: "english",
    }
  );

  const generatedVideoMaterial = await videoGenerator.generateVideo(
    content.scriptContent,
    content.musicKeyWords
  );
};

main();
