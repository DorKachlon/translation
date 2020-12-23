const { Progress } = require("../models/Progress");

class userProgress {
  constructor(userInfo) {
    this.userInfo = userInfo;
    this.currentWord = "";
    this.currentWordId = 0;
    this.currentWordFails = 0;
  }

  getCurrentWord() {
    return this.currentWord;
  }
  setProgress(success) {
    if (success) {
      this.currentWordFails = 0;
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
module.exports.userProgress = userProgress;

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
