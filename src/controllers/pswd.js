const bcrypt = require("bcryptjs");


// Encrypt password

// Callback style
const encrypt = (clearPswd, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback(err);
    } else {
      bcrypt.hash(clearPswd, salt, callback);
    }
  });
};

// // Promise style
// function encrypt(clearPswd) {
//   const saltRounds = 10;
//   return bcrypt.hash(clearPswd, saltRounds)
//     .then(function(result) {
//       return result;
//     })
//     .catch(error) {
//       return (error);
//     }
// }

// Compare clear pswd with hash

// Callback style
const compare = (clearPswd, hashedPswd, callback) => {
  bcrypt.compare(clearPswd, hashedPswd, callback);
};

// // Promise style
// function compare(clearPswd, hashedPswd) {
//   return bcrypt.compare(clearPswd, hashedPswd)
//   .then(function(result) {
//     return result;
//   });
// }


module.exports = {
  encrypt,
  compare
}
