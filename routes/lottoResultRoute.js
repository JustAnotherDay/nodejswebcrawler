const express = require("express");
const router = express.Router();
const { getLotto, getLottoCurrent } = require("../controllers/lottoResultController");


router.get("/lotto", getLotto);
router.get("/lotto/current", getLottoCurrent);

module.exports = router;