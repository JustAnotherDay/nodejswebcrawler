const Lotto = require("../models/lotto_result");

exports.getLottoResult = (req, res) => {
  console.log(
    "RETRIEVING lotto result for today " + new Date(),
    req.body
  );
  var queryFilters = req.query;
  const id = req.params.id;
  console.log(queryFilters);
  if (id) queryFilters._id = id;

  Lotto.find({ ...queryFilters })
    .then((result) => {
      res.json({ result });
    });
};
