const { Router } = require("express");
const multer = require("multer");

const router = Router();
const { speech2text } = require("../../speech2text");
const fs = require("fs");
const ffmpeg = require("ffmpeg");
const upload = multer();

router.post("/", upload.any(), async (req, res) => {
  console.log("here1", req.files);
  // fs.writeFileSync(
  //   "file.mp3",
  //   Buffer.from(req.body.base64data.replace("data:audio/mp3;codecs=opus;base64,", ""), "base64")
  // );
  await speech2text(req.files[0].buffer);
  res.send("ok");
});

module.exports = router;
