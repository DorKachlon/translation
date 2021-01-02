const { Router } = require("express");
const { translate } = require("../../helperFunctions/translation");
const router = Router();
const { Progress, Word, Language, User } = require("../../models");
const sequelize = require("sequelize");
router.get("/", async (req, res) => {
  const languagesInProgress = await Progress.findAll({
    where: { userId: req.user.id },
    group: "language_id",
    attributes: ["languageId"],
    include: [{ model: Language, as: "language" }],
  });
  const userInfo = await User.findOne({
    where: { id: req.user.id },
    include: [
      { model: Language, as: "nativeLanguage" },
      // { model: Language, as: "currentLanguage" },
    ],
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
          const word = await translate(wordAndScore.Word.word, userInfo.nativeLanguage);
          return {
            totalScore: wordAndScore.dataValues.totalScore,
            word,
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
