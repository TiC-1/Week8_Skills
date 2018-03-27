// Check cookies
function getCookies() {
  var cookie = document.cookie;
  checkUserStatus(cookie);
}

// Check user login status and provide some stuff to the user
function checkUserStatus(cookie) {
  // Check token so see if user is logged in
  if (cookie && tokenReader(cookie).loggedin) {
    // Print on screen "hello username !"
    document.getElementById("user").innerHTML = '<p>Hi ' + tokenReader(cookie).username + '!</p>';
    // TODO: Add "edit account" link to allow users to change their data

  } else {
    document.getElementById("user").innerHTML = '<ul><a href="login.html"><li>Log in</li></a><a href="register.html"><li>Register</li></a></ul>';
  }
}

// Read token in the cookie and return decoded payload
function tokenReader(jwt) {
  var splittedJWT = jwt.split('=');
  var splittedToken = splittedJWT[1].split('.');
  var payload = JSON.parse(atob(splittedToken[1]));
  console.log(payload);
  return payload;
}
