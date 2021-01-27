const BookingController = require("../controllers/bookingController");
const router = require("express").Router();
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get("/", BookingController.findAll);
router.get("/:id", BookingController.findOne);
router.get("/owner/:ownerId", BookingController.findByOwner);
router.get("/player/:playerId", BookingController.findByPlayer);
router.put("/:id", BookingController.update);
router.delete("/:id", BookingController.destroy);
router.post("/", BookingController.create);
router.patch("/:id", BookingController.updatePlayers);

module.exports = router;
