const express = require("express");
const router = express.Router();
const bookmarks = require("../models/bookmarks.js");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/known", urlencodedParser, function(request, response) {
  addKnownSkill(request.body.userID, request.body.skillID, response);
});

function addKnownSkill(userID, skillID, response) {
  return bookmarks.retrieveUserBookmarks(userID).then(function(result) {
    console.log(result);
    let newSkills = result.push(skillID);
    console.log(newSkills);
    return newSkills.then(function(result) {
      return bookmarks.addAlreadyKnown(userID, result).then(function(result) {
        console.log(result);
      });
    });
  });
}

module.exports = router;
