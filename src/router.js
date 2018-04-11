const express = require("express");
const router = express.Router();
const userscontroller = require("./controllers/users.js");
const bookmarkscontroller = require("./controllers/bookmarks.js");

router.get("/", function(request, response) {
  response.render("home");
});

router.use(userscontroller);
router.use(bookmarkscontroller);

router.use(express.static(__dirname + "/../public"));
router.use("/js", express.static(__dirname + "/../bower_components"));
router.use("/css", express.static(__dirname + "/../bower_components"));

module.exports = router;
