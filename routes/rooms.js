const express = require(`express`);
const router = express.Router();
const roomController = require("../controllers/RoomController");

router.get("/", roomController.findAll);
router.get("/connect", roomController.connectCall);
// router.post("/", roomController);
// router.delete("/", roomController);

module.exports = router;
