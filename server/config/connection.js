const mongoose = require('mongoose');

// allows us to connect to our created database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tictactoe');
console.log(process.env.MONGODB_URI)
module.exports = mongoose.connection;
