const crawler = require("../services/webcrawler");
const LottoResult = require("../models/lotto_result");
const LottoCategory = require("../models/lotto_category");

exports.GetLottoFromPcso = (req, res) => {
  console.log(
    "RETRIEVING Current Lotto Result from official website " + new Date()
  );

  return crawler.GetLottoResult().then((result) => {
    res.json({ result });
  });
};

exports.CrawlAndSave = (req, res) => {
  console.log(
    "RETRIEVING Current Lotto Result from official website and save to DB " +
      new Date()
  );
    return crawler
      .GetLottoResult()
      .then((lotto_results) => {
        lotto_results.map((result) => {
          return SaveResultToDb(result);
        });
      })
      .then(() => {
        res.json("Success");
      }).catch(err => {
        console.log(err);
        res.json("Fail");
      });

};

SaveResultToDb = (lottoResult) => {
  console.log("New LottoResult", lottoResult);

  return LottoResult.findOne({
    category: lottoResult.category,
    date: lottoResult.date,
  })
    .then((result) => {
      if (!result) {
        //insert
        new LottoResult(lottoResult).save().then((result) => {
          return result;
        });
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
};
