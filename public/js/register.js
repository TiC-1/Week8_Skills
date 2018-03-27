// *** VARIABLES ***
var warning = [];
var userEmail;
var userPassword;
var userName;
var checkName = 0;


listenToForm();

function listenToForm() {
  console.log('Enter listenToForm function');

  document.getElementById("register_form").addEventListener("submit", function(event) {
    console.log('event function');
    event.preventDefault();
    // Get name input value
    userName = event.target.querySelectorAll("input")[0].value;
    // Get email input value
    userEmail = event.target.querySelectorAll("input")[1].value;
    // Get password input value
    userPassword1 = event.target.querySelectorAll("input")[2].value;
    userPassword2 = event.target.querySelectorAll("input")[3].value;

    // Display login warning message
    displayLoginWarning(userName, userEmail, userPassword1, userPassword2);
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
function buildLoginWarning(name, email, password1, password2) {
  console.log(name, name.match(/\W/gi));
  warning = [];
  if (name == '') {
    warning.push('Enter name');
  }
  checkName += name.match(/\W/gi).length;
  if (checkName != 0) {
    warning.push('name must only contain letters and digits');
  }

  if (email == '') {
    warning.push('Enter email');
  }

  if (email.includes(" ")) {
    warning.push('Email musn\'t contain spaces');
  }

  if (!email.includes("@")) {
    warning.push('Email must contain @');
  }

  if (!email.includes(".")) {
    warning.push('Email must contain .');
  }

  if (password1 == '') {
    warning.push('Enter password');
  }
  if (password1 != '' && password1.length < 6) {
    warning.push('Password must be at least 6 characters');
  }

  if (password1 != password2) {
    warning.push('Password doesn\'t match');

  }
  console.log(warning);
  return warning;
}
