const { Router } = require("express");
const multer = require("multer");
const { speech2text } = require("../../google-api/speech2text");
const { User, Language } = require("../../models");
const { translateText } = require("../../google-api/translate");
const { text2speech } = require("../../google-api/text2speech");

const router = Router();
const upload = multer();

router.post("/:word", upload.any(), async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: { id: 1 },
      include: [
        { model: Language, as: "nativeLanguage" },
        { model: Language, as: "currentLanguage" },
      ],
    });
    console.log(req);
    const textFromSpeech = await speech2text(req.files[0].buffer, userInfo.currentLanguage.code);
    const feedback = await craeteFeedback(
      textFromSpeech,
      req.params.word,
      userInfo.nativeLanguage,
      userInfo.currentLanguage
    );
    res.json({ response: textFromSpeech, audio: feedback });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

async function craeteFeedback(Accepted, target, nativeLanguage, currentLanguage) {
  let obj = [];
  if (Accepted.toUpperCase() !== target.toUpperCase()) {
    //1
    const part1 = await translateText("you said: ", nativeLanguage.code);
    obj.push({
      text: part1,
      base64: await text2speech({
        inputText: part1,
        languageCode: nativeLanguage.code,
        voiceName: nativeLanguage.voice,
      }),
    });
    //2
    const part2 = await translateText(Accepted, currentLanguage.code);
    obj.push({
      text: part2,
      base64: await text2speech({
        inputText: part2,
        languageCode: currentLanguage.code,
        voiceName: currentLanguage.voice,
      }),
      itsWord: true,
    });
    //3
    const part3 = await translateText(",and you need to say :", nativeLanguage.code);
    obj.push({
      text: part3,
      base64: await text2speech({
        inputText: part3,
        languageCode: nativeLanguage.code,
        voiceName: nativeLanguage.voice,
      }),
    });
    //4
    const part4 = await translateText(target, currentLanguage.code);
    obj.push({
      text: part4,
      base64: await text2speech({
        inputText: part4,
        languageCode: currentLanguage.code,
        voiceName: currentLanguage.voice,
      }),
      itsWord: true,
    });
    //5
    const part5 = await translateText("try again", nativeLanguage.code);
    obj.push({
      text: part5,
      base64: await text2speech({
        inputText: part5,
        languageCode: nativeLanguage.code,
        voiceName: nativeLanguage.voice,
      }),
    });
  } else {
    const part = await translateText("good job! let's learn another word!", nativeLanguage.code);
    obj.push({
      text: part,
      base64: await text2speech({
        inputText: part,
        languageCode: nativeLanguage.code,
        voiceName: nativeLanguage.voice,
      }),
    });
  }
  return obj;
}

module.exports = router;
