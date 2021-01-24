const router = require("express").Router();

const ownerRouter = require("./owner");
const playerRouter = require("./player");
const courtRouter = require("./court");
const requestRouter = require("./request");
const bookingRouter = require("./booking");

router.use("/owner", ownerRouter);
router.use("/player", playerRouter);
router.use("/court", courtRouter);
router.use("/request", requestRouter);
router.use("/booking", bookingRouter);

module.exports = router;
