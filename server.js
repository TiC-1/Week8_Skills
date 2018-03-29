const express = require("express");
const router = require("./src/router.js");
const path = require("path");
const exphbs = require("express-handlebars");
const server = express();
const bodyParser = require('body-parser');


// SET PORT
const PORT = process.env.PORT || 3000;


// SET HANDLEBARS
server.set('views', path.join(__dirname, 'src', 'views'));
server.set('view engine', 'hbs');
server.engine(
  'hbs',
  exphbs({
    extname: 'hbs'
  })
);


// PARSING (see https://github.com/expressjs/body-parser)
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
server.use(bodyParser.json());


// SET ROUTER
// use router.js (seen const on top of the page)
server.use("/", router);


// SET ERROR FILES
// create a 404 middleware sending the '404.html' file
server.use((request, response) => {
  response.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
// create a 500 middleware sending the '500.html' file
server.use((error, request, response, next) => {
  console.log(error);
  response.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});


// SERVER
server.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
