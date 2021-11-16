var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send({
    title: "Central",
    version: "0.1",
    auth: "CorpsTeknologi",
  });
});

module.exports = router;
