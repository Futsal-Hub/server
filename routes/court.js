const router = require("express").Router();
const CourtController = require("../controllers/courtController");
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get("/", CourtController.findAll);
router.get("/:id", CourtController.findOne)
router.put("/:id", CourtController.update);
router.delete("/:id", CourtController.destroy);
router.post("/", CourtController.create);

module.exports = router;
