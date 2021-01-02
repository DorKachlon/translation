const { Router } = require("express");
const router = Router();
const verifyToken = require("../../middleware/verifyToken");
const progressMiddleware = require("../../middleware/progress");
const stop = require("../../middleware/onlyForDevelop");

// router.use("/exercise", stop, verifyToken, progress, require("./exercise"));
// router.use("/answer", stop, verifyToken, progress, require("./answer"));

router.use("/exercise", verifyToken, progressMiddleware, require("./exercise"));
router.use("/answer", verifyToken, progressMiddleware, require("./answer"));

// router.use("/translation", require("./translation"));
// router.use("/feedback", require("./feedback"));
// router.use("/dialog", require("./dialog"));

router.use("/languages", require("./languages"));
router.use("/users", verifyToken, progressMiddleware, require("./users"));
router.use("/auth", require("./authentication"));
router.use("/progress", verifyToken, require("./progress"));
router.use("/create-speech", verifyToken, require("./createSpeech"));

module.exports = router;
