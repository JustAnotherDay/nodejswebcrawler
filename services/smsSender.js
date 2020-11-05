const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: "",
  apiSecret: ""
});

function sendMessage(sendTo, msgContent) {
  //remove duplicate
  var finalList = [];
  const from = "Nexmo";
  const to = sendTo;
  const msg = msgContent;

  nexmo.message.sendSms(from, to, msg, (err, responseData) => {
    // console.log(
    //   `Trying to send message \n=====Message Content=====\n${msg}\n=====To=====\n${to}`
    // );
    if (err) {
      console.log("nexmo.message.sendSms", err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully to ", to);
        //console.log(msg);
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });
}

function arrayToString(arr) {
  //console.log("arrayToString",arr);
  let text = "";
  arr.map(el => {
    text += `${el.category.trim()}(${el.date.trim()}) = ${el.numbers.trim()}\n`;
  });

  return text;
}

module.exports = { sendMessage, arrayToString };
