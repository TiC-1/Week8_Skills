const bcrypt = require("bcryptjs");

const encrypt = (clearPswd, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback(err);
    } else {
      bcrypt.hash(clearPswd, salt, callback);
    }
  });
};

const compare = (clearPswd, hashedPswd, callback) => {
  bcrypt.compare(clearPswd, hashedPswd, callback);
};

module.exports = {
  encrypt,
  compare,
}
