const express = require("express");
const router = express.Router();
const alphaVantageAPI = require("../../config/keys").alphaVantage;
const axios = require("axios");
const cheerio = require("cheerio");
const Share = require("../../models/Share");
const Trade = require("../../models/Trade");

router.get("/search", (req, res) => {
  axios
    .get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
        req.query.text
      }&apikey=${alphaVantageAPI}`
    )
    .then(result => res.json(result.data));
});

router.get("/timeseries", (req, res) => {
  const timeFormat = req.query.apiTimeFormat;
  const ticker = req.query.ticker;
  let apiURL;
  if (timeFormat === "TIME_SERIES_INTRADAY") {
    apiURL = `https://www.alphavantage.co/query?function=${timeFormat}&symbol=${ticker}&interval=5min&apikey=${alphaVantageAPI}`;
  } else if (timeFormat === "TIME_SERIES_DAILY") {
    apiURL = `https://www.alphavantage.co/query?function=${timeFormat}&symbol=${ticker}&apikey=${alphaVantageAPI}`;
  } else if (timeFormat === "TIME_SERIES_MONTHLY") {
    apiURL = `https://www.alphavantage.co/query?function=${timeFormat}&symbol=${ticker}&apikey=${alphaVantageAPI}`;
  }

  axios.get(apiURL).then(result => res.json(result.data));
});

router.get("/description", (req, res) => {
  axios
    .get(`https://www.google.com/search?q=${encodeURI(req.query.companyName)}`)
    .then(
      response => {
        if (response.status === 200) {
          const html = response.data;
          const resultObj = findInfo(html);
          res.json(resultObj);
        }
      },
      err => console.log(err)
    );
});

function findInfo(html) {
  let result = {};
  const $ = cheerio.load(html);

  const descriptionEl = $(".mraOPb");
  if (descriptionEl.length > 0) {
    descriptionEl.each((idx, el) => {
      const description = el.children[0].children[0].data;
      result.description = description;
    });
  }

  result.success = Object.keys(result).length > 0 ? true : false;
  return result;
}

router.get("/:ticker", (req, res) => {
  const ticker = req.params.ticker;
  const user_id = req.query.user_id;
  Share.findOne({ ticker, user_id }).then(share => {
    if (!share) {
      res.json({ ownedShares: 0, watchlist: false, saved: false });
    } else {
      res.json({
        ownedShares: share.owned,
        watchlist: share.watchlist,
        saved: true
      });
    }
  });
});

router.post("/:ticker", (req, res) => {
  const ticker = req.body.ticker;
  const user_id = req.body.user_id;
  const info = req.body.info;

  Share.findOne({ user_id, ticker }).then(share => {
    if (!share) {
      // create a share in db with set info
      const share = {
        user_id,
        ticker,
        owned: info.shares || 0,
        watchlist: info.watchlist || false
      };
      Share.create(share).then(() => res.json({ msg: "Created share" }));
    } else {
      // update share with set info
      if (info.shares) share.owned = info.shares;
      if (info.watchlist) share.watchlist = info.watchlist;
      share.save().then(() => res.json({ msg: "Updated share" }));
    }
  });
});

router.post("/trade/:ticker", (req, res) => {
  const user_id = req.body.user_id;
  const ticker = req.body.ticker;
  const company = req.body.company;
  const buy = req.body.buy;
  const amount = req.body.amount;
  const price = req.body.price;

  // Create a Trade record
  const trade = {
    user_id,
    ticker,
    company,
    buy,
    amount,
    price
  };

  Trade.create(trade).then(() => res.json({ msg: "Created trade" }));
});

module.exports = router;
