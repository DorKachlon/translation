const { Router } = require("express");
const { User, Language } = require("../../models");
const router = Router();
const { text2speech } = require("../../google-api/text2speech");

router.post("/", async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: { id: 1 },
      include: [
        { model: Language, as: "nativeLanguage" },
        { model: Language, as: "currentLanguage" },
      ],
    });
    if (req.body.textInput) {
      obj = await text2speech({
        inputText: req.body.textInput,
        languageCode: userInfo.nativeLanguage.code,
        voiceName: userInfo.nativeLanguage.voice,
      });
    } else {
      obj = await text2speech({
        inputText: "hello, my name is dodo",
        languageCode: userInfo.currentLanguage.code,
        voiceName: userInfo.currentLanguage.voice,
      });
    }
    res.json(obj);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = router;
