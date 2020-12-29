const sdk = require("microsoft-cognitiveservices-speech-sdk");
require("dotenv").config();

function text2speechAzure(text, languageCode, languageVoice) {
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    process.env.AZURE_KEY,
    process.env.AZURE_REGION
  );
  speechConfig.speechRecognitionLanguage = languageCode;
  speechConfig.speechSynthesisVoiceName = languageVoice;

  const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

  return new Promise((res, rej) => {
    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (result) {
          const buffer = Buffer.from(result.audioData);
          const base64String = buffer.toString("base64");
          synthesizer.close();
          res(base64String);
        } else {
          rej("no result");
        }
      },
      (error) => {
        synthesizer.close();
        rej(error);
      }
    );
  });
}
module.exports.text2speechAzure = text2speechAzure;
