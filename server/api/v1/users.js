const {User, Language, Progress, UserLanguages} = require("../../models");
const {Router} = require("express");
const router = Router();
const {findWordsToLearn} = require("../../helperFunctions/findWordsToLearn");
//GET REQUEST
router.get("/", async (req, res) => {
    try {
        const userInfo = await User.findOne({
            where: {id: req.user.id},
            include: [
                {model: Language, as: "nativeLanguage"},
                {model: Language, as: "currentLanguage"},
            ],
        });
        res.json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Cannot process request"});
    }
});

router.get("/languages", async (req, res) => {
    try {
        const userInfo = await User.findOne({
            where: {id: req.user.id},
            include: [
                {model: Language, as: "nativeLanguage"},
                {model: Language, as: "currentLanguage"},
            ],
        });
        res.json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Cannot process request"});
    }
});

router.get("/progress/languages", async (req, res) => {
    try {
        const languages = await Progress.findAll({
            where: {userId: req.user.id},
            attributes: ["userId"],
            group: "language_id",
            include: [{model: Language, as: "language"}],
        });
        const float = languages.map((language) => language.language);
        res.json(float);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Cannot process request"});
    }
});

router.get("/learning-languages", async (req, res) => {
    try {
        const languages = await UserLanguages.findAll({
            where: {userId: req.user.id},
            include: [{model: Language}],
        });
        const float = languages.map((language) => language.Language);
        res.json(float);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Cannot process request"});
    }
});


router.get("/modes", async (req, res) => {
    try {
        const userInfo = await User.findOne({
            where: {id: req.user.id},
            attributes: ["manualMode", "lazyMode", "chatMode"],
        });
        res.json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Cannot process request"});
    }
});
//POST REQUEST
router.post("/", async (req, res) => {
});

//PUT REQUEST
router.put("/", async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.user.id,
            },
        });
        const {currentLanguageId} = req.body;
        if (currentLanguageId) {
            const currentLearnWords = await findWordsToLearn(req.user.id, currentLanguageId);
            req.userProgress.setCurrentLearnWords(currentLearnWords);
        }
        res.json({message: "User Info Updated"});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Cannot process request"});
    }
});

//DELETE REQUEST
router.delete("/", async (req, res) => {
});

//DELETE-HARD_DELETION REQUEST

//EXPORT
module.exports = router;
