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
  wordId,
  userFirstName
) {
  const doNotUnderstand = [
    "I don't understand, try again",
    "Oops, I didn't hear you",
    "what did you said? I didn't get it",
  ];
  const successFeedback = [
    "good job! let's learn another word!",
    `${userFirstName} you are amazing! let go`,
    `Wow ${userFirstName} you so good!`,
  ];
  const playAgain = "ANNA PLAY AGAIN";
  try {
    let obj = [];
    // ! EMPTY === FAIL
    if (saidWord === "") {
      const nativeWord = await getWordById(wordId);
      const feedback = `${
        doNotUnderstand[Math.floor(Math.random() * doNotUnderstand.length)]
      } \n<> the word: <${
        nativeWord.word
      }> it is: <#${expectedWord}>, try to say: <#${expectedWord}>`;
      obj = await createSpeech(feedback, nativeLanguage, currentLanguage);
      //TODO we want to delete the new progress here
      await crateNewProgress(uid, currentLanguage.id, wordId, 0);
      return { audio: obj, success: false };
    } else if (playAgain.includes(saidWord.toUpperCase)) {
      //TODO אנחנו רוצים לשמור כל פעם את ההקלטה האחרונה ואם נכנסים לכאן לשלוח אותה שוב.
      const feedback = `i am repeat`;
      obj = await createSpeech(feedback, nativeLanguage, currentLanguage);
      return { audio: obj, success: false };
    }

    //! FAIL
    if (saidWord.toUpperCase() !== expectedWord.toUpperCase()) {
      const feedback = `you said: <#${saidWord}>, and you need to say: <#${expectedWord}>, try again>`;
      obj = await createSpeech(feedback, nativeLanguage, currentLanguage);
      await crateNewProgress(uid, currentLanguage.id, wordId, 0);
      return { audio: obj, success: false };

      //! SUCCESS
    } else {
      const feedback = successFeedback[Math.floor(Math.random() * successFeedback.length)];
      obj = await createSpeech(feedback, nativeLanguage, currentLanguage);
      await crateNewProgress(uid, currentLanguage.id, wordId, 10);
      return { audio: obj, success: true };
    }
  } catch (error) {
    console.error(error);
  }
}

async function getWordById(id) {
  try {
    const word = await Word.findOne({ where: { id } });
    return word;
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
