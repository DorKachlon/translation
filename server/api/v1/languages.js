const { Language } = require("../../models");
const { Router } = require("express");
const router = Router();

//GET REQUEST
router.get("/", async (req, res) => {
  const allAlbums = await Language.findAll();
  res.json(allAlbums);
});

//POST REQUEST

//PUT REQUEST

//DELETE REQUEST

//DELETE-HARD_DELETION REQUEST

//EXPORT
module.exports = router;
