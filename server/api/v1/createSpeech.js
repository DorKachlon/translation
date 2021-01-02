const { Router } = require("express");
const router = Router();
const { createSpeech } = require("../../helperFunctions/createSpeech");
router.post("", async (req, res) => {
  try {
    const base64 = await createSpeech(req.body.text, req.body.language);
    res.json({ audio: base64[0].base64 });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = router;
