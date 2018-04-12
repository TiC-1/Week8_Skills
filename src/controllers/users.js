const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const cookies = require("../models/cookies.js");
const pswd = require("./pswd.js");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Endpoints ******************************************************

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

// Functions ******************************************************

// log user
function logUser(email, password, response) {
  // retrieve user's data from database according to email that has been entered in login form
  return user.retrieveUserData(email).then(function(result) {
    // test if email exist in database
    if (result.length != 0) {
      // console.log(result);
      // buid user's data for jwt
      const id = result[0].id;
      const name = result[0].username;
      const storedPassword = result[0].password;
      const bookmarks = {
        skills: result[0].skills,
        interests: result[0].interests,
        favorites: result[0].favorites
      };
      // check if password enterd in login form correpond to password in database
      return pswd.compare(password, storedPassword).then(function(result) {
        if (result) {
          // build jwt and send cookie
          let token = cookies.buildJWT(id, name, bookmarks);
          response.writeHead(302, {
            "Set-Cookie": "jwt=" + token + "; Max-Age: 10000",
            Location: "/"
          });
          response.end();
        } else {
          // password doesn't exist
          response.render("login", {
            message: { status: "error", text: "Wrong password" }
          });
        }
      });
    } else {
      // email doesn't exist
      response.render("login", {
        message: { status: "error", text: "Email doesn't exist" }
      });
    }
  });
}

// register new user
function registerUser(name, email, password, response) {
  // verify in database if user already exists
  return user.retrieveUserData(email).then(function(result) {
    if (result.length != 0) {
      response.render("register", {
        message: { status: "error", text: "Email already exists" }
      });
    } else {
      // encrypt password and save it into database
      return (
        pswd
          .encrypt(password)
          .then(function(result) {
            const hashedPswd = result;
            return user.create(name, email, hashedPswd);
          })
          // build token and send cookie
          .then(function(result) {
            let token = cookies.buildJWT(result, name);
            response.writeHead(302, {
              "Set-Cookie": "jwt=" + token + "; Max-Age: 10000",
              Location: "/"
            });
            response.end();
          })
      );
    }
  });
}

// log out user
function logoutUser(response) {
  response.writeHead(302, {
    "Set-Cookie": "jwt=0; Max-Age=0",
    Location: "/"
  });
  console.log("User logged out"); // Change to Handlebars message to front end user
  return response.end();
}

module.exports = router;
