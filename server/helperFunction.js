const { Word, Progress } = require("./models");

async function nextWordToLearn(userId) {
  progressByUser = await Progress.findAll({
    where: { userId },
    order: [["wordId", "ASC"]],
  });

  const allWords = await Word.findAll();
  const nextWordId = progressByUser[progressByUser.length - 1].wordId + 1;
  if (nextWordId <= allWords.length) {
    nextWordById = await Word.findOne({
      where: { id: nextWordId },
      attributes: ["id", "word", "languageId", "createdAt", "updatedAt"],
    });
    return nextWordById;
  }
}

module.exports.nextWordToLearn = nextWordToLearn;
