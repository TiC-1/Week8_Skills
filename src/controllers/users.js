const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const pswd = require("./pswd.js");


router.post("/login", function(req, res) {
  verifyUser(req.body.email))
    .then((result) => {
      user.verifyUser(req.body.email, result);
    });
});

// router.get("/login", function(req, res) {
//   // render login form with HB
// });

router.post("/register", function(req, res) {
  //user.function to create user
});


function verifyUser(email, password) {
  return user.findByMail(email)
    .then((result) => {
      if (result.length != 0) {
        console.log("user found in DB")
        if (result.password == password) {
          console.log("password matches")
          // set cookie + redirect to Index
        } else {
          console.log("password doesn't match")
        }
      } else {
        console.log("user doesn't exist in DB");
      }
    });
}





//   const cookie = sign(userDetails, SECRET);
//   return cookie;
//   res.writeHead(
//     302, {
//       'Set-Cookie': `jwt=${cookie}`,
//       'Location': '/index.html '
//     }
//   );
// } else {
//   redirectToIndex(res, "Email non existant");
//   return res.end();
// }
// });
// }

function redirectToIndex(res, errorMessage) {
  res.writeHead(
    302, {
      'Location': '/index.html?error=' + errorMessage
    }
  );
}

module.exports = router;
