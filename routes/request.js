const RequestController = require("../controllers/requestController");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.post("/", RequestController.create);
router.get("/sent/:userId", RequestController.findAllSent);
router.get("/received/:userId", RequestController.findAllReceived);
router.put("/:id", RequestController.update);
router.patch("/:id", RequestController.updateStatus);
router.delete("/:id", RequestController.destroy);

module.exports = router;
