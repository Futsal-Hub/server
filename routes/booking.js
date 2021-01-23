const BookingController = require("../controllers/bookingController");
const router = require("express").Router();

router.get("/", BookingController.findAll);
router.get("/:id", BookingController.findOne);
router.put("/:id", BookingController.update);
router.delete("/:id", BookingController.destroy);
router.post("/", BookingController.create);

module.exports = router;
