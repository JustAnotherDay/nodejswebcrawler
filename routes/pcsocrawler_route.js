const express = require("express");
const router = express.Router();
//const { GetResultAndSendMessageTo, GetResultAndSaveToDb } = require("../services/PcsoResult");
const {
  GetLottoFromPcso,
  CrawlAndSave,
} = require("../controllers/crawlerController");

/**
 * @swagger
 * /services/crawlAndSave:
 *  post:
 *      description: Crawl current PCSO Page then save to MongoDB
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - services
 */
router.post("/crawlAndSave", CrawlAndSave);

/**
 * @swagger
 * /services/crawlCurrentPcsoPage:
 *  get:
 *      description: Crawl current PCSO Page
 *      responses:
 *          '200':
 *              description: Returns an array of of result from current PCSO result website.
 *      tags:
 *          - services
 */
router.get("/crawlCurrentPcsoPage", GetLottoFromPcso);

module.exports = router;
