const { Router } = require("express");
const { translate } = require("../../helperFunctions/translation");
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
      const words = await Promise.all(
        progressByUser.map(async (wordAndScore) => {
          // console.log(wordAndScore.Word.word, language.id);
          const translateWord = await translate(wordAndScore.Word.word, language.language);
          return {
            totalScore: wordAndScore.dataValues.totalScore,
            word: wordAndScore.Word.word,
            translateWord,
          };
        })
      );
      return { language: language.language, words };
    })
  );
  res.json(wordsForUserByLanguages);
});
module.exports = router;
