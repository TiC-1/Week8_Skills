var test = require("tape");
var db = require("../src/database/db_connection.js");
var populateDb = require("../src/database/db_populate.js");
var queries = require("../src/database/db_queries.js");
var functions = require("../src/functions.js");

var data = [{
    id: 1,
    name: 'US Dollar',
    code: 'USD'
  },
  {
    id: 2,
    name: 'Euro',
    code: 'EUR'
  },
  {
    id: 3,
    name: 'Bitcoin',
    code: 'BTC'
  },
  {
    id: 4,
    name: 'Ethereum',
    code: 'ETH'
  }
]


test("Test populateDb function", function(assert) {
  populateDb(function() {
    assert.ok(true, "populateDb function has been executed");
    assert.ok(true, "datatabase should have been populated with provided data");
    assert.end();
  });
});


test("Test getCurrenciesTableData function", function(assert) {
  queries.getCurrenciesTableData()
    .then(result => {
      assert.ok(result[0].hasOwnProperty("id"), "result has 'id' property");
      assert.ok(result[0].hasOwnProperty("name"), "result has 'name' property");
      assert.ok(result[0].hasOwnProperty("code"), "result has 'code' property");
      assert.end();
    }).catch((err) => {
      console.log(err);
    });
});


test("Test listCurrenciesCodes function", function(assert) {
  codes = functions.listCurrenciesCodes(data);
  assert.ok(codes.length = 4, "array's length is 4");
  assert.equal(codes[0], "USD", "array's first element has 'USD' value");
  assert.equal(codes[3], "ETH", "array's last element has 'ETH' value");
  assert.end();
});


test("Test combineCurrenciesCodes function", function(assert) {
  combinations = functions.combineCurrenciesCodes(codes);
  assert.ok(combinations.length == 12, "array's' length is 12");
  assert.equal(combinations[0], "USD-EUR", "array's first element has 'USD-EUR' value");
  assert.equal(combinations[11], "ETH-BTC", "array's last element has 'ETH-BTC' value");
  assert.end();
});


test("Test updateRatesTable function", function(assert) {
  queries.updateRatesTable('USD', 'EUR', 123.456, Math.round(Date.now()/1000)).then(result => {
    assert.ok(true, "updateRatesTable function has been executed");
    assert.ok(result.rows.length === 1, "rates table should contain one row");
    assert.end();
  }).catch((err) => {
    console.log(err);
  });
});


test("Test getRatesTableData function", function(assert) {
  queries.getRatesTableData()
    .then(result => {
      assert.ok(result[0].hasOwnProperty("fromcurrency_id"), "result has 'fromcurrency_id' property");
      assert.ok(result[0].hasOwnProperty("tocurrency_id"), "result has 'tocurrency_id' property");
      assert.ok(result[0].hasOwnProperty("rate"), "result has 'rate' property");
      assert.ok(result[0].hasOwnProperty("timestamp"), "result has 'timestamp' property");
      assert.end();
    }).catch((err) => {
      console.log(err);
    });
});


test("Test getCurrenciesAndRatesData function", function(assert) {
  queries.getCurrenciesAndRatesData()
    .then(result => {
      assert.ok(result[0].hasOwnProperty("from_currency"), "result has 'from_currency' property");
      assert.ok(result[0].hasOwnProperty("to_currency"), "result has 'to_currency' property");
      assert.ok(result[0].hasOwnProperty("change_rate"), "result has 'change_rate' property");
      assert.end();
    }).catch((err) => {
      console.log(err);
    });
});


test("Test getRatesFromAPI function", function(assert) {
  functions.getRatesFromAPI(combinations.slice(0, 3)).then((result) => {
    queries.getRatesTableData().then((rows) => {
      assert.ok(rows[0].hasOwnProperty("fromcurrency_id"), "result has 'fromcurrency_id' property");
      assert.end();
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});

test("Test checkRatesAge function", function(assert) {
  functions.checkRatesAge().then(result => {
    assert.ok(result, "Data should be updated");
    assert.end();
  }).catch((err) => {
    console.log(err);
  });
});

test("End pool connection", function(assert) {
  db.end(function() {
    assert.end();
  });
});
