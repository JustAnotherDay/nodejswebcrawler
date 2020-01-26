const rp = require("request-promise");
var cheerio = require("cheerio");
const log = require("./logger");

var pcso = {
  getPageContent: function() {
    const url = "https://www.pcso.gov.ph/SearchLottoResult.aspx";
    var options = {
      uri: url,
      transform: function(body) {
        return cheerio.load(body);
      }
    };
    return rp(options)
      .then(response => {
        console.log("Get PCSO Page Success");
        return response;
      })
      .catch(err => {
        console.log("Get PCSO Page Error", err);
      });
  }
};

function GetLottoResult() {
  var cheerioRequest = pcso.getPageContent();
  return cheerioRequest
    .then(function($) {
      var tblResult = $("#cphContainer_cpContent_GridView1").find("tr");
      var lottoResult = [];
      tblResult.each((i, e) => {
        var rowCounter = 0;
        var category = "";
        var resultDetails = [];

        $(e)
          .find("td")
          .each((i, et) => {
            const text = $(et)
              .html()
              .trim();
            const isCategory = IsCategory(text);

            if (isCategory) category = text;
            if (rowCounter < 3 && !isCategory) resultDetails.push(text);

            rowCounter++;
          });

        if (resultDetails.length > 0) {
          if (!IsExists(lottoResult, category))
            lottoResult.push({
              category,
              numbers: resultDetails[0],
              date: resultDetails[1]
            });
        }
      });
      //log.debug(lottoResult);
      //console.log("lottoResult", lottoResult);
      return lottoResult;
    })
    .then(result => {
      console.log("Get Table Of Pcso Result Success");
      return result;
    })
    .catch(err => {
      console.log("Get Table Of Pcso Result Error", err);
    });
}
function IsCategory(text) {
  var category = [
    "Ultra Lotto 6/58",
    "Superlotto 6/49",
    "Lotto 6/42",
    "6Digit",
    "Suertres Lotto 11AM",
    "Suertres Lotto 4PM",
    "Suertres Lotto 9PM",
    "EZ2 Lotto 11AM",
    "EZ2 Lotto 4PM",
    "EZ2 Lotto 9PM",
    "Grand Lotto 6/55",
    "Megalotto 6/45",
    "4Digit"
  ];
  if (category.indexOf(text) >= 0) return true;
  else return false;
}

function IsExists(currentList, item) {
  for (let i = 0; i < currentList.length; i++) {
    if (currentList[i].category.trim() == item) return true;
  }
}

module.exports = { GetLottoResult };
