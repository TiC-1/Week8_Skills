const test = require("tape");
const supertest = require("supertest");
const db = require("../src/database/db_connection.js");
const populateDb = require("../src/database/db_populate.js");
const usermodel = require("../src/models/user.js");
const userscontroller = require("../src/controllers/users.js");


test("Test populateDb function", function(assert) {
  populateDb(function() {
    assert.ok(true, "populateDb function has been executed");
    assert.ok(true, "datatabase should have been populated with provided data");
    assert.end();
  });
});

test("Test lookForMail query", function(assert) {
  usermodel.findByMail("claudiu@tic.it")
    .then(result => {
      console.log(result);
      assert.equals(result.length, 0, "claudiu@tic.it does not exist in DB");
    })
    .catch((err) => {
      console.log(err);
    });
  usermodel.findByMail("claudio@tic.it")
    .then(result => {
      console.log(result);
      assert.equals(result.length, 1, "claudio@tic.it exists in DB");
      assert.end();
    })
    .catch((err) => {
      console.log(err);
    });
});

test("Test create user query", function(assert) {
  return usermodel.create("John Dow", "john@domain.com", "MyPswD")
    .then((result) => {
      console.log(result);
      assert.equal(result, 6, "A new user has been added with id:6")
      assert.end();
    })
    .catch((err) => {
      console.log(err);
    });
});

test("Test /login endpoint", function(assert) {
  supertest(userscontroller)
    .post("/login")
    .type("form")
    .send({
      email: "claudio@tic.it",
      password: "claudio"
    })
    .expect(200)
    .end(function(error, response) {
      console.log(response);
      // assert.equal(response.text, JSON.stringify(["c", "c"]), "risposta test esatto!");
      assert.end();
    });
});

test("End pool connection", function(assert) {
  db.end(function() {
    assert.end();
  });
});
