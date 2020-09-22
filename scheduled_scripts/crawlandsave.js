const crawler = require("../services/webcrawler");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cachegoose = require('cachegoose');

cachegoose(mongoose);

module.exports.CrawlAndSave = function () {
    mongoose.connect(process.env.MONGO_URI, function () {
        crawler
        .GetLottoResult()
        .then((lotto_results) => {
        lotto_results.map((result) => {
            return crawler.SaveResultToDb(result);
        });
        })
        .then(() => {
            console.log("Success");
            return "success";
        }).catch(err => {
            console.log(err);
            return "fail";
        });
    });
};

this.CrawlAndSave();
