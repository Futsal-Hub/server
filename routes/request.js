const RequestController = require("../controllers/requestController");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/sent/:userId", RequestController.findAllSent);
router.get("/received/:userId", RequestController.findAllReceived);
router.put("/:id", RequestController.update);
router.delete("/:id", RequestController.destroy);
router.post("/", RequestController.create);

module.exports = router;
