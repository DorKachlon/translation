const { User, Language } = require("../../models");
const { Router } = require("express");
const router = Router();

//GET REQUEST
router.get("/", async (req, res) => {});

router.get("/languages", async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: { id: 1 },
      include: [
        { model: Language, as: "nativeLanguage" },
        { model: Language, as: "currentLanguage" },
      ],
    });
    res.json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});
//POST REQUEST
router.post("/", async (req, res) => {});

//PUT REQUEST
router.put("/", async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: 1,
      },
    });
    res.json({ message: "User Info Updated" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

//DELETE REQUEST
router.delete("/", async (req, res) => {});

//DELETE-HARD_DELETION REQUEST

//EXPORT
module.exports = router;
