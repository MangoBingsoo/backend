const mongoose = require('mongoose');
module.exports = () => {
  let url = 'mongodb://localhost:27017/womango'
  function connect() {
    mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));
  }
  connect();
  mongoose.connection.on('disconnected', connect);
  require('./schemas/Question.js');
};