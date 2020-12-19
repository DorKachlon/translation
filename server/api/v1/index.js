const { Router } = require("express");
const router = Router();

router.use("/translation", require("./translation"));
router.use("/exercise", require("./exercise"));
router.use("/feedback", require("./feedback"));
router.use("/dialog", require("./dialog"));

router.use("/languages", require("./languages"));
router.use("/users", require("./users"));

module.exports = router;
