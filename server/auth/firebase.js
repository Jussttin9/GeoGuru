const admin = require('firebase-admin');

const serviceAccount = require('./geoguru-8d3c8-firebase-adminsdk-rwi9f-8ba21f3358.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;