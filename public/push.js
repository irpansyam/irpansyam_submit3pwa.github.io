var webPush = require("web-push");
const vapidKeys = {
  publicKey:
    "BPu5XHL2yVGH0HM2x5kqRNebvqznJ_WOz-oD_cNPOhC9d9UoLyNgB7_IUaPizAGknwRsXOQf0SGjeqfQXW8IMiU",
  privateKey: "fSVBr1tKf4NDjNrnv8M9vKpeih2QDmQ5BzfMyHrkmJ8",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/dNzdNkRnopE:APA91bECpiCt9MIf9N2OGXew8Mg_iS12fgdv2-kI0qX3d8RvRuhy3N35zkgPrBg_8ZE3CUtvgrfzg76HtkxMDPcD1VgjUUok2v9iAOegOzuP3Q6AUPklxmoXoowl5ZDrwEUkk0-_d3Zg",
  keys: {
    p256dh:
      "BASZxW/DSelOTGsgGjDShVCL6KhbUR4GEjWU7Le6T93ookUrWZZu1ZYnPsLg5yml4BQEaLqMH36XY5yshsL5iZA=",
    auth: "V777jaci5L2HWuGcKTpXCA==",
  },
};
var payload =
  "Premier League notifications, this is sampel nitification payload!";
var options = {
  gcmAPIKey: "594763044440",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
