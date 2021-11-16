const express = require(`express`);
const router = express.Router();
const LoginController = require("../controllers/LoginController");

// router.get("/", roomController.findAll);
router.post("/", LoginController.login);
// router.post("/", roomController);
// router.delete("/", roomController);

module.exports = router;
