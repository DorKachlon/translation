const { Router } = require("express");
const multer = require("multer");
const { speech2text } = require("../../google-api/speech2text");
const { User, Language, Word, Progress } = require("../../models");

const router = Router();
const upload = multer();

router.post("/", upload.any(), async (req, res) => {
  try {
    progressByUser = await Progress.findAll({
      where: 1,
      order: [["wordId", "ASC"]],
    });

    const allWords = await Word.findAll();
    const nextWordId = progressByUser[progressByUser.length - 1].wordId + 1;
    if (nextWordId <= allWords.length) {
      nextWordById = await Word.findOne({
        where: { id: nextWordId },
        attributes: ["id", "word", "languageId", "createdAt", "updatedAt"],
      });
      // res.json(nextWordById);
      res.json({ word: nextWordById.word, wordId: nextWordById.id });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = router;
