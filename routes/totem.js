const express = require("express");
const TotemController = require("../controllers/TotemController");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const resp = await TotemController.findAll();
  res.json(resp);
});
router.get("/:id", async (req, res, next) => {
  const key = req.params.id;
  const resp = await TotemController.findOne(key);
  res.json(resp);
});
router.post("/", async (req, res, next) => {
  const resp = await TotemController.save(req.body);
  res.json(resp);
});

router.put("/:id", async (req, res, next) => {
  const key = req.params.id;
  const resp = await TotemController.update(key, req.body);

  res.json(resp);
});
router.delete("/:id", async (req, res, next) => {
  const key = req.params.id;
  const resp = await TotemController.destroy(key);

  res.json(resp);
});

module.exports = router;
