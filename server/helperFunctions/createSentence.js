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
  const instruction = `<#"${expectedWord}"> means <@"${word}".> Repeat: <#${expectedWord}>`;
  if (lazyMode) {
    sentences = [`Sorry?` + instruction, `Come again?` + instruction, `Huh?` + instruction];
  } else {
    sentences = [
      `I can't understand, try again.\n<>` + instruction,
      `Oops, I couldn't hear you.\n<>` + instruction,
      `Sorry, I didn't get it.\n<>` + instruction,
    ];
  }
  return sentences[Math.floor(Math.random() * sentences.length)];
}
function createSentenceDoNotAndNext(word, language, lazyMode) {
  let sentences;
  if (lazyMode) {
    sentences = [
      `Let's try a different word\n<>`,
      `Let's skip this one\n<>`,
      `We'll come back to this one later\n<>`,
    ];
  } else {
    sentences = [
      `I can't understand, let's try a different word\n<>`,
      `Oops, I couldn't hear you, let's skip this one\n<>`,
      `I can't get it, We will come back to this one later\n<>`,
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
    sentences = [`<#"${expectedWord}">, not <#"${saidWord}">`];
  } else {
    sentences = [`I heard <#"${saidWord}">, but expected: <#"${expectedWord}".> Try again`];
  }
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function createSentenceFailAndSkip(saidWord, expectedWord, word, language, lazyMode) {
  let sentences;
  if (lazyMode) {
    sentences = [
      `<#"${expectedWord}">, not <#"${saidWord}">, We will return to this word later<> `,
    ];
  } else {
    sentences = [
      `I heard "<#${saidWord}>", but expected: "<#${expectedWord}>", We will return to this word later<> `,
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
      ` ${userFirstName}, You are amazing! let's continue`,
      ` Wow ${userFirstName}, That's great!`,
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
