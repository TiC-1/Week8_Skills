const { sign } = require('jsonwebtoken');
const db = require("./database/db_connection.js");
const comparePasswords = require('./passwordHandler.js').comparePasswords;
const SECRET = process.env.SECRET || 'poiugyfguhijokpkoihugyfyguhijo';

function redirectToIndex(res, errorMessage) {
  res.writeHead(
    302, {
      'Location': '/index.html?error='+errorMessage
    }
  );
}

module.exports = (req, res) => {
  db.query("SELECT password, id, username FROM users WHERE email = ($1);",
    [req.body.email],
    function(err, result) {
      if(result.rows.length === 0) {
        redirectToIndex(res, "Email non existant");
        return res.end();
      }
      var row = result.rows[0];
      const userDetails = {
        id: row.id,
        username: row.username,
        loggedin: true
      };
      comparePasswords(req.body.password, row.password, function(err, result) {
        if (result === true) {
          const cookie = sign(userDetails, SECRET);
          res.writeHead(
            302, {
              'Set-Cookie': `jwt=${cookie}`,
              'Location': '/index.html '
            }
          );
        } else {
          redirectToIndex(res, "Wrong password");
        }
        return res.end();
      });
    });
}
