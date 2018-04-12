const express = require("express");
const router = express.Router();
const bookmarksmodel = require("../models/bookmarks.js");
const cookiesmodel = require("../models/cookies.js");

// See https://github.com/expressjs/body-parser
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// See http://expressjs.com/en/resources/middleware/cookie-parser.html
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/known", urlencodedParser, function(request, response) {
  // Get cookie and decode JWT
  let token = request.cookies.jwt;
  payload = cookiesmodel.readJWT(token);
  // build user's data from payload
  let id = payload.id;
  let name = payload.username;
  let skills = payload.bookmarks.skills;
  // Add new skill to user's bookmarks
  skills.push(Number(request.body.skillID));
  let bookmarks = {
    skills: skills,
    interests: payload.bookmarks.interests,
    favorites: payload.bookmarks.favorites
  };
  // console.log(bookmarks);
  // update user's skills in database
  return bookmarksmodel.updateSkills(id, skills).then(function(result) {
    // build jwt with updated skills and send cookie
    let token = cookiesmodel.buildJWT(id, name, bookmarks);
    response.writeHead(302, {
      "Set-Cookie": "jwt=" + token + "; Max-Age: 10000",
      Location: "/"
    });
    response.end();
  });
});

module.exports = router;
