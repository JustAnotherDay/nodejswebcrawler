const rp = require("request-promise");
var cheerio = require("cheerio");
const log = require("./logger");
const { GetCategories } = require("../services/category_service");


var pcso = {
  getPageContent: function () {
    const url = "https://www.pcso.gov.ph/SearchLottoResult.aspx";
    var options = {
      uri: url,
      transform: function (body) {
        return cheerio.load(body);
      },
    };
    return rp(options)
      .then((response) => {
        console.log("Get PCSO Page Success");
        return response;
      })
      .catch((err) => {
        console.log("Get PCSO Page Error", err);
      });
  },
};

function GetCurrentPcsoResultHtmlTable() {
  var cheerioRequest = pcso.getPageContent();
  // return cheerioRequest.then(function ($) {
  //   return (tblResult = $("#cphContainer_cpContent_GridView1").find("tr"));
  // });
  return cheerioRequest;
}

function GetLottoResult() {
  return GetCategories().then((result) => {
    var categories_long_name = result.map(categories => categories.long_name);
    return Promise.resolve(ParsePcsoResultByCategory(categories_long_name));
  }).then((res) =>{
    return res;
  });
}

function ParsePcsoResultByCategory(categories_long_name){
  return GetCurrentPcsoResultHtmlTable().then(($) => {
    var tblResult = $("#cphContainer_cpContent_GridView1").find("tr");
    var lottoResult = [];
    
    tblResult.each((i, e) => {
      var rowCounter = 0;
      var category = "";
      var resultDetails = [];
      
      //parse table to get columns
      $(e)
        .find("td")
        .each((i, et) => {
          const rowText = $(et).html().trim();
            const isCategory = IsCategory(categories_long_name, rowText);

            if (isCategory) category = rowText;
            if (rowCounter < 3 && !isCategory) resultDetails.push(rowText);
            rowCounter++;
          
        });

      if (resultDetails.length > 0) {
        if (!IsExists(lottoResult, category)) log.debug(lottoResult);
        lottoResult.push({
          category,
          numbers: resultDetails[0],
          date: resultDetails[1],
        });
      }
    });
    return lottoResult;
  }).then((result) => {
    console.log("Get Table Of Pcso Result Success");
    return result;
  })
  .catch((err) => {
    console.log("Get Table Of Pcso Result Error", err);
  });
}

function IsCategory(categories, text) {
  if (categories.indexOf(text) >= 0) return true;
  else return false;
    // [
    //   "EZ2 Lotto 11AM",
    //   "EZ2 Lotto 4PM",
    //   "EZ2 Lotto 9PM",
    //   "Suertres Lotto 11AM",
    //   "Suertres Lotto 4PM",
    //   "Suertres Lotto 9PM",
    //   "4Digit",
    //   "6Digit",
    //   "Lotto 6/42",
    //   "Megalotto 6/45",
    //   "Superlotto 6/49",
    //   "Grand Lotto 6/55",
    //   "Ultra Lotto 6/58"
    // ];
}

function IsExists(currentList, item) {
  for (let i = 0; i < currentList.length; i++) {
    if (currentList[i].category.trim() == item) return true;
  }
}

module.exports = { GetLottoResult };
