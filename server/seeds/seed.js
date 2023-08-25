const db = require('../config/connection');
const { User } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');

db.once('open', async () => {
  await cleanDB('User', 'users');

  // a hook was created in the user model to hash the passwords
  await User.create(userData);

  console.log('Technologies seeded!');
  process.exit(0);
});
