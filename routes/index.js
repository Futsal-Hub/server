const router = require("express").Router();

const ownerRouter = require("./owner");
const playerRouter = require("./player");
const courtRouter = require("./court");

router.use("/owner", ownerRouter);
router.use("/player", playerRouter);
router.use("/court", courtRouter);

module.exports = router;
