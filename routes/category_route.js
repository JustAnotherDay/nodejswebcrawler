const express = require("express");
const router = express.Router();
const {
  GetCategories,
  GetCategoriesByDay,
} = require("../controllers/lottoCategoryController");

/**
 * @swagger
 * /categories/:
 *  get:
 *      description: Use to request all lotto categories
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - categories
 */
router.get("/", GetCategories);

/**
 * @swagger
 * paths:
 *   /categories/{day}:
 *    get:
 *        description: Use to request lotto categories by day separated by comma.
 *        parameters:
 *          - in: path
 *            name: day
 *            schema:
 *              type: string
 *            description: The day of week (Monday, Tuesday, etc). Can be separated by comma
 *        responses:
 *          '200':
 *            description: A successfull response
 *        tags:
 *           - categories
 */
router.get("/:day", GetCategoriesByDay);

module.exports = router;
