const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const projectID = "first";
const keyFilename = "first-1969e02ab82b.json";
const client = new textToSpeech.TextToSpeechClient({ projectID, keyFilename });

async function text2speech(MySettings) {
  const [response] = await client.synthesizeSpeech(MySettings);

  return response.audioContent.toString("base64");
  // fs.writeFileSync("bytes.json", JSON.stringify(response.audioContent.toString("base64")));
  // fs.writeFileSync("bytes.json", JSON.stringify({ name: "dor" }));

  //   const writeFile = util.promisify(fs.writeFile);
  //   await writeFile("output.mp3", response.audioContent, "binary");
  //   console.log("Audio content written to file: output.mp3");
}

module.exports.text2speech = text2speech;
