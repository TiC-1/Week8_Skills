const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const pswd = require("./pswd.js");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/known", function(request, response) {
  // Call function
});

module.exports = router;
