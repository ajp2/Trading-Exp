const express = require("express");
const router = express.Router();
const alphaVantageAPI = require("../../config/keys").alphaVantage;
const axios = require("axios");

router.get("/search", (req, res) => {
  axios
    .get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
        req.query.text
      }&apikey=${alphaVantageAPI}`
    )
    .then(result => res.json(result.data));
});

module.exports = router;
