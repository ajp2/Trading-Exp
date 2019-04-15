const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShareSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  company: {
    type: String,
    required: true
  },
  ticker: {
    type: String,
    required: true
  },
  owned: {
    type: Number,
    default: 0
  },
  watchlist: {
    type: Boolean,
    default: false
  }
});

const Share = mongoose.model("shares", ShareSchema);
module.exports = Share;
