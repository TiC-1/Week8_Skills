const db = require("../database/db_connection.js");

// Look for email presence
function findByMail(email) {
  return db.query("SELECT * FROM users WHERE email = $1;", [email])
    .then(result => {
      // console.log(result.rows);
      return (result.rows);
    })
}

// Insert new user in db
function create(name, email, password) {
  return db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;", [name, email, password])
    .then(result => {
      // console.log(result.rows[0].id);
      return result.rows[0].id;
    })
}

module.exports = {
  findByMail: findByMail,
  create: create
}
