const express = require("express");
const app = express();
const router = express.Router();
const userscontroller = require("./controllers/users.js");

router.use(userscontroller);

router.use(express.static(__dirname + "/../public"));

module.exports = router;
