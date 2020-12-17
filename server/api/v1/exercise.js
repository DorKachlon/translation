const { Router } = require("express");
const { User, Language } = require("../../models");
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

  // outputFileNmae: "output1.mp3",
};

router.post("/", async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: { id: 1 },
      include: [
        { model: Language, attributes: ["code", "language"], as: "nativeLanguage" },
        { model: Language, attributes: ["code", "language"], as: "currentLanguage" },
      ],
    });
    // res.json(userInfo);
    obj = await text2speech(mySetting);
    res.json(obj);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = router;
