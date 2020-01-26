const crawler = require("./webcrawler");
const sms = require("./smsSender");
const LottoResult = require("../models/lottoResultModel");

function GetResultAndSendMessageTo(sendTo) {
  crawler
    .GetLottoResult()
    .then(result => {
      const messageContent = sms.arrayToString(result);

      result.map(result => {
        SaveResultToDb(result);
      });
      
      const sendMessageTo = sendTo;
      //console.log(messageContent);
      sms.sendMessage(sendMessageTo, messageContent);
    })
    .catch(err => {
      console.log("GetLottoResult Error", err);
    });
}

function GetResultAndSaveToDb() {
  crawler
    .GetLottoResult()
    .then(result => {
      result.map(result => {
        SaveResultToDb(result);
      });
    })
    .catch(err => {
      console.log("GetLottoResult Error", err);
    });
}

function SaveResultToDb(lottoResult) {
  LottoResult.findOne({
    category: lottoResult.category,
    date: lottoResult.date
  })
    .then(result => {
      if (!result) {
        //insert
        const result = new LottoResult(lottoResult);
        console.log("New LottoResult", lottoResult);
        result.save().then(result => {
          return {
            result
          };
        });
      }
    })
    .catch(err => {
      console.log("Error", err);
    });
}
module.exports = { GetResultAndSendMessageTo, GetResultAndSaveToDb };
