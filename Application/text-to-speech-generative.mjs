import SpeechGenerator from "./Models/Text-to-speech.mjs";

const textToSpeechModule = async () => {
  const speechGenerator = new SpeechGenerator();

  const generatedSpeech = await speechGenerator.generateTextToSpeech(
    "Picture this: a world where your every need, every task is met instantaneously by a super intelligent system helping out around your house, office and everywhere. This was once a dream but now almost a reality, thanks to the genius invention of Artificial Intelligence, or AI."
  );

  console.log(generatedSpeech);
};

textToSpeechModule();
