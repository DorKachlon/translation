const { translateText } = require("../google-api/translate");
const { text2speech } = require("../google-api/text2speech");

//text=`you said : <apple> and you need to said <water>, try again`

async function createSpeech(text, l1, l2) {
  const arrTextsAndLanguage = text
    .split(/[<>]/g)
    .map((partText, i) =>
      partText[0] === "!"
        ? { text: partText.slice(1), language: l2 }
        : { text: partText, language: l1 }
    );
  try {
    let arrOfAudio = [];
    for (const textAndLanguage of arrTextsAndLanguage) {
      //TODO - to create word cache and check before translation
      const textAfterTransition = await translateText(
        textAndLanguage.text,
        textAndLanguage.language.code
      );
      arrOfAudio.push({
        text: textAfterTransition,
        base64: await text2speech({
          inputText: textAfterTransition,
          languageCode: textAndLanguage.language.code,
          voiceName: textAndLanguage.language.voice,
        }),
        itsWord: textAndLanguage.itsWord,
      });
    }
    return arrOfAudio;
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
}
module.exports.createSpeech = createSpeech;
