const { Progress } = require("../models/Progress");
const { translateWordByLanguageId } = require("./translation");
const { findWordsToLearn } = require("./findWordsToLearn");
class UserProgress {
  constructor(userInfo, currentLearnWords, currentWordAfterTranslation) {
    this.userInfo = userInfo;
    // this.currentWordAfterTranslation = currentWordAfterTranslation;
    this.currentWordFails = 0;
    this.currentLearnWords = currentLearnWords;
  }
  getCurrentWord() {
    return this.currentLearnWords[0].word;
  }
  getCurrentWordId() {
    return this.currentLearnWords[0].id;
  }
  async failed() {
    try {
      this.currentWordFails = this.currentWordFails + 1;
      if (this.currentWordFails === 3) {
        this.currentWordFails = 0;
        this.currentLearnWords.push(this.currentLearnWords.shift());
        // this.currentWordAfterTranslation = await translateWordByLanguageId(
        //   this.getCurrentWord(),
        //   this.userInfo.currentLanguageId
        // );
        return { moveToNextWord: true };
      }
      return { moveToNextWord: false };
    } catch (e) {
      console.error(e);
    }
  }

  async succeeded() {
    this.currentWordFails = 0;
    this.currentLearnWords.shift();
    const arr = await findWordsToLearn(this.userInfo.id, this.userInfo.currentLanguageId);
    let index = 0;
    let done = false;
    while (index < arr.length && !done) {
      const indexFound = this.currentLearnWords.findIndex((word) => word.id === arr[index].id);
      if (indexFound === -1) {
        done = true;
        this.currentLearnWords.push(arr[index]);
      }
      index++;
    }
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
}
// currentWords = []; //length 5
// word = {
//   languageId: 1, //"english"
//   wordText: "apple",
//   userProgress: [
//     {
//       date: "27/12/2020",
//       score: 10,
//     },
//   ],
// };
