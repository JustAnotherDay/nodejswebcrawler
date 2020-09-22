const express = require("express");
const router = express.Router();
const { getLottoFromPcso, getLottoResult } = require("../controllers/lottoResultController");


/**
 * @swagger
 * /results/:
 *  get:
 *      description: Use to request lotto result dating from August 9, 2020 to latest
 *      responses:
 *          '200': 
 *              description: A successfull response
  *      tags:
 *          - results
 */
router.get("/", getLottoResult);

module.exports = router;