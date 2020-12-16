const speech = require("@google-cloud/speech");
const projectID = "first";
const keyFilename = "first-1969e02ab82b.json";
const client2 = new speech.SpeechClient({ projectID, keyFilename });

async function speech2text(bufferAudio) {
  const audio = {
    content: bufferAudio.toString("base64"),
  };
  const config = {
    languageCode: "en-US",
  };
  const request = {
    audio: audio,
    config: config,
  };

  try {
    const [response] = await client2.recognize(request);
    console.log(response);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    // console.log(`Transcription: ${transcription}`);
    return transcription;
  } catch (e) {}
}

module.exports.speech2text = speech2text;
