const { Router } = require("express");
const multer = require("multer");
const { speech2text } = require("../../google-api/speech2text");
const { User, Language, Word, Progress } = require("../../models");
const { Op } = require("sequelize");
const router = Router();
const upload = multer();


 //!-----------------------------------לא בשימוש ----------------------------------------------
 //!-----------------------------------לא בשימוש ----------------------------------------------
 //!-----------------------------------לא בשימוש ----------------------------------------------


router.post("/", upload.any(), async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});
 //!-----------------------------------לא בשימוש ----------------------------------------------
 //!-----------------------------------לא בשימוש ----------------------------------------------
 //!-----------------------------------לא בשימוש ----------------------------------------------

module.exports = router;
