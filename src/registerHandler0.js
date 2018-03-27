const { sign } = require('jsonwebtoken');
const db = require("./database/db_connection.js");
const comparePasswords = require('./passwordHandler.js').comparePasswords;
const hashPassword = require('./passwordHandler.js').hashPassword;
const SECRET = process.env.SECRET || 'poiugyfguhijokpkoihugyfyguhijo';
const bcrypt = require("bcryptjs");

function redirectToIndex(res, errorMessage) {
  res.writeHead(
    302, {
      'Location': '/index.html?error='+errorMessage
    }
  );
}

module.exports = (req, res) => {
  //check email if it is already in db
  db.query("SELECT email FROM users WHERE email = ($1);",
    [req.body.email],
    function(err, result) {
      if(result.rows.length != 0) {
        res.writeHead(
          302, {
            'Location': '/index.html?error='+"Your email is already registered"
          }
        );
        return res.end();
      }
  //bcrypt password
      else {
        var passwordHashed = hashPassword(req.body.password1);
      }
    };

  //insert into db userdetails
  db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",[req.body.name, req.body.email, passwordHashed]);

    });
}
