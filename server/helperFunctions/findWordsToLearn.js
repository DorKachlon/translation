const { Progress, Word } = require("../models");
const sequelize = require("sequelize");

const scoreToPass = 30;

async function findWordsToLearn(userId, languageId) {
  const progressPerUser = await Progress.findAll({
    where: { userId, languageId },
    attributes: [[sequelize.fn("sum", sequelize.col("score")), "totalScore"], "wordId"],
    group: "word_id",
  });
  let words = await Word.findAll();
  words = words.map((word) => word.dataValues);
  for (let i = 0; i < progressPerUser.length; i++) {
    const index = words.findIndex((word) => word.id === progressPerUser[i].wordId);
    words[index].totalScore = parseInt(progressPerUser[i].dataValues.totalScore);
  }
  let wordsToLearn = []; //max 5 words
  let index = 0;
  while (wordsToLearn.length < 5 && index < words.length) {
    if (words[index].totalScore < scoreToPass || words[index].totalScore === undefined) {
      wordsToLearn.push(words[index]);
    }
    index++;
  }
  return wordsToLearn;
}

module.exports.findWordsToLearn = findWordsToLearn;
