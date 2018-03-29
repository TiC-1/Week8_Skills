// *** VARIABLES ***
var warning = [];
var email;
var password;

getCookies();
listenToForm();

function listenToForm() {
  document
    .getElementById("login_form")
    .addEventListener("submit", function(event) {
      event.preventDefault();
      // Get email input value
      email = event.target.querySelectorAll("input")[0].value;
      // Get password input value
      password = event.target.querySelectorAll("input")[1].value;
      // Display login warning message
      displayLoginWarning(email, password);
      if (warning.length == 0) {
        document.getElementById("login_form").submit();
      }
    });
}

// Display user warning message
function displayLoginWarning(email, password) {
  // Call appropriate function to build warning
  buildLoginWarning(email, password);
  // Set html section 'message_container' as container
  var container = document.getElementById("form_error");
  // Display warning in container
  if (warning.length != 0) {
    container.replaceChild(
      createList(warning, "warning_list", "warning"),
      container.firstChild
    );
  } else {
    container.innerHTML = "";
  }
  return warning;
}

// Check some input values and add infos to user global warning message
function buildLoginWarning(email, password) {
  warning = [];
  if (email == "") {
    warning.push("Enter email");
  }
  if (password == "") {
    warning.push("Enter password");
  }
  return warning;
}
