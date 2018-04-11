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
  let token = request.cookies.jwt;
  payload = cookiesmodel.readJWT(token);
  let id = payload.id;
  let name = payload.username;
  let skills = payload.bookmarks.skills;
  skills.push(Number(request.body.skillID));
  let bookmarks = {
    skills: skills,
    interests: payload.bookmarks.interests,
    favorites: payload.bookmarks.favorites
  };
  // console.log(bookmarks);
  return bookmarksmodel
    .updateSkills(id, bookmarks.skills)
    .then(function(result) {
      let token = cookiesmodel.buildJWT(id, name, bookmarks);
      response.writeHead(302, {
        "Set-Cookie": "jwt=" + token + "; Max-Age: 10000",
        Location: "/"
      });
      response.end();
    });
});

module.exports = router;
