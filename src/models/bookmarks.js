const db = require("../database/db_connection.js");

// Retrieve user's bookmarks from his ID
function retrieveUserBookmarks(userID) {
  return db
    .query("SELECT * FROM bookmarks WHERE user_id = $1;", [userID])
    .then(function(result) {
      return result.rows;
    });
}

// // Add an 'already_known' skill to the current user
// function addAlreadyKnown(userID, skillsArray) {
//   return db
//     .query(
//       "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;",
//       [name, email, password]
//     )
//     .then(function(result) {
//       return result.rows[0].id;
//     });
// }

module.exports = {
  retrieveUserBookmarks
};
