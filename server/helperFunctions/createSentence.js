/*
!-translate and make speech in l2 & this word and not instruction
#-do not translate and make speech in l2 & this word and not instruction
@-translate and make speech in l1 & this word and not instruction
*/

//! Exercise
function createSentenceExercise(word, language, lazyMode) {
  let sentences;
  if (lazyMode) {
    sentences = [`<@${word}> is <!${word}>, say: <!${word}>`];
  } else {
    sentences = [
      `the word <@${word}> is <!${word}>, repeat <!${word}>`,
      `<@${word}> in ${language}, is it: <!${word}> can you say: <!${word}?>`,
    ];
  }
  return sentences[Math.floor(Math.random() * sentences.length)];
}
//! Do not understand
function createSentenceDoNot(word, expectedWord, lazyMode) {
  let sentences;
  if (lazyMode) {
    sentences = [
      `I don't understand, try again \n<> the word: <@${word}> it is: <#${expectedWord}>, try to say: <#${expectedWord}>`,
      `Oops, I didn't hear you \n<> the word: <@${word}> it is: <#${expectedWord}>, try to say: <#${expectedWord}>`,
      `what did you said? I didn't get it \n<> the word: <@${word}> it is: <#${expectedWord}>, try to say: <#${expectedWord}>`,
    ];
  } else {
    sentences = [
      `I don't understand, try again \n<> the word: <@${word}> it is: <#${expectedWord}>, try to say: <#${expectedWord}>`,
      `Oops, I didn't hear you \n<> the word: <@${word}> it is: <#${expectedWord}>, try to say: <#${expectedWord}>`,
      `what did you said? I didn't get it \n<> the word: <@${word}> it is: <#${expectedWord}>, try to say: <#${expectedWord}>`,
    ];
  }
  return sentences[Math.floor(Math.random() * sentences.length)];
}
function createSentenceDoNotAndNext(word, language, lazyMode) {
  let sentences;
  if (lazyMode) {
    sentences = [
      `I don't understand, let's try different word \n<> `,
      `Oops, I didn't hear you, let's move on \n<> `,
      `I didn't get it, We will return to this word later \n<> `,
    ];
  } else {
    sentences = [
      `I don't understand, let's try different word \n<> `,
      `Oops, I didn't hear you, let's move on \n<> `,
      `I didn't get it, We will return to this word later \n<> `,
    ];
  }
  return (
    sentences[Math.floor(Math.random() * sentences.length)] +
    createSentenceExercise(word, language, lazyMode)
  );
}
//! Fail
function createSentenceFailAndRetry(saidWord, expectedWord, lazyMode) {
  let sentences;
  if (lazyMode) {
    sentences = [`you said: <#${saidWord}>, say: <#${expectedWord}>`];
  } else {
    sentences = [`you said: <#${saidWord}>, and you need to say: <#${expectedWord}>, try again`];
  }
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function createSentenceFailAndSkip(saidWord, expectedWord, word, language, lazyMode) {
  let sentences;
  if (lazyMode) {
    sentences = [
      `you said: <#${saidWord}>, and you need to say: <#${expectedWord}>, We will return to this word later \n<> `,
    ];
  } else {
    sentences = [
      `you said: <#${saidWord}>, and you need to say: <#${expectedWord}>, We will return to this word later \n<> `,
    ];
  }
  return (
    sentences[Math.floor(Math.random() * sentences.length)] +
    createSentenceExercise(word, language, lazyMode)
  );
}
//! Success
function createSentenceSuccess(userFirstName, lazyMode) {
  let sentences;
  if (lazyMode) {
    sentences = ["Good job!", `Correct`, `Nice!`];
  } else {
    sentences = [
      " Good job! let's move on!",
      ` ${userFirstName} you are amazing! let's go`,
      ` Wow ${userFirstName} you so good!`,
    ];
  }
  return sentences[Math.floor(Math.random() * sentences.length)];
}

module.exports.createSentenceExercise = createSentenceExercise;
module.exports.createSentenceDoNot = createSentenceDoNot;
module.exports.createSentenceDoNotAndNext = createSentenceDoNotAndNext;
module.exports.createSentenceFailAndRetry = createSentenceFailAndRetry;
module.exports.createSentenceFailAndSkip = createSentenceFailAndSkip;
module.exports.createSentenceSuccess = createSentenceSuccess;
