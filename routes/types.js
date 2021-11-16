const express = require("express");
const router = express.Router();

const TypeController = require("../controllers/TypeController");

router.get("/", TypeController.findAll);
router.post("/", TypeController.save);
router.put("/:id", TypeController.update);
router.delete("/:id", TypeController.destroy);

module.exports = router;
