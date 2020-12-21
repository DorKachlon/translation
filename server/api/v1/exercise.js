const { Router } = require("express");
const { User, Language } = require("../../models");
const router = Router();
const { text2speech } = require("../../google-api/text2speech");
const { translateText } = require("../../google-api/translate");
const { nextWordToLearn } = require("../../helperFunction");

router.post("/", async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: { id: 1 },
      include: [
        { model: Language, as: "nativeLanguage" },
        { model: Language, as: "currentLanguage" },
      ],
    });
    let obj = [];
    //build a dialog
    if (req.body.textInput) {
      const textAfterTranslation = await translateText(
        req.body.textInput,
        userInfo.nativeLanguage.code
      );
      obj.push({
        text: textAfterTranslation,
        base64: await text2speech({
          inputText: textAfterTranslation,
          languageCode: userInfo.nativeLanguage.code,
          voiceName: userInfo.nativeLanguage.voice,
        }),
      });
      res.json({ audio: obj });

      //build an exercise
    } else {
      const nextWord = await nextWordToLearn(1);
      console.log("nextWord", nextWord);
      //1
      const theWord = await translateText("the word:", userInfo.nativeLanguage.code);
      obj.push({
        text: theWord,
        base64: await text2speech({
          inputText: theWord,
          languageCode: userInfo.nativeLanguage.code,
          voiceName: userInfo.nativeLanguage.voice,
        }),
      });
      //2
      const wordNative = await translateText(nextWord.word, userInfo.nativeLanguage.code);
      obj.push({
        text: wordNative,
        base64: await text2speech({
          inputText: wordNative,
          languageCode: userInfo.nativeLanguage.code,
          voiceName: userInfo.nativeLanguage.voice,
        }),
        itsWord: true,
      });
      //3
      const its = await translateText("it is:", userInfo.nativeLanguage.code);
      obj.push({
        text: its,
        base64: await text2speech({
          inputText: its,
          languageCode: userInfo.nativeLanguage.code,
          voiceName: userInfo.nativeLanguage.voice,
        }),
      });
      //4
      const nextWordTranslator = await translateText(nextWord.word, userInfo.currentLanguage.code);
      const wordObj = {
        text: nextWordTranslator,
        base64: await text2speech({
          inputText: nextWordTranslator,
          languageCode: userInfo.currentLanguage.code,
          voiceName: userInfo.currentLanguage.voice,
        }),
        itsWord: true,
      };
      obj.push(wordObj);
      //5
      const tryToSay = await translateText(`try to say:`, userInfo.nativeLanguage.code);
      obj.push({
        text: tryToSay,
        base64: await text2speech({
          inputText: tryToSay,
          languageCode: userInfo.nativeLanguage.code,
          voiceName: userInfo.nativeLanguage.voice,
        }),
      });
      //6
      obj.push(wordObj);
      console.log(nextWord);
      console.log({ text: nextWordTranslator, id: nextWord.wordId });
      res.json({ word: { text: nextWordTranslator, id: nextWord.wordId }, audio: obj });
    }
  } catch (error) {
    console.error(error);
    // res.status(400).json({ message: "Cannot process request" });
    res.status(400).json({ message: error });
  }
});

module.exports = router;
