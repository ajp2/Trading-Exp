const express = require("express");
const router = express.Router();
const newsAPI = require("../../config/keys").newsAPI;
const axios = require("axios");

router.get("/", (req, res) => {
  const url = `https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=${newsAPI}`;
  axios.get(url).then(result => res.json(result.data));
});

module.exports = router;
