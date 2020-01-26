//plugins
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8080;
const dotenv = require("dotenv");
var cron = require("node-cron");
dotenv.config();

//services
const logger = require("./services/logger");
const pcso = require("./services/PcsoResult");

//routes
const lottoResultRoute = require("./routes/lottoResultRoute");

//middleware
app.use(morgan("dev"));
app.use("/", lottoResultRoute);

//setup Database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "ERROR DB Connection : "));
db.once("open", function() {
  // we're connected!
  console.log("SUCCESS DB Connection");

  //send result
  //const sendTo = "639652848931";
  const sendTo = "639267395066";
  pcso.GetResultAndSendMessageTo(sendTo);
});

app.listen(port, () => {
  console.log(`A Node JS is listening in port ${port}`);
});

cron.schedule(
  "* 11 * * *",
  () => {
    console.log("Pcso GetResultAndSaveToDb at 11am", Date);
    pcso.GetResultAndSaveToDb();
  },
  {
    timezone: "Asia/Singapore"
  }
);

cron.schedule(
  "* 16 * * *",
  () => {
    console.log("Pcso GetResultAndSaveToDb at 4pm", Date);
    pcso.GetResultAndSaveToDb();
  },
  {
    timezone: "Asia/Singapore"
  }
);

cron.schedule(
  "* 21 * * *",
  () => {
    console.log("Pcso GetResultAndSaveToDb at 9pm", Date);
    pcso.GetResultAndSaveToDb();
  },
  {
    timezone: "Asia/Singapore"
  }
);
