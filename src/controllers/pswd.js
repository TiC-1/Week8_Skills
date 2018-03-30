const bcrypt = require("bcryptjs");

// Encrypt password
function encrypt(clearPswd) {
  const saltRounds = 10;
  return bcrypt
    .hash(clearPswd, saltRounds)
    .then(result => result)
    .catch(error => error);
}

// Compare clear pswd with hash
function compare(clearPswd, hashedPswd) {
  return bcrypt.compare(clearPswd, hashedPswd).then(result => result);
}

module.exports = {
  encrypt,
  compare
};
