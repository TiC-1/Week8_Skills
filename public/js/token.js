// Generic function to read token in the cookie and return decoded payload
function tokenReader(jwt) {
  var splittedJWT = jwt.split('=');
  var splittedToken = splittedJWT[1].split('.');
  var payload = JSON.parse(atob(splittedToken[1]));
  console.log(payload);
  return payload;
}

//

function checkUserStatus(token) {
  console.log('Enter checkUserStatus function');
  // Check token so see if user is logged in
  if (document.cookie && tokenReader(token).loggedin) {
    // Print on screen "hello username !"
    document.getElementById("user_header").innerHTML = "<p>Hello " + tokenReader(token).username + "!</p>";

  }
}
