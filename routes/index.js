const router = require("express").Router();

const userRouter = require("./user");
const courtRouter = require("./court");
const bookRouter = require("./booking");

router.use("/", userRouter);
router.use("/court", courtRouter);
router.use("/book", bookRouter);

module.exports = router;
