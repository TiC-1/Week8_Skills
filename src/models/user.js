const db = require("../database/db_connection.js");

// Get user data based on his email
function findByMail(email) {
  return db.query("SELECT * FROM users WHERE email = $1;", [email])
    .then(function(result) {
      return (result.rows);
    })
}

// Add new user row
function create(name, email, password) {
  return db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;", [name, email, password])
    .then(function (result) {
      return result.rows[0].id;
    })
}

module.exports = {
  findByMail: findByMail,
  create: create
}
