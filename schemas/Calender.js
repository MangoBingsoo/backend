const mongoose = require("mongoose");

const CalenderSchema = new mongoose.Schema({
  date: { type: String, required: true },
  feeling: { type: Number, default: 2 },
});

module.exports = mongoose.model("Calender", CalenderSchema);
