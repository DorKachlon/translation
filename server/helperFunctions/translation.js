const { translateText } = require("../google-api/translate");
const { TextCache } = require("../models");

async function translate(text, language) {
  try {
    //if its english return as is
    if (language.language === "English") {
      return text;
    }
    //check if we translated in the past and return the value
    const fromDB = await TextCache.findOne({ where: { text, languageId: language.id } });
    if (fromDB) {
      return fromDB.textAfterTranslation;
    }
    //if we didn't, lets translate with google api and save it
    const textAfterTranslation = await translateText(text, language.code);
    const obj = {
      text,
      languageId: language.id,
      textAfterTranslation,
    };
    await TextCache.create(obj);
    return textAfterTranslation;
  } catch (error) {
    console.error(error);
  }
}

module.exports.translate = translate;
