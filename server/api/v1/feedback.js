const { Router } = require("express");
const multer = require("multer");
const { speech2text } = require("../../google-api/speech2text");
const { User, Language } = require("../../models");

const router = Router();
const upload = multer();

router.post("/:word", upload.any(), async (req, res) => {
  try {
    console.log(req.params);
    console.log(req);
    res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = router;
