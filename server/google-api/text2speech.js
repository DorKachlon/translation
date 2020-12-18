const textToSpeech = require("@google-cloud/text-to-speech");
const projectID = "first";
const keyFilename = "./google-api/google-api-keys.json";
const client = new textToSpeech.TextToSpeechClient({ projectID, keyFilename });

async function text2speech({ inputText, languageCode, voiceName }) {
  let mySetting = {
    audioConfig: {
      audioEncoding: "LINEAR16",
      pitch: 0,
      speakingRate: 0.9,
    },
    input: {
      text: inputText,
    },
    voice: {
      languageCode: languageCode,
      name: voiceName,
    },
  };
  const [response] = await client.synthesizeSpeech(mySetting);

  return response.audioContent.toString("base64");
}

module.exports.text2speech = text2speech;
