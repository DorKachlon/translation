const { Router } = require("express");
const router = Router();
const { speech2text } = require("../../speech2text");

router.post("/", async (req, res) => {
  await speech2text();
});

module.exports = router;
