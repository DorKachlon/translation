const { Router } = require("express");
const multer = require("multer");
const { speech2text } = require("../../google-api/speech2text");

const router = Router();
const upload = multer();

router.post("/", upload.any(), async (req, res) => {
  try {
    const textFromSpeech = await speech2text(req.files[0].buffer);
    console.log(textFromSpeech);
    res.json({ response: textFromSpeech });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
