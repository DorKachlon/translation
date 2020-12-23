const { Router } = require("express");
const { User, Language } = require("../../models");
const router = Router();
const { translateText } = require("../../google-api/translate");
const { nextWordToLearn } = require("../../helperFunctions/nextWord");
const { createSpeech } = require("../../helperFunctions/createSpeech");

router.post("/", async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: { id: req.user.id },
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
      arrOfAudio = await createSpeech(req.body.textInput, l1, l2);
      res.json({ audio: arrOfAudio });
    } else {
      //! build an exercise
      const nextWord = await nextWordToLearn(userInfo.id, userInfo.currentLanguage.id);
      const feedback = `the word: <${nextWord.word}> it is: <!${nextWord.word}>, try to say: <!${nextWord.word}>`;
      arrOfAudio = await createSpeech(feedback, l1, l2);
      const nextWordTranslator = await translateText(nextWord.word, userInfo.currentLanguage.code);
      console.log("userProgress", req.userProgress);
      console.log("user", req.user);

      //userProgress
      req.userProgress.currentWord = nextWordTranslator;
      req.userProgress.currentWordId = nextWord.wordId;
      //userProgress

      res.json({ audio: arrOfAudio });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = router;
