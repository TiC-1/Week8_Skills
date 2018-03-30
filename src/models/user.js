const db = require("../database/db_connection.js");
const { sign } = require("jsonwebtoken");
const SECRET = process.env.SECRET;

// QUERIES

// Get user data based on his email
function retrieveUserData(email) {
  return db
    .query(
      "SELECT id, username, email, password, already_known, interested_in, stared FROM users, bookmarks WHERE user_id=id AND email=$1;",
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

// OTHER THAN QUERIES

// Build cookie token with user's data
function buildCookieToken(id, name, skills) {
  let userData = {
    id: id,
    username: name,
    skills: skills,
    loggedin: true
  };
  const token = sign(userData, SECRET);
  return token;
}

module.exports = {
  retrieveUserData,
  create,
  buildCookieToken
};
