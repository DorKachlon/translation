const { text2speech } = require("../google-api/text2speech");
const { translate } = require("./translation");
const { SpeechCache } = require("../models");
const { cleanText } = require("./cleanText");
const fs = require("fs");
const hash = require("object-hash");
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
    // const text = cleanText(dirtyText);
    //!first way used DB
    // const speechDb = await SpeechCache.findOne({ where: { text, languageId: language.id } });
    // if (speechDb) {
    //   speech = fs.readFileSync(`${__dirname}/../speechCache/${speechDb.fileName}.txt`, "utf8");
    //   return speech;
    // }
    //!second way used fs
    const fileName = hash({ text, languageId: language.id, languageVoice: language.voice });
    if (fs.existsSync(`${__dirname}/../speechCache/${fileName}.txt`)) {
      speech = fs.readFileSync(`${__dirname}/../speechCache/${fileName}.txt`, "utf8");
      return speech;
    }

    console.log(`request speech from google api for: ${text}`);
    speech = await text2speech({
      inputText: text,
      languageCode: language.code,
      voiceName: language.voice,
    });
    const speechCache = {
      text,
      languageId: language.id,
      fileName: hash({ text, languageId: language.id, languageVoice: language.voice }),
    };
    fs.writeFile(`${__dirname}/../speechCache/${speechCache.fileName}.txt`, speech, () =>
      SpeechCache.create(speechCache)
    );

    return speech;
  } catch (error) {
    console.error(error);
  }
}

module.exports.createSpeech = createSpeech;
