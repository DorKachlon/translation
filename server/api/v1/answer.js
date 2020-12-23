const { Router } = require("express");
const multer = require("multer");
const { speech2text } = require("../../google-api/speech2text");
const { User, Language } = require("../../models");
const { craeteFeedback } = require("../../helperFunctions/createFeedback");
const router = Router();
const upload = multer();

//! ROUTER
router.post("/", upload.any(), async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: { id: req.user.id },
      include: [
        { model: Language, as: "nativeLanguage" },
        { model: Language, as: "currentLanguage" },
      ],
    });
    // const userProgress = { userInfo };
    const textFromSpeech = await speech2text(req.files[0].buffer, userInfo.currentLanguage.code);
    const feedback = await craeteFeedback(
      textFromSpeech,
      req.userProgress.currentWord,
      userInfo.nativeLanguage,
      userInfo.currentLanguage,
      req.user.id,
      req.userProgress.currentWordId
    );
    res.json({ response: textFromSpeech, audio: feedback.audio, status: feedback.status });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = router;
