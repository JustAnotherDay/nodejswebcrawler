const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 *  definitions:
 *    Category:
 *      type: object
 *      properties:
 *          short_name:
 *            type: string
 *            description: Category shortname used in filter
 *          long_shortname:
 *            type: string
 *            description: Fullname of the category
 *          draw_date:
 *            type: string
 *            description: Draw date
 *      example:
 *        short_name: "645"
 *        long_shortname: "Megalotto 6/45"
 *        draw_date:  "1/1/2020"
 */
const lottoCategorySchema = new Schema(
  {
    short_name: {type: String, unique: true, index: true},
    long_name: String,
    draw_date:  {
        day: String
    }
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", lottoCategorySchema);

module.exports = Category;
