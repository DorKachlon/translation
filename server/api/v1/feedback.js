const { Router } = require("express");
const router = Router();
const { speech2text } = require("../../speech2text");
const fs = require("fs");

router.post("/", async (req, res) => {
  // console.log("here1", req.body);
  // fs.writeFileSync(
  //   "file.mp3",
  //   Buffer.from(req.body.base64data.replace("data:audio/mp3;codecs=opus;base64,", ""), "base64")
  // );
  await speech2text(req.body.base64data);
});

module.exports = router;
