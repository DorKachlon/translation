const { Router } = require("express");
const multer = require("multer");
const { speech2text } = require("../../google-api/speech2text");
const { User, Language } = require("../../models");

const router = Router();
const upload = multer();

router.post("/", upload.any(), async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: { id: 1 },
      include: [
        { model: Language, as: "nativeLanguage" },
        // { model: Language, as: "currentLanguage" },
      ],
    });

    const textFromSpeech = await speech2text(req.files[0].buffer, userInfo.nativeLanguage.code);
    res.json({ response: textFromSpeech });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = router;
