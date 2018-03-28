const express = require("express");
const router = require("./src/router.js");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();
const bodyParser = require('body-parser')


const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs'
  })
);

// parse application/x-www-form-urlencoded
// https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());

// use router.js (seen const on top of the page)
app.use("/", router);

// create a 404 middleware sending the '404.html' file
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// create a 500 middleware sending the '500.html' file
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});

app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
