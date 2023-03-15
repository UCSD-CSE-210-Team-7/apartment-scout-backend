const admin = require("firebase-admin");

const serviceAccount = require("./apartment-scout.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://tritontalk-d063d.firebaseio.com",
  // storageBucket: "tritontalk-d063d.appspot.com"
});

module.exports = admin;
