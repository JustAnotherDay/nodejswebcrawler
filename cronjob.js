const pcso = require("./services/PcsoResult");
var cron = require("node-cron");

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
  