const db = require("../database/db_connection.js");

// Get user data based on his email
function retrieveUserData(email) {
  return db
    .query(
      "SELECT id, username, email, password, skills, interests, favorites FROM users, bookmarks WHERE user_id=id AND email=$1;",
      [email]
    )
    .then(function(result) {
      return result.rows;
    });
}

// Add new user row
function create(name, email, password) {
  return db
    .query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;",
      [name, email, password]
    )
    .then(function(result) {
      return result.rows[0].id;
    });
}

module.exports = {
  retrieveUserData,
  create
};
