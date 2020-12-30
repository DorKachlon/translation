/*
!-translate and make speech in l2 & this word and not instruction
#-do not translate and make speech in l2 & this word and not instruction
@-translate and make speech in l1 & this word and not instruction
*/

//! Exercise
function createSentenceExercise(word, language) {
  const sentences = [
    `the word <@${word}> is <!${word}>, repeat <!${word}>`,
    `<@${word}> in ${language}, is it: <!${word}> can you say: <!${word}?>`,
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}
//! Do not understand
function createSentenceDoNot(word, expectedWord) {
  const sentences = [
    `I don't understand, try again \n<> the word: <@${word}> it is: <#${expectedWord}>, try to say: <#${expectedWord}>`,
    `Oops, I didn't hear you \n<> the word: <@${word}> it is: <#${expectedWord}>, try to say: <#${expectedWord}>`,
    `what did you said? I didn't get it \n<> the word: <@${word}> it is: <#${expectedWord}>, try to say: <#${expectedWord}>`,
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}
function createSentenceDoNotAndNext(word, language) {
  const sentences = [
    `I don't understand, let's try different word \n<> `,
    `Oops, I didn't hear you, let's move on \n<> `,
    `I didn't get it, We will return to this word later \n<> `,
  ];
  return (
    sentences[Math.floor(Math.random() * sentences.length)] + createSentenceExercise(word, language)
  );
}
//! Fail
function createSentenceFailAndRetry(saidWord, expectedWord) {
  const sentences = [
    `you said: <#${saidWord}>, and you need to say: <#${expectedWord}>, try again>`,
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function createSentenceFailAndSkip(saidWord, expectedWord, word, language) {
  const sentences = [
    `you said: <#${saidWord}>, and you need to say: <#${expectedWord}>, We will return to this word later \n<> `,
  ];
  return (
    sentences[Math.floor(Math.random() * sentences.length)] + createSentenceExercise(word, language)
  );
}
//! Success
function createSentenceSuccess(userFirstName) {
  const sentences = [
    " good job! let's move on!",
    ` ${userFirstName} you are amazing! let's go`,
    ` Wow ${userFirstName} you so good!`,
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

module.exports.createSentenceExercise = createSentenceExercise;
module.exports.createSentenceDoNot = createSentenceDoNot;
module.exports.createSentenceDoNotAndNext = createSentenceDoNotAndNext;
module.exports.createSentenceFailAndRetry = createSentenceFailAndRetry;
module.exports.createSentenceFailAndSkip = createSentenceFailAndSkip;
module.exports.createSentenceSuccess = createSentenceSuccess;
