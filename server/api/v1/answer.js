const { Router } = require("express");
const multer = require("multer");
const { speech2text } = require("../../google-api/speech2text");
const { User, Language } = require("../../models");
const { createFeedback } = require("../../helperFunctions/createFeedback");
const { translateWordByLanguageId } = require("../../helperFunctions/translation");

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

    const currentWordAfterTranslation = await translateWordByLanguageId(
      req.userProgress.getCurrentWord(),
      userInfo.currentLanguage.id
    );
    const textFromSpeech = await speech2text(
      req.files[0].buffer,
      userInfo.currentLanguage.code,
      // req.userProgress.currentWordAfterTranslation
      currentWordAfterTranslation
    );
    const feedback = await createFeedback(
      textFromSpeech,
      // req.userProgress.currentWordAfterTranslation,
      currentWordAfterTranslation,
      userInfo.nativeLanguage,
      userInfo.currentLanguage,
      req.user.id,
      req.userProgress.getCurrentWordId(),
      req.user.firstName,
      req.userProgress.getCurrentWord(),
      req.userProgress
    );
    res.json({ response: textFromSpeech, audio: feedback.audio, success: feedback.success });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = router;
