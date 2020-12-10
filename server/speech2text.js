const speech = require("@google-cloud/speech");
const { log } = require("console");

const fs = require("fs");
const projectID = "first";
const keyFilename = "first-1969e02ab82b.json";
const client2 = new speech.SpeechClient({ projectID, keyFilename });
async function speech2text(base64Audio) {
  // The name of the audio file to transcribe
  const fileName = "./bytes.json";

  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  // console.log(file);
  // console.log(file.audioContent);
  // const audioBytes = file.toString("base64");
  const audioBytes = file;
  console.log(file);
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: "LINEAR16",
    // encoding: "FLAC",
    sampleRateHertz: 16000,
    languageCode: "en-US",
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client2.recognize(request);
  console.log(response);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  console.log(`Transcription: ${transcription}`);
}

module.exports.speech2text = speech2text;
