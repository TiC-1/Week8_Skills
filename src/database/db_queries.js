// QUERIES

var db = require("./db_connection.js");
var querystring = require("querystring");


// verify mail
function lookForMail(email) {
  return db.query("SELECT email FROM users WHERE email = $1;",
  [email])
    .then(result => {
      // console.log(result.rows);
      return (result.rows);
    }).catch((err) => {
      console.log(err);
    });
}

// Get user pswd from email
function getUserPswd(email) {
  return db.query("SELECT password FROM users WHERE email = $1;",
[email])
    .then(result => {
      return (result.rows);
    }).catch((err) => {
      console.log(err);
    });
}

//insert new user in db
async function createUserRow(username, email, password) {
  try {
    return await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3);", [username, email, password])
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  lookForMail: lookForMail,
  getUserPswd: getUserPswd,
  createUserRow: createUserRow
}
