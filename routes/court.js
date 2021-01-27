const router = require("express").Router();
const CourtController = require("../controllers/courtController");
const authentication = require("../middlewares/authentication");
const multer = require("../config/multer");
const storage = multer.diskStorage({
  destination: "./testPhoto/",
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.use(authentication);
router.get("/", CourtController.findAll);
router.get("/:id", CourtController.findOne);
router.get("/owner/:ownerId", CourtController.findByOwner);
router.put("/:id", upload.single("photos"), CourtController.update);
router.delete("/:id", CourtController.destroy);
router.post("/", upload.single("photos"), CourtController.create);

module.exports = router;
