const { translateText } = require("../google-api/translate");
const { TextCache, Language } = require("../models");

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
    TextCache.create(obj);
    return textAfterTranslation;
  } catch (error) {
    console.error(error);
  }
}

async function translateWordByLanguageId(word, LanguageId) {
  try {
    const CurrentLanguageInfo = await getLanguageInfo(LanguageId);
    return await translate(word, CurrentLanguageInfo);
  } catch (e) {
    console.error(e);
  }
}

async function getLanguageInfo(id) {
  try {
    const languageInfo = await Language.findOne({
      where: { id },
    });
    return languageInfo;
  } catch (e) {
    console.error(e);
  }
}

module.exports.translate = translate;
module.exports.translateWordByLanguageId = translateWordByLanguageId;
