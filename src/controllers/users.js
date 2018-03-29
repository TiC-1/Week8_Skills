const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const bodyParser = require("body-parser");
const pswd = require("./pswd.js");
const { sign } = require("jsonwebtoken");
const SECRET = process.env.SECRET;

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/login", function(request, response) {
  response.render("login");
});

router.post("/login", urlencodedParser, function(request, response) {
  verifyUser(request.body.email, request.body.password, response);
});

function verifyUser(email, password, response) {
  return user.findByMail(email).then(function(result) {
    if (result.length != 0) {
      const storedPassword = result[0].password;
      const userData = {
        id: result[0].id,
        username: result[0].username,
        loggedin: true
      };
      return pswd.compare(password, storedPassword).then(function(result) {
        if (result) {
          const cookie = sign(userData, SECRET);
          response.writeHead(302, {
            "Set-Cookie": `jwt=${cookie}`,
            Location: "/"
          });
          response.end();
        } else {
          response.render("login", {
            message: { status: "error", text: "Wrong password" }
          });
        }
      });
    } else {
      response.render("login", {
        message: { status: "error", text: "Email doesn't exist" }
      });
    }
  });
}

router.get("/register", function(request, response) {
  response.render("register");
});

router.post("/register", urlencodedParser, function(request, response) {
  createUser(
    request.body.name,
    request.body.email,
    request.body.password,
    response
  );
});

function createUser(name, email, password, response) {
  return user.findByMail(email).then(function(result) {
    if (result.length != 0) {
      response.render("register", {
        message: { status: "error", text: "Email already exists" }
      });
    } else {
      return pswd
        .encrypt(password)
        .then(function(result) {
          const hashedPswd = result;
          return user.create(name, email, hashedPswd);
        })
        .then(function(result) {
          const userData = {
            id: result,
            username: name,
            loggedin: true
          };
          const cookie = sign(userData, SECRET);
          response.writeHead(302, {
            "Set-Cookie": `jwt=${cookie}`,
            Location: "/"
          });
          response.end();
        });
    }
  });
}

module.exports = router;
