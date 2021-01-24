const router = require("express").Router();

const userRouter = require("./user");
const courtRouter = require("./court");
const requestRouter = require("./request");
const bookingRouter = require("./booking");

router.use("/", userRouter);
router.use("/court", courtRouter);
router.use("/request", requestRouter);
router.use("/booking", bookingRouter);

module.exports = router;
