// Generic function to create an HTML list from an array of values (NOT objects)
function createList(array, listClass, listItemClass) {
  if (array.length != 0) {
    // Create a new <ul></ul> and add a class
    var ul_node = document.createElement('ul');
    ul_node.setAttribute('class', listClass);
    // Insert <li> calling createLI function
    array.forEach(function(arrayItem) {
      ul_node.appendChild(createListItem(arrayItem, listItemClass));
    });
    return ul_node;
  } else {
    console.log('Empty array. No list to build!')
    return;
  }

  // Embeded generic function to create list items
  function createListItem(arrayEl, listItemClass) {
    // Create a new <li></li> and add a class
    var li_node = document.createElement("li");
    li_node.setAttribute('class', listItemClass);
    // Add son content from 'arrayItem'
    li_node.innerHTML = arrayEl;
    // Return li to the parent function (renderState)
    return li_node;
  };

};

// ***** GENERIC REQUEST FUNCTION *****
// Also parses the returned object

function request(cb, url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) { // Request is completed
      if (xhr.status === 200) { // Request succeeded
        var responseObj = JSON.parse(xhr.responseText); // ok?
        cb(null, responseObj);
      } else { // Error in request
        var errorMessage = xhr.responseText;
        cb("Error " + url + " " + errorMessage);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
