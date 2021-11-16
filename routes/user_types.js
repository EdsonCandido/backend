const express = require("express");
const router = express.Router();

const UserTypeController = require("../controllers/UserTypeController");

router.get("/", UserTypeController.findAll);
router.get("/:id", UserTypeController.findOne);
router.post("/", UserTypeController.save);
router.delete("/:id", UserTypeController.destroy);

module.exports = router;
