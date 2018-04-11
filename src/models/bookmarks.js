const db = require("../database/db_connection.js");

function retrieveUserBookmarks(userID) {
  return db
    .query(
      "SELECT already_known, interested_in, starred FROM bookmarks WHERE user_id=$1;",
      [userID]
    )
    .then(function(result) {
      return result.rows;
    });
}

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
  retrieveUserBookmarks,
  addAlreadyKnown
};
