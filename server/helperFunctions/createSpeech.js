const { text2speech } = require("../google-api/text2speech");
const { translate } = require("./translation");
const { SpeechCache } = require("../models");
const fs = require("fs").promises;

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
          base64: await speechHelper(textAfterTranslation, textAndLanguage.language),
          itsWord: textAndLanguage.itsWord,
        });
      }
    }
    return arrOfAudio;
  } catch (error) {
    console.error(error);
  }
}

async function speechHelper(text, language) {
  try {
    let speech;
    const speechDb = await SpeechCache.findOne({ where: { text, languageId: language.id } });
    if (speechDb) {
      speech = await fs.readFile(`${__dirname}/../speechCache/${speechDb.fileName}.json`);
      return JSON.parse(speech).base64;
    }
    console.log(`request speech from google api for: ${text}`);
    speech = await text2speech({
      inputText: text,
      languageCode: language.code,
      voiceName: language.voice,
    });
    const obj = {
      text,
      languageId: language.id,
      fileName: new Date().getTime().toString(),
    };
    await fs.writeFile(
      `${__dirname}/../speechCache/${obj.fileName}.json`,
      JSON.stringify({ base64: speech })
    );
    await SpeechCache.create(obj);
    return speech;
  } catch (error) {
    console.error(error);
  }
}

module.exports.createSpeech = createSpeech;
