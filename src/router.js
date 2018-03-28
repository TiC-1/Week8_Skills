const {sign} = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const queries = require("./database/db_queries.js");
const SECRET = process.env.SECRET || 'poiugyfguhijokpkoihugyfyguhijo';


router.post("/login", function(req, res) {
  verifyEmail(req.body.email);
});

router.use(express.static(__dirname + "/../public"));


function redirectToIndex(res, errorMessage) {
  res.writeHead(
    302, {
      'Location': '/index.html?error=' + errorMessage
    }
  );
}

function verifyEmail(email) {
  queries.lookForMail(email)
    .then((result) => {
      if (result.length != 0) {
        console.log("cookie here!!");
        const cookie = sign(userDetails, SECRET);
          return cookie;
        res.writeHead(
          302, {
            'Set-Cookie': `jwt=${cookie}`,
            'Location': '/index.html '
          }
        );

      } else {
        redirectToIndex(res, "Email non existant");
        return res.end();
      }
    });
}

module.exports = {
verifyEmail: verifyEmail
}
