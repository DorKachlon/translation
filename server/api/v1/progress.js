const { Router } = require("express");
const router = Router();
const { Progress, Word, Language } = require("../../models");
const sequelize = require("sequelize");

router.get("/", async (req, res) => {
  const languagesInProgress = await Progress.findAll({
    where: { userId: req.user.id },
    group: "language_id",
    attributes: ["languageId"],
    include: [{ model: Language, as: "language" }],
  });
  const wordsForUserByLanguages = await Promise.all(
    languagesInProgress.map(async (language) => {
      const progressByUser = await Progress.findAll({
        attributes: [[sequelize.fn("sum", sequelize.col("score")), "totalScore"]],
        where: { userId: req.user.id, languageId: language.languageId },
        group: "word_id",
        include: [{ model: Word }],
      });
      return { language: language.language, words: progressByUser };
    })
  );
  res.json(wordsForUserByLanguages);
});
module.exports = router;
