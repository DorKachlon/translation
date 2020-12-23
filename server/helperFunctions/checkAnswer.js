function checkAnswer(saidWord, expectedWord) {
  if (saidWord.text === "") {
    return { success: false, answerStatus: "empty", retry: true };
  }
  if (saidWord.text.toUpperCase() === expectedWord.text.toUpperCase()) {
    //TODO - או שחוזרים למילה קודמת backToLearn
    //TODO - או שממשיכים למילה הבאה nextWord
    return { success: true, retry: false };
  } else {
    //TODO - או שחוזרים למילה קודמת backToLearn
    //TODO - או שממשיכים למילה הבאה nextWord
    //TODO - או שמנסים שוב tryAgain
    return {
      success: false,
      retry: false,
    };
  }
}
