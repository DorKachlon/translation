const { Progress } = require("../models/Progress");

class UserProgress {
  constructor(userInfo, currentLearnWords) {
    this.userInfo = userInfo;
    this.currentWord = "";
    this.currentWordId = 0;
    this.currentWordFails = 0;
    this.currentLearnWords = currentLearnWords;
  }
  // getCurrentWord() {
  //   return this.currentLearnWords[0];
  // }
  getCurrentWord() {
    return this.currentWord;
  }

  setProgress(success) {
    if (success) {
      this.currentWordFails = 0;

      // Progress.create({})

      db.updateCurrentWord;
      this.currentWord = db.getNextWord;
    } else {
      this.currentWordFails++;
      if (this.currentWordFails > 3) {
        db.updateCurrentWord;
        this.currentWord = db.getNextWord;
      }
    }
  }
}
module.exports.UserProgress = UserProgress;

class Word {
  constructor(languageId, wordText, userProgress = []) {
    this.languageId = languageId;
    this.wordText = wordText;
    this.userProgress = userProgress;
  }

  getCalculateScore() {
    return this.userProgress.reduce((totalScore, progress) => totalScore + progress.score);
  }
}

currentWords = []; //length 5
word = {
  languageId: 1, //"english"
  wordText: "apple",
  userProgress: [
    {
      date: "27/12/2020",
      score: 10,
    },
  ],
};

// this.FiveWord = [];
// const allProgressByUser = await Progress.findAll({
//   where: { userId: userInfo },
//   order: [["wordId", "ASC"]],
// });
// allProgressByUser.forEach((oneProgress) => {
//   if (oneProgress.score < 20) FiveWord.push(oneProgress.wordId);
// });
// while (FiveWord.length < 5) {

// }
