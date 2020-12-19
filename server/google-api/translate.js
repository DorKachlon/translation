const { Translate } = require("@google-cloud/translate").v2;
const projectID = "first";
const keyFilename = "./google-api/google-api-keys.json";
const translate = new Translate({ projectID, keyFilename });

async function translateText(text, targetLanguae) {
  const [translation] = await translate.translate(text, targetLanguae.split("-")[0]);
  return translation;
}
module.exports.translateText = translateText;
