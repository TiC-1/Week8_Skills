const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

// Build JWT
function buildJWT(id, name, bookmarks) {
  // Provide an 'empty' bookmarks object when building the JWT
  // for a new registered user who doesn't have bookmarks yet
  if (!bookmarks) {
    bookmarks = { skills: [], interests: [], favorites: [] };
  }
  //
  let userData = {
    id: id,
    username: name,
    bookmarks: bookmarks,
    loggedin: true
  };
  let token = jwt.sign(userData, SECRET);
  return token;
}

// Read JWT
function readJWT(token) {
  // Test if token starts with 'jwt=' and remove it if necessary
  if (token.startsWith("jwt")) {
    token = token.split("=");
    token = token[1];
  }
  //
  let payload = jwt.verify(token, SECRET);
  return payload;
}

module.exports = {
  buildJWT,
  readJWT
};
