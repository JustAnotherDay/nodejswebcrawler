const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 *  definitions:
 *    LottoResult:
 *      type: object
 *      properties:
 *          category:
 *            type: string
 *            description: Lotto category e.g. 645(Megalotto 6/45), 655(Grand Lotto 6/55)
 *          numbers:
 *            type: string
 *            description: Winning combination separated by - (dash).
 *          date:
 *            type: string
 *            format: date
 *            description: Date format dd/mm/yyyy
 *      example:
 *        category: "Megalotto 6/45"
 *        numbers: "00-00-00-00-00-00"
 *        date:  "1/1/2020"
 */
const lottoResultSchema = new Schema(
  {
    category: String,
    date: String,
    numbers: String,
  },
  { timestamps: true }
);

const Result = mongoose.model("LottoResult", lottoResultSchema);

module.exports = Result;
