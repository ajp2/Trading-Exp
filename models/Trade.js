const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  ticker: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  buy: {
    type: Boolean,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Trade = mongoose.model("trades", TradeSchema);
module.exports = Trade;
