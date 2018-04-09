const db = require("../database/db_connection.js");

// Add an 'already_known' skill to the current user
function addAlreadyKnown(userID, skillsArray) {
  return db
    .query(
      "UPDATE bookmarks SET already_known=$1 WHERE user_id=$2 RETURNING already_known;",
      [skillsArray, userID]
    )
    .then(function(result) {
      return result.rows[0].already_known;
    });
}

module.exports = {
  addAlreadyKnown
};
