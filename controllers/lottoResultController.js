const crawler = require("../services/webcrawler");
const Lotto = require("../models/lottoResultModel");

exports.getLotto = (req, res) => {
  console.log("RETRIEVING TODO", req.body);
  var queryFilters = req.query;
  const id = req.params.id;
  console.log(queryFilters);

  if(id)
    queryFilters._id = id;

  Lotto.find({...queryFilters}).then(result => {
    res.json({ result });
  });
};

exports.getLottoCurrent = (req, res) => {
  crawler.GetLottoResult().then(result => {
    const lottoResult = result;
    res.json({ lottoResult });
  });
};
