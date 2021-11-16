const express = require("express");
const router = express.Router();

const CompanyController = require("../controllers/CompanyController");

router.get("/", CompanyController.findAll);
router.get("/:id", CompanyController.findOne);
router.post("/", CompanyController.create);
router.put("/:id", CompanyController.update);
router.delete("/:id", CompanyController.destroy);

module.exports = router;
