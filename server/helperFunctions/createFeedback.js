const { Progress, Word } = require("../models");
const { createSpeech } = require("./createSpeech");
const {
  createSentenceDoNot,
  createSentenceDoNotAndNext,
  createSentenceFailAndRetry,
  createSentenceFailAndSkip,
  createSentenceSuccess,
} = require("./createSentence");

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
  wordId,
  userFirstName,
  nativeWord,
  userProgress
) {
  try {
    let audioArray = [];
    // ! EMPTY === FAIL
    if (saidWord === "") {
      const { moveToNextWord } = await userProgress.failed();
      let feedback;
      if (moveToNextWord) {
        feedback = createSentenceDoNotAndNext(
          userProgress.getCurrentWord(),
          currentLanguage.language
        );
      } else {
        feedback = createSentenceDoNot(nativeWord, expectedWord);
      }
      audioArray = await createSpeech(feedback, nativeLanguage, currentLanguage);
      return { audio: audioArray, success: false };
    }

    //! FAIL
    if (saidWord.toUpperCase() !== expectedWord.toUpperCase()) {
      const { moveToNextWord } = await userProgress.failed();
      let feedback;
      if (moveToNextWord) {
        feedback = createSentenceFailAndSkip(
          saidWord,
          expectedWord,
          userProgress.getCurrentWord(),
          currentLanguage.language
        );
      } else {
        feedback = createSentenceFailAndRetry(saidWord, expectedWord);
      }
      audioArray = await createSpeech(feedback, nativeLanguage, currentLanguage);
      await crateNewProgress(uid, currentLanguage.id, wordId, 0);
      return { audio: audioArray, success: false };

      //! SUCCESS
    } else {
      await crateNewProgress(uid, currentLanguage.id, wordId, 10);
      await userProgress.succeeded();
      const feedback = createSentenceSuccess(userFirstName);
      audioArray = await createSpeech(feedback, nativeLanguage, currentLanguage);
      return { audio: audioArray, success: true };
    }
  } catch (error) {
    console.error(error);
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
  }
}

module.exports.createFeedback = createFeedback;
