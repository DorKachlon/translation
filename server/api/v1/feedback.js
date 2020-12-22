const { Router } = require("express");
const multer = require("multer");
const { speech2text } = require("../../google-api/speech2text");
const { User, Language, Word, Progress } = require("../../models");
const { Op } = require("sequelize");

const router = Router();
const upload = multer();

router.post("/", upload.any(), async (req, res) => {
  try {
    progressByUser = await Progress.findAll({
      where: { userId: 1, languageId: 1 },
      // order: [["wordId", "ASC"]],
    });
    // res.json(progressByUser);
    const allWords = await Word.findAll();
    // const nextWordId = progressByUser[progressByUser.length - 1].wordId + 1;
    const nextWordId = CheckIfTooManyTries(progressByUser, allWords.length);
    res.json(nextWordId);

    // if (nextWordId <= allWords.length) {
    //   nextWordById = await Word.findOne({
    //     where: { id: nextWordId },
    //     attributes: ["id", "word", "languageId", "createdAt", "updatedAt"],
    //   });
    // res.json({ word: nextWordById.word, wordId: nextWordById.id });
    // }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

function CheckIfTooManyTries(progressByUser, allWordsLanguage) {
  const langthOfProgress = progressByUser.length;
  if (langthOfProgress < 5) {
    return langthOfProgress + 1;
  }
  const item = progressByUser[langthOfProgress - 1]; //last
  const item2 = progressByUser[langthOfProgress - 2]; //1 from last
  const item3 = progressByUser[langthOfProgress - 3]; //2 from last

  if (item.score === 0) {
    if (item2.score === 0) {
      if (item3.score === 0) {
        //שלושת האחרונים אפס
        //צריך לבדוק אם כולם אותו וורדאידי
        //אם כן עוברים למילה הבאה
        //אם לא מחזירים את האידי של האחרון
        if (item.wordId === item2.wordId && item2.wordId === item3.wordId) {
          //כולם אותו אידיי, מה שאומר שהמשתמש ניסה שלוש פעמים אותו מילה ברץף וכשל
          //עוברים למילה הבאה
          //!
          return findNextWordId(progressByUser, item.wordId, allWordsLanguage);
        } else {
          //לא כולם אידיי, מהשאומר שכנראה המשתמש כשל במילה הקודמת ונכשל גם במילה החדשה
          //ממשיכים עם אותה מילה עד שיכשל 3 פעמים גם בה
          return item.wordId;
        }
      } else {
        //שני האחורנים אפס אבל זה שלפניהם לא
        //מחזיר את האידיי של האחרון
        return item.wordId;
      }
    } else {
      //האחרון אפס אבל לפני האחרון לא
      //מחזיר את האידיי של האחרון
      return item.wordId;
    }
  } else {
    //האחרון הצליח אז צריך למצוא את האידי הבא או לחזור חמש אחורה
    //!
    return findNextWordId(progressByUser, item.wordId, allWordsLanguage);
  }
}

function findNextWordId(progressByUser, wordId, allWordsLanguage) {
  //צריך לבדוק אם מתחלק בחמש ללא שארית וצריך לחזור אחורה
  if (wordId % 5 === 0) {
    //צריך לבדוק אם ה-5 בוצע פעמיים,
    //אם לא להחזיר אותו
    for (let i = 4; i >= 0; i--) {
      const filterArr = progressByUser.filter((obj) => obj.wordId === wordId - i);
      let counter = 0;
      for (let obj of filterArr) {
        counter += obj.score;
      }
      if (counter !== 20) {
        return wordId - i;
      }
    }
    //!לשנות את זה בהזדמנות
    if (allWordsLanguage === wordId) {
      return 1; //אם זה האחרון תחזיר את הראשון
    }
    return wordId + 1; // אם לא תחזיר את ההבא
  } else {
    //לא מתחלק בחמש משמע לא צריך לחזור אחורה
    //נבדוק אם יש לאן לקדם ואם לא נחזיר את הראשון
    //!לשנות את זה בהזדמנות
    if (allWordsLanguage === wordId) {
      return 1; //אם זה האחרון תחזיר את הראשון
    }
    return wordId + 1; // אם לא תחזיר את ההבא
  }
}

module.exports = router;
