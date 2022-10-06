const mongoose = require('mongoose');

const QusetionSchema = new mongoose.Schema({
  category : {type : Number, required : true},
  question: {type : String, required : true},
  answer : {type : String, required : true}
});

module.exports = mongoose.model('Questions', QusetionSchema);