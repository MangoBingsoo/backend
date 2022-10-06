const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userid: {
    type: Number,
    required: true,
    default: Math.floor((new Date().getTime() + Math.random()) % 1000000),
  },
  googleid: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true },
  provider: { type: String },
  token: { type: String },
  providerid: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
