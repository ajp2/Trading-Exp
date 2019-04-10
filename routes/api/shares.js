const express = require("express");
const router = express.Router();
const alphaVantageAPI = require("../../config/keys").alphaVantage;
const axios = require("axios");
const cheerio = require("cheerio");

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
          const $ = cheerio.load(html);
          const knowledgeGraph = $(".mraOPb");
          if (knowledgeGraph.length > 0) {
            knowledgeGraph.each((idx, el) => {
              const description = el.children[0].children[0].data;
              res.json({ success: true, description });
            });
          } else {
            res.json({ success: false });
          }
        }
      },
      err => console.log(err)
    );
});

module.exports = router;
