const express = require("express");
const router = express.Router();
const newsAPI = require("../../config/keys").newsAPI;
const axios = require("axios");

router.get("/", (req, res) => {
  const url = `https://newsapi.org/v2/everything?q=stock%20market&apiKey=${newsAPI}`;
  axios
    .get(url)
    .then(result => res.json(result.data))
    .catch(err => console.log(err));
});

module.exports = router;
