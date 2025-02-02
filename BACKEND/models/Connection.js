const mongoose = require('mongoose');

module.exports = function connectToMongo() {
  mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));
}
