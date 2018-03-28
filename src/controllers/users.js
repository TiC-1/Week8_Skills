const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const pswd = require("./pswd.js");
const {
  sign
} = require('jsonwebtoken');
const SECRET = process.env.SECRET;


router.post("/login", function(req, res) {
  verifyUser(req.body.email, req.body.password, res);
});


function verifyUser(email, password, res) {
  return user.findByMail(email)
    .then((result) => {
      if (result.length != 0) {
        const storedPassword = result[0].password;
        const userData = {
          id: result[0].id,
          username: result[0].username,
          loggedin: true
        };
        pswd.compare(password, storedPassword, function(err, result) {
          if (result === true) {
            console.log("entering in sign section");
            const cookie = sign(userData, SECRET);
            res.writeHead(
              302, {
                'Set-Cookie': `jwt=${cookie}`,
                'Location': '/index.html'
              }
            );
            return res.end();
          } else {
            redirectToIndex(res, "Wrong password");
          }
          return res.end();
        });
      } else {
        console.log("user doesn't exist in DB");
      }
    });
}


function redirectToIndex(res, errorMessage) {
  res.writeHead(
    302, {
      'Location': '/index.html?error=' + errorMessage
    }
  );
}

module.exports = router;
