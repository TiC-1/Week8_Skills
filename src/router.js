const express = require("express");
const router = express.Router();
const queries = require("./database/db_queries.js");
const functions = require("./functions.js")

router.get("/object.js", function(req, res) {
  functions.checkRatesAge();
  queries.getCurrenciesAndRatesData().then(result => {
    res.render("object", {currenciesAndRates: JSON.stringify(result)});
  });
});

router.use(express.static(__dirname + "/../public"));

module.exports = router;
