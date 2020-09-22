const category_service = require("../services/category_service");

exports.GetCategories = (req, res) => {
  category_service.GetCategories(req).then((result) => {
    res.json({ result });
  });
};

exports.GetCategoriesByDay = (req, res) => {
  
  category_service.GetCategoriesByDay(req).then((result) => {
    console.log("RESULT START");
    console.log(result);
    console.log("RESULT END");
    res.json({ result });
  });
};
