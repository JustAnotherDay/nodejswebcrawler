const crawler = require("../services/webcrawler");

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
          return crawler.SaveResultToDb(result);
        });
      })
      .then(() => {
        res.json("Success");
      }).catch(err => {
        console.log(err);
        res.json("Fail");
      });

};

