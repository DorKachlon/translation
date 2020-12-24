const { Translate } = require("@google-cloud/translate").v2;
const projectID = "first";
const keyFilename = "./google-api/google-api-keys.json";
const translate = new Translate({ projectID, keyFilename });

async function translateText(text, targetLanguage) {
  const [translation] = await translate.translate(text, targetLanguage.split("-")[0]);
  return translation;
}
module.exports.translateText = translateText;
