const { Router } = require("express");
const multer = require("multer");

const router = Router();
const { speech2text } = require("../../google-api/speech2text");
const fs = require("fs");
const ffmpeg = require("ffmpeg");
const upload = multer();

router.post("/", upload.any(), async (req, res) => {
  console.log("here1", req.files);
  const textFromSpeech = await speech2text(req.files[0].buffer);
  res.json({ response: textFromSpeech });
});

module.exports = router;
