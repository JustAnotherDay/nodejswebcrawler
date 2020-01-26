const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lottoResultSchema = new Schema({
  category: String,
  date: String,
  numbers: String
}, { timestamps: true });

const Result = mongoose.model("LottoResult", lottoResultSchema);

module.exports = Result;
