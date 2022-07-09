var Pushy = require("pushy");

//  https://dashboard.pushy.me/
var pushyAPI = new Pushy("SECRET_API_KEY");

var data = {
  message: "Hello World!",
};

var to = ["DEVICE_TOKEN"];

var options = {
  notification: {
    badge: 1,
    sound: "ping.aiff",
    body: "Hello World \u270c",
  },
};

pushyAPI.sendPushNotification(data, to, options, function (err, id) {
  if (err) {
    return console.log("Fatal Error", err);
  }

  console.log("Push sent successfully! (ID: " + id + ")");
});
