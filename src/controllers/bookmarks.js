const express = require("express");
const router = express.Router();
const bookmarks = require("../models/bookmarks.js");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/known", urlencodedParser, function(request, response) {
  // console.log(request.body.userID, request.body.skillID);
  addKnownSkill(request.body.userID, request.body.skillID).then(function(
    result
  ) {
    response.end();
  });
});

function addKnownSkill(userID, skillID) {
  return bookmarks.retrieveUserBookmarks(userID).then(function(result) {
    result = result[0].already_known;
    result.push(Number(skillID));
    result = "[" + result.toString() + "]";
    bookmarks.addAlreadyKnown(userID, result);
  });
}

module.exports = router;
