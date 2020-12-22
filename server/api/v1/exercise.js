const { Router } = require("express");
const { User, Language } = require("../../models");
const router = Router();
const { text2speech } = require("../../google-api/text2speech");
const { translateText } = require("../../google-api/translate");
const { nextWordToLearn } = require("../../helperFunctions/nextWord");

router.post("/", async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: { id: 1 },
      include: [
        { model: Language, as: "nativeLanguage" },
        { model: Language, as: "currentLanguage" },
      ],
    });
    const l1 = userInfo.nativeLanguage;
    const l2 = userInfo.currentLanguage;
    let arrOfAudio = [];

    if (req.body.textInput) {
      //! build a dialogs
      arrOfAudio = await createtSpeech(arrOfAudio, req.body.textInput, userInfo.nativeLanguage);
      res.json({ audio: arrOfAudio });
    } else {
      //! build an exercise
      const nextWord = await nextWordToLearn(userInfo.id, userInfo.currentLanguage.id);

      const feedback = `you said : <apple> and you need to said <water>, try again`;
      const feedback2 = feedback
        .split(/[<>]/g)
        .map((text, i) =>
          text[0] === "!" ? { text: text.slice(1), language: l2 } : { text: text, language: l1 }
        );

        
      // textToSpeak = [{ text: "the word:", language: userInfo.nativeLanguage }, {text:}];
      arrOfAudio = await createtSpeech(arrOfAudio, "the word:", userInfo.nativeLanguage);
      arrOfAudio = await createtSpeech(arrOfAudio, nextWord.word, userInfo.nativeLanguage, true);
      arrOfAudio = await createtSpeech(arrOfAudio, "it is:", userInfo.nativeLanguage);
      arrOfAudio = await createtSpeech(arrOfAudio, nextWord.word, userInfo.currentLanguage, true);
      arrOfAudio = await createtSpeech(arrOfAudio, `try to say:`, userInfo.nativeLanguage);
      arrOfAudio = await createtSpeech(arrOfAudio, nextWord.word, userInfo.currentLanguage, true);
      const nextWordTranslator = await translateText(nextWord.word, userInfo.currentLanguage.code);

      res.json({ word: { text: nextWordTranslator, id: nextWord.wordId }, audio: arrOfAudio });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

async function createtSpeech(arr, text, language, itsWord) {
  try {
    //TODO - to create word cache and check before translation
    const textafterTransition = await translateText(text, language.code);
    arr.push({
      text: textafterTransition,
      base64: await text2speech({
        inputText: textafterTransition,
        languageCode: language.code,
        voiceName: language.voice,
      }),
      itsWord,
    });
    return arr;
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
}
module.exports = router;
