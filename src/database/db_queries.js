// QUERIES

var db = require("./db_connection.js");
var querystring = require("querystring");


// Get currencies data
function getCurrenciesTableData() {
  return db.query("SELECT * FROM currencies;")
    .then(result => {
      return (result.rows);
    }).catch((err) => {
      console.log(err);
    });
}

// Get rates data
function getRatesTableData() {
  return db.query("SELECT * FROM rates;")
    .then(result => {
      return (result.rows);
    }).catch((err) => {
      console.log(err);
    });
}

// Get rates and currencies specific data in order to build an array of objects
// on that schema { fromcurrency_id: 123, tocurrency_id: 456, change_rate: 0.789 }
function getCurrenciesAndRatesData() {
  return db.query("SELECT (SELECT name AS from_currency FROM currencies WHERE id=fromcurrency_id), (SELECT name AS to_currency FROM currencies WHERE id=tocurrency_id), rate AS change_rate FROM rates;")
    .then(result => {
      return (result.rows);
    }).catch((err) => {
      console.log(err);
    });
}

// Update data into rates table
async function updateRatesTable(from, to, rate, timestamp) {
  try {
    // delete row where 'from' and 'to' currencies match to actual values
    await db.query("DELETE FROM rates WHERE fromcurrency_id=(SELECT id FROM currencies WHERE code=$1) AND tocurrency_id=(SELECT id FROM currencies WHERE code=$2);", [from, to]);
    // add row where 'from' and 'to' currecies match to actual values
    return await db.query("INSERT INTO rates VALUES ((SELECT id FROM currencies WHERE code=$1), (SELECT id FROM currencies WHERE code=$2), $3, to_timestamp($4)) RETURNING fromcurrency_id;", [from, to, rate, timestamp]);
  } catch (err) {
    console.log(err);
  }
}

// Get oldest rate age based on his timestamp
function getRatesAge() {
  return db.query("SELECT MIN(timestamp) FROM rates;")
    .then(result => {
      return (result.rows);
    }).catch((err) => {
      console.log(err);
    });
}

module.exports = {
  getCurrenciesTableData: getCurrenciesTableData,
  getRatesTableData: getRatesTableData,
  getCurrenciesAndRatesData: getCurrenciesAndRatesData,
  updateRatesTable: updateRatesTable,
  getRatesAge: getRatesAge
}
