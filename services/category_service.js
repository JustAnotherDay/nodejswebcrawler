const Category = require("../models/lotto_category");
const cachegoose = require('cachegoose');


function GetCategories(req = null) {
  var queryFilters = req == null ? "" : req.query;
  //console.log("GetCategories " + new Date());
  
  return Category.find({ ...queryFilters })
  .cache(0, 'CATEGORIES')
  .exec()
}

function GetCategoriesByDay(req) {
  //console.log("GetCategoriesByDay " + new Date());
  const days = req.params.day;
  console.log(days);
  const regex_days = days
    .split(",")
    .map((d) => {
      if (d.length > 0) return "(?=.*" + d + ")";
    })
    .join("");

  return Category.find(
    {
      "draw_date.day": {
        $regex: "^" + regex_days,
        $options: "i,m",
      },
    },
    ["short_name", "long_name", "draw_date"]
  )
    .sort("id")
    .then((result) => {
      return result;
    });
}

module.exports = { GetCategories, GetCategoriesByDay };
