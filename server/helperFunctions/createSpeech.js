const { text2speech } = require("../google-api/text2speech");
const { translate } = require("./translation");

//text=`you said : <apple> and you need to said <water>, try again`
async function createSpeech(text, l1, l2) {
  const arrTextsAndLanguage = text.split(/[<>]/g).map((partText, i) => {
    if (partText[0] === "!") {
      return { text: partText.slice(1), language: l2 };
    } else if (partText[0] === "#") {
      return { text: partText.slice(1), language: l2, noTranslate: true };
    } else {
      return { text: partText, language: l1 };
    }
  });
  try {
    let arrOfAudio = [];
    for (const textAndLanguage of arrTextsAndLanguage) {
      if (textAndLanguage.text !== "") {
        let textAfterTranslation;
        if (textAndLanguage.noTranslate) {
          textAfterTranslation = textAndLanguage.text;
        } else {
          textAfterTranslation = await translate(textAndLanguage.text, textAndLanguage.language);
        }

        arrOfAudio.push({
          text: textAfterTranslation,
          base64: await text2speech({
            inputText: textAfterTranslation,
            languageCode: textAndLanguage.language.code,
            voiceName: textAndLanguage.language.voice,
          }),
          itsWord: textAndLanguage.itsWord,
        });
      }
    }
    return arrOfAudio;
  } catch (error) {
    console.error(error);
  }
}
module.exports.createSpeech = createSpeech;
