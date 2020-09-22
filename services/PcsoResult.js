const crawler = require("./webcrawler");
const sms = require("./smsSender");
const LottoResult = require("../models/lotto_result");
const LottoCategory = require("../models/lotto_category");

function GetResult() {
  console.log(
    "RETRIEVING Current Lotto Result from official website " + new Date()
  );

  return crawler.GetLottoResult().then((result) => {
     return result;
  });
}

function GetResultAndSendMessageTo(sendTo) {
  crawler
    .GetLottoResult()
    .then((result) => {
      const messageContent = sms.arrayToString(result);

      result.map((result) => {
        SaveResultToDb(result);
      });

      const sendMessageTo = sendTo;
      //console.log(messageContent);
      sms.sendMessage(sendMessageTo, messageContent);
    })
    .catch((err) => {
      console.log("GetLottoResult Error", err);
    });
}

function GetResultAndSaveToDb() {
  crawler
    .GetLottoResult()
    .then((result) => {
      result.map((result) => {
        return SaveResultToDb(result);
      });
    })
    .catch((err) => {
      console.log("GetLottoResult Error", err);
    });
}

function SaveResultToDb(lottoResult) {
  console.log("New LottoResult", lottoResult.category);

  LottoCategory.findOne({
    pcso_search_string: lottoResult.category,
  }).then((result) => {
    var categoryResult = result;
    LottoResult.findOne({
      category: categoryResult._id,
      date: lottoResult.date,
    })
      .then((result) => {
        if (!result) {
          //insert

          lottoResult.category = categoryResult._id;
          new LottoResult(lottoResult).save().then((result) => {
            return {
              result
            };
          });
          // newResult.save().then((result) => {
          //   return {
          //     result,
          //   };
          // });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  });
}
module.exports = { GetResult, GetResultAndSendMessageTo, GetResultAndSaveToDb };
