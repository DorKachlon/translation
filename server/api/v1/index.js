const { Router } = require("express");
const router = Router();
const verifyToken = require("../../middleware/verifyToken");

// router.use("/translation", require("./translation"));

router.use("/exercise", verifyToken, require("./exercise"));
router.use("/answer", verifyToken, require("./answer"));
// router.use("/feedback", require("./feedback"));

// router.use("/dialog", require("./dialog"));

router.use("/languages", require("./languages"));
router.use("/users", verifyToken, require("./users"));
router.use("/auth", require("./authentication"));

module.exports = router;
