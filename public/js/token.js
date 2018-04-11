getCookies();

// Get cookies and check user status
function getCookies() {
  var cookie = document.cookie;
  console.log("cookie = ", cookie);
  checkUserStatus(cookie);
}

// Check user login status and provide some messages
function checkUserStatus(cookie) {
  if (cookie && tokenReader(cookie).loggedin) {
    document.getElementsByClassName("user")[0].innerHTML =
      "<p>Hi " +
      tokenReader(cookie).username +
      "!</p><p>Your bookmarks: " +
      JSON.stringify(tokenReader(cookie).bookmarks) +
      '</p><form class="logout_form" action="/logout" method="post" novalidate><input type="submit" role="button" class="logout_button" name="" value="Log out">';
  } else {
    document.getElementsByClassName("user")[0].innerHTML =
      '<ul><a href="/login"><li>Log in</li></a><a href="/register"><li>Register</li></a></ul>';
  }
}

// Read token in the cookie and return decoded payload
function tokenReader(jwt) {
  var splittedJWT = jwt.split("=");
  var splittedToken = splittedJWT[1].split(".");
  var payload = JSON.parse(atob(splittedToken[1]));
  return payload;
}
