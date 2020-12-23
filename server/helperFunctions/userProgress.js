class Progress {
  constructor(userInfo) {
    this.userInfo = userInfo;
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
module.exports.Progress = Progress;
