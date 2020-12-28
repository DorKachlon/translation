function cleanText(text) {
  let specialChars = "!@#$^&%*()+=-[]/{}|:<>?,.";
  for (var i = 0; i < specialChars.length; i++) {
    text = text.replace(new RegExp("\\" + specialChars[i], "gi"), "");
  }
  return text.trim();
}

module.exports.cleanText = cleanText;
