// *** VARIABLES ***
var warning = [];
var name;
var email;
var password1;
var password2;

listenToForm();

function listenToForm() {
  document
    .getElementById("register_form")
    .addEventListener("submit", function(event) {
      event.preventDefault();
      // Get name input value
      name = event.target.querySelectorAll("input")[0].value;
      // Get email input value
      mail = event.target.querySelectorAll("input")[1].value;
      // Get password input value
      password1 = event.target.querySelectorAll("input")[2].value;
      password2 = event.target.querySelectorAll("input")[3].value;

      // Display login warning message
      displayLoginWarning(name, mail, password1, password2);
      if (warning.length == 0) {
        document.getElementById("register_form").submit();
      }
    });
}

// Display user warning message
function displayLoginWarning(name, email, password1, password2) {
  // Call appropriate function to build warning
  buildLoginWarning(name, email, password1, password2);
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
function buildLoginWarning(name, email, password1, password2) {
  warning = [];
  if (name == "") {
    warning.push("Enter name");
  }
  if (name.match(/\W/gi)) {
    warning.push(
      "Name musn't contain special characters (only letters, digits, underscore and no space)"
    );
  }
  if (email != email.match(/(\w|\.|-)+@+\w+\.+[a-z]+/gi)) {
    warning.push("Enter a valid email");
  }
  if (password1 == "") {
    warning.push("Enter password");
  }
  if (password1 != "" && (password1.length < 6 || password1.length > 20)) {
    warning.push("Password length must be between 6 and 20 characters");
  }
  if (password1 != password2) {
    warning.push("Passwords don't match");
  }
  return warning;
}
