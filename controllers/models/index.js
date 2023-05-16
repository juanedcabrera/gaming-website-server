const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbName = 'gaGamer';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/' + dbName

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// connection methods
db.once('open', () => {
  console.log(`📞 Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', err => {
  console.error(`📀 Datacenter error \n${err}`);
});

module.exports = {
  User: require('./User'),
  Game: require('./Game'),
  Follow: require('./Follow'),
  Like: require('./Like'),
  Comment: require('./Comment')
};

