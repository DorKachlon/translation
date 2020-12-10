const { Router } = require("express");
const router = Router();

router.use("/translation", require("./translation"));
router.use("/exercise", require("./exercise"));
router.use("/feedback", require("./feedback"));

module.exports = router;
