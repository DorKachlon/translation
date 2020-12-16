const { Router } = require("express");
const router = Router();
const { text2speech } = require("../../google-api/text2speech");

let mySetting = {
  audioConfig: {
    audioEncoding: "LINEAR16",
    pitch: 0,
    speakingRate: 0.7,
  },
  input: {
    text: "hello, my name is Dor",
  },
  voice: {
    languageCode: "en-US",
    name: "en-US-Wavenet-F",
  },

  outputFileNmae: "output1.mp3",
};

router.post("/", async (req, res) => {
  obj = await text2speech(mySetting);
  // console.log(obj);
  res.json(obj);
});

module.exports = router;
