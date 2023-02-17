import { initializeApp } from 'firebase-admin/app'

// const serviceAccount = require("./apartment-scout.json");

import { readFile } from 'fs/promises';
const json = JSON.parse(
  await readFile(
    new URL('./apartment-scout.json', import.meta.url)
  )
);

initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://tritontalk-d063d.firebaseio.com",
    // storageBucket: "tritontalk-d063d.appspot.com"
});

export default admin;
