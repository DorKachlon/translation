const speech = require("@google-cloud/speech");
const projectID = "first";
const keyFilename = "./google-api/google-api-keys.json";
const client2 = new speech.SpeechClient({ projectID, keyFilename });

async function speech2text(bufferAudio, language) {
  const audio = {
    content: bufferAudio.toString("base64"),
  };
  const config = {
    languageCode: language,
  };
  const request = {
    audio: audio,
    config: config,
  };

  try {
    const [response] = await client2.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    // console.log(`Transcription: ${transcription}`);
    return transcription;
  } catch (e) {
    console.error(e);
  }
}

module.exports.speech2text = speech2text;
