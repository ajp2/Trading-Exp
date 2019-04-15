const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Trade = require("../../models/Trade");

// Get all trades for a given user
router.get("/", (req, res) => {
  const user_id = req.query.user_id;
  Trade.find({ user_id }).then(trades => {
    res.json(trades);
  });
});

router.post("/:ticker", (req, res) => {
  const user_id = req.body.user_id;
  const ticker = req.body.ticker;
  const company = req.body.company;
  const buy = req.body.buy;
  const amount = req.body.amount;
  const price = req.body.price;

  const trade = {
    user_id,
    ticker,
    company,
    buy,
    amount,
    price
  };

  // Update user's total cash after transaction
  User.findOne({ _id: user_id }).then(user => {
    if (buy) {
      user.total_cash -= amount * price;
    } else {
      user.total_cash += amount * price;
    }
    user.save().then(updatedUser => {
      // Create trade inside promise so that updated total cash can be sent to client
      Trade.create(trade).then(() =>
        res.json({ msg: "Created trade", total_cash: updatedUser.total_cash })
      );
    });
  });
});

module.exports = router;
