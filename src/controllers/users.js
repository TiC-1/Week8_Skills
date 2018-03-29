const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const pswd = require("./pswd.js");
const {
  sign
} = require('jsonwebtoken');
const SECRET = process.env.SECRET;


router.post("/login", function(request, response) {
  verifyUser(request.body.email, request.body.password, response);
});

router.post("/register", function(request, response) {
  createUser(request.body.name, request.body.email, request.body.password, response);
});


function createUser(name, email, password, response) {
  return user.findByMail(email)
    .then(function(result) {
      if (result.length != 0) {
        console.log("Mail already exists");
        response.end();
      } else {
        return pswd.encrypt(password)
          .then(function(result) {
            const hashedPswd = result;
            return user.create(name, email, hashedPswd);
          })
          .then(function(result) {
            console.log("New user created with id", result);
            const userData = {
              id: result /*[0].id*/ ,
              username: name,
              loggedin: true
            };
            const cookie = sign(userData, SECRET);
            response.writeHead(
              302, {
                'Set-Cookie': `jwt=${cookie}`,
                'Location': '/index.html'
              });
            response.end();
          });
      }
    });
}

function verifyUser(email, password, response) {
  return user.findByMail(email)
    .then(function(result) {
      if (result.length != 0) {
        const storedPassword = result[0].password;
        const userData = {
          id: result[0].id,
          username: result[0].username,
          loggedin: true
        };
        return pswd.compare(password, storedPassword)
          .then(function(result) {
            if (result) {
              const cookie = sign(userData, SECRET);
              response.writeHead(
                302, {
                  'Set-Cookie': `jwt=${cookie}`,
                  'Location': '/index.html'
                }
              );
            } else {
              console.log("Wrong password");
              // TODO: Must add message to user and stay on login page
            }
            response.end();
          });
      } else {
        console.log("user doesn't exist in DB");
      }
      response.end()
    });
}


function redirectToIndex(response, errorMessage) {
  response.writeHead(
    302, {
      'Location': '/index.html?error=' + errorMessage
    }
  );
}


module.exports = router;
