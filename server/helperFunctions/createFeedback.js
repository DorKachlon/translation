const { Progress, Word } = require("../models");
const { createSpeech } = require("./createSpeech");

function feedbackCreator(saidWord, expectedWord) {
  const status = checkAnswer(saidWord, expectedWord);
  if (status.retry) {
    //post on database to Progress
  }
}

//! createFeedback FUNCTION
async function createFeedback(
  saidWord,
  expectedWord,
  nativeLanguage,
  currentLanguage,
  uid,
  wordId
) {
  try {
    let obj = [];
    let status;
    // ! EMPTY === FAIL
    if (saidWord === "") {
      const nativeWord = await getWordById(wordId);
      const feedback = `I don't understand, try again \n<> the word: <${nativeWord.word}> it is: <!${expectedWord}>, try to say: <!${expectedWord}>`;
      obj = await createSpeech(feedback, nativeLanguage, currentLanguage);
      //TODO we want to delete the new progress here
      await crateNewProgress(uid, currentLanguage.id, wordId, 0);
      status;
      return { audio: obj, success: false };
    }

    //! FAIL
    if (saidWord.toUpperCase() !== expectedWord.toUpperCase()) {
      const feedback = `you said: <!${saidWord}>, and you need to say: <!${expectedWord}>, try again>`;
      obj = await createSpeech(feedback, nativeLanguage, currentLanguage);
      await crateNewProgress(uid, currentLanguage.id, wordId, 0);
      return { audio: obj, success: false };

      //! SUCCESS
    } else {
      const feedback = "good job! let's learn another word!";
      obj = await createSpeech(feedback, nativeLanguage, currentLanguage);
      await crateNewProgress(uid, currentLanguage.id, wordId, 10);
      return { audio: obj, success: true };
    }
  } catch (error) {
    console.error(error);
    // res.status(400).json({ message: "Cannot process request" });
  }
}

async function getWordById(id) {
  try {
    const word = await Word.findOne({ where: { id } });
    return word;
  } catch (error) {
    console.error(error);
    // res.status(400).json({ message: "Cannot process request" });
  }
}

async function crateNewProgress(userId, languageId, wordId, score) {
  try {
    const obj = {
      userId,
      languageId,
      wordId,
      score,
    };
    await Progress.create(obj);
  } catch (error) {
    console.error(error);
    // res.status(400).json({ message: "Cannot process request" });
  }
}

module.exports.createFeedback = createFeedback;
