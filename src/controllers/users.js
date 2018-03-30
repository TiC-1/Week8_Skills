const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const bodyParser = require("body-parser");
const pswd = require("./pswd.js");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Endpoints

router.get("/login", function(request, response) {
  response.render("login");
});

router.post("/login", urlencodedParser, function(request, response) {
  logUser(request.body.email, request.body.password, response);
});

router.get("/register", function(request, response) {
  response.render("register");
});

router.post("/register", urlencodedParser, function(request, response) {
  registerUser(
    request.body.name,
    request.body.email,
    request.body.password,
    response
  );
});

router.post("/logout", function(request, response) {
  logoutUser(response);
});

// Functions

function logUser(email, password, response) {
  return user.retrieveUserData(email).then(function(result) {
    if (result.length != 0) {
      const id = result[0].id;
      const name = result[0].username;
      const storedPassword = result[0].password;
      const skills = result[0].already_known;
      return pswd.compare(password, storedPassword).then(function(result) {
        if (result) {
          let token = user.buildCookieToken(id, name, skills);
          response.writeHead(302, {
            "Set-Cookie": "jwt=" + token + "; Max-Age: 10000",
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

function registerUser(name, email, password, response) {
  return user.retrieveUserData(email).then(function(result) {
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
          let token = user.buildCookieToken(result, name, bookmarks);
          response.writeHead(302, {
            "Set-Cookie": "jwt=" + token + "; Max-Age: 10000",
            Location: "/"
          });
          response.end();
        });
    }
  });
}

function logoutUser(response) {
  response.writeHead(302, {
    "Set-Cookie": "jwt=0; Max-Age=0",
    Location: "/"
  });
  console.log("User logged out"); // Change to Handlebars message to front end user
  return response.end();
}

module.exports = router;
