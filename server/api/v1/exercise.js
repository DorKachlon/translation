const { Router } = require("express");
const { User, Language } = require("../../models");
const router = Router();
const { createSentenceExercise } = require("../../helperFunctions/createSentence");
const { createSpeech } = require("../../helperFunctions/createSpeech");

//<!> translate the word and make audio from l2
//<#> do not translate the word and make audio from l2

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
      const nextWord = req.userProgress.getCurrentWord();
      const feedback = createSentenceExercise(
        nextWord,
        l2.language,
        userInfo.lazyMode,
        req.userProgress.getCurrentWordLevel()
      );
      arrOfAudio = await createSpeech(feedback, l1, l2);
      // console.log("userProgress", req.userProgress);
      // console.log("user", req.user);

      res.json({ audio: arrOfAudio });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = router;
