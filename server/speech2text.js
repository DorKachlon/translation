const speech = require("@google-cloud/speech");
const fs = require("fs");
const projectID = "first";
const keyFilename = "first-1969e02ab82b.json";
const client2 = new speech.SpeechClient({ projectID, keyFilename });

async function speech2text(base64Audio) {
  //! works with mp3
  // const fileName = "./output.mp3";
  // const fileName = "./file.mp3";

  // const file = fs.readFileSync(fileName);
  // console.log(file);
  // const audioBytes = file.toString("base64");
  // console.log(audioBytes);
  //!
  // console.log("here2", base64Audio.toString("base64"));
  // console.log("here2", base64Audio.split("base64,")[1]);
  // const audioBytes = base64Audio;
  // const audioBytes = base64Audio.toString("base64");
  // console.log(audioBytes);
  console.log(base64Audio);

  const audio = {
    content: base64Audio.toString("base64"),
    // content: audioBytes,
    // content: base64Audio.toString("base64"),
    // uri: base64Audio,
  };
  const config = {
    // enableAutomaticPunctuation: true,
    // encoding: "LINEAR16",
    // sampleRateHertz: 24000,
    languageCode: "en-US",
    // model: "default",
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

  //!--------------------------------------------------------------------------
  // const SAMPLE_RATE_HERTZ = [8000, 12000, 16000, 24000, 48000];
  // const ENCODING = [
  //   "LINEAR16",
  //   "FLAC",
  //   "MULAW",
  //   "AMR",
  //   "AMR_WB",
  //   "OGG_OPUS",
  //   "SPEEX_WITH_HEADER_BYTE",
  // ];
  // for (const encod of ENCODING) {
  //   for (const rate of SAMPLE_RATE_HERTZ) {
  //     const audio = {
  //       content: audioBytes,
  //     };
  //     const config = {
  //       encoding: encod,
  //       sampleRateHertz: rate,
  //       languageCode: "en-US",
  //     };
  //     const request = {
  //       audio: audio,
  //       config: config,
  //     };

  //     // Detects speech in the audio file
  //     try {
  //       const [response] = await client2.recognize(request);
  //       console.log(response);
  //       const transcription = response.results
  //         .map((result) => result.alternatives[0].transcript)
  //         .join("\n");
  //       console.log("encod ", encod, " rate ", rate);
  //       console.log(`Transcription: ${transcription}`);
  //     } catch (e) {}
  //   }
  // }
  //!------------------------------------------------------------------
}

module.exports.speech2text = speech2text;
