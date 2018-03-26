var fs = require("fs");
var db = require("./db_connection.js");

function applySchema(cb) {
  fs.readFile(__dirname + "/db_schema.sql", function(err, result) {
    if (err) {
      return cb(err);
    }
    db.query(result.toString(), function(err, result) {
      if (err) {
        return cb(err);
      }

      cb(null, result);
    });
  });
}

function populateDb(cb) {
  applySchema(function(err, result) {
    if (err) {
      return cb(err);
    }
    fs.readFile(__dirname + "/db_data.sql", function(err, result) {
      if (err) {
        return cb(err);
      }
      db.query(result.toString(), function(err, result) {
        if (err) {
          return cb(err);
        }
        cb(null, result);
      });
    });
  });
}

module.exports = populateDb;
