const { UserProgress } = require("../helperFunctions/userProgress");
const { findWordsToLearn } = require("../helperFunctions/findWordsToLearn");
const { translateWordByLanguageId } = require("../helperFunctions/translation");

let progressContainer = {};
module.exports = function (req, res, next) {
  const userInfo = req.user;
  if (progressContainer[userInfo.id]) {
    req.userProgress = progressContainer[userInfo.id];
  }
  next();
};

async function createNewProgress(userInfo) {
  try {
    const arrayOfWords = await findWordsToLearn(userInfo.id, userInfo.currentLanguageId);
    // const currentWordAfterTranslation = await translateWordByLanguageId(
    //   arrayOfWords[0].word,
    //   userInfo.currentLanguageId
    // );
    let newProgress = new UserProgress(userInfo, arrayOfWords);
    progressContainer[userInfo.id] = newProgress;
  } catch (e) {
    console.error(e);
  }
}

function removeProgress(userInfo) {
  delete progressContainer[userInfo.id];
}

module.exports.createNewProgress = createNewProgress;
module.exports.removeProgress = removeProgress;
