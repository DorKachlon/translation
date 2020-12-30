const { text2speech } = require("../google-api/text2speech");
const { text2speechAzure } = require("../azure-api/text2speechAzure");
const { translate } = require("./translation");
const { SpeechCache } = require("../models");
const { cleanText } = require("./cleanText");
const fs = require("fs");
const hash = require("object-hash");

const createHash = (s) =>
  s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

const languageForAzure = ["he-IL"];

//text=`you said : <apple> and you need to said <water>, try again`
async function createSpeech(text, l1, l2) {
  const arrTextsAndLanguage = text.split(/[<>]/g).map((partText) => {
    if (partText[0] === "!") {
      return { text: partText.slice(1), language: l2, significance: "word" };
    }
    if (partText[0] === "#") {
      return { text: partText.slice(1), language: l2, noTranslate: true, significance: "word" };
    }
    if (partText[0] === "@") {
      return { text: partText.slice(1), language: l1, significance: "word" };
    }
    return { text: partText, language: l1, significance: "instruction" };
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
          significance: textAndLanguage.significance,
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
    let hash = createHash(text + "|" + language.id + "|" + language.voice);
    let filename = `${__dirname}/../speechCache/${hash}.cache`;
    if (fs.existsSync(filename)) {
      speech = fs.readFileSync(filename, "utf8");
      return speech;
    }
    if (languageForAzure.includes(language.code)) {
      console.log(`request speech from AZURE api for: ${text}`);
      speech = await text2speechAzure(text, language.code, language.voice);
    } else {
      console.log(`request speech from google api for: ${text}`);
      speech = await text2speech({
        inputText: text,
        languageCode: language.code,
        voiceName: language.voice,
      });
    }
    const speechCache = {
      text,
      languageId: language.id,
      fileName: hash, // todo: change property to hash
    };
    fs.writeFile(filename, speech, () => SpeechCache.create(speechCache));

    return speech;
  } catch (error) {
    console.error(error);
  }
}

module.exports.createSpeech = createSpeech;
