// *** VARIABLES ***
var warning = [];
var userEmail;
var userPassword;
var userName;

listenToForm();

function listenToForm() {
  console.log('Enter listenToForm function');

  document.getElementById("login_form").addEventListener("submit", function(event) {
    console.log('event function');
    event.preventDefault();
    // Get name input value
    userName = event.target.querySelectorAll("input")[0].value;
    // Get email input value
    userEmail = event.target.querySelectorAll("input")[1].value;
    // Get password input value
    userPassword = event.target.querySelectorAll("input")[2].value;
    // Display login warning message
    displayLoginWarning(userName, userEmail, userPassword);
    if (warning.length == 0) {
      document.getElementById("login_form").submit();
    }
  });
}

// Display user warning message
function displayLoginWarning(name, email, password) {
  // Call appropriate function to build warning
  buildLoginWarning(name, email, password);
  // Set html section 'message_container' as container
  var container = document.getElementById("message");
  // Display warning in container
  if (warning.length != 0) {
    container.replaceChild(createList(warning, 'warning_list', 'warning'), container.firstChild);
  } else {
    container.innerHTML = '';
  }
  console.log(warning);
  return warning;
}

// Check some input values and add infos to user global warning message
function buildLoginWarning(name, email, password) {
  warning = [];
  if (name == '') {
    warning.push('Enter name');
  }
  if (email == '') {
    warning.push('Enter email');
  }
  if (password == '') {
    warning.push('Enter password');
  }
  if (password != '' && password.length < 6) {
    warning.push('Password must be at least 6 characters');
  }
  console.log(warning);
  return warning;
}
