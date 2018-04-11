const db = require("../database/db_connection.js");

// DEPRECATED
// // Retrieve user's bookmarks
// function retrieveUserBookmarks(userID) {
//   return db
//     .query(
//       "SELECT skills, interests, favorites FROM bookmarks WHERE user_id=$1;",
//       [userID]
//     )
//     .then(function(result) {
//       return result.rows;
//     });
// }

// Upade user's skills
function updateSkills(userID, skills) {
  return db
    .query(
      "UPDATE bookmarks SET skills=$1 WHERE user_id=$2 RETURNING skills;",
      [JSON.stringify(skills), userID]
    )
    .then(function(result) {
      return result.rows[0].skills;
    });
}

module.exports = {
  // retrieveUserBookmarks,
  updateSkills
};
