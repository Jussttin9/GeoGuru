const admin = require('firebase-admin');

const serviceAccount = require('./geoguru-23ec8-firebase-adminsdk-pzu4n-ce7fdccc01.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;