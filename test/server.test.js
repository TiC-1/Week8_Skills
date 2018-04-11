const test = require("tape");
const supertest = require("supertest");
const db = require("../src/database/db_connection.js");
const populateDb = require("../src/database/db_populate.js");
const usermodel = require("../src/models/user.js");
const userscontroller = require("../src/controllers/users.js");
const bookmarksmodel = require("../src/models/bookmarks.js");
const bookmarkscontroller = require("../src/controllers/bookmarks.js");

// TEST QUERIES (models) *****************************************************

test("Test populateDb queries", function(assert) {
  populateDb(function() {
    assert.ok(true, "populateDb function has been executed");
    assert.ok(true, "datatabase should have been populated with provided data");
    assert.end();
  });
});

test("Test retrieveUserData query", function(assert) {
  usermodel
    .retrieveUserData("pipo@gmail.com")
    .then(function(result) {
      // console.log(result);
      assert.equals(result.length, 0, "pipo@gmail.com does not exist in DB");
    })
    .catch(err => {
      console.log(err);
    });
  usermodel
    .retrieveUserData("claudio@tic.it")
    .then(function(result) {
      // console.log(result);
      assert.equals(result.length, 1, "claudio@tic.it exists in DB");
      assert.end();
    })
    .catch(err => {
      console.log(err);
    });
});

test("Test create user query", function(assert) {
  return usermodel
    .create("John Dow", "john@domain.com", "MyPswD")
    .then(function(result) {
      // console.log(result);
      assert.equal(result, 6, "A new user has been added with id:6");
      assert.end();
    })
    .catch(err => {
      console.log(err);
    });
});

test("Test retrieveUserBookmarks query", function(assert) {
  bookmarksmodel
    .retrieveUserBookmarks(2)
    .then(function(result) {
      let bookmarks = JSON.stringify(result);
      // console.log(bookmarks);
      assert.ok(
        bookmarks.includes("[1,2,3]"),
        "User's 2 skills have been retrieved"
      );
      assert.end();
    })
    .catch(err => {
      console.log(err);
    });
});

test("Test addAlreadyKnown query", function(assert) {
  bookmarksmodel
    .addAlreadyKnown(1, "[100, 101, 102]")
    .then(function(result) {
      let skills = JSON.stringify(result);
      // console.log(skills);
      assert.equals(
        skills,
        "[100,101,102]",
        "User's 1 skills have been updated"
      );
      assert.end();
    })
    .catch(err => {
      console.log(err);
    });
});

// TEST ENDPOINTS *******************************************************

test("Test /login endpoint", function(assert) {
  supertest(userscontroller)
    .post("/login")
    .send("email=claudio@tic.it&password=claudio")
    .end(function(error, response) {
      // console.log(response);
      assert.ok(
        JSON.stringify(response).includes("set-cookie"),
        "Response header contains a 'set-cookie' with coded jwt"
      );
      assert.end();
    });
});

test("Test /register endpoint", function(assert) {
  supertest(userscontroller)
    .post("/register")
    .send("name=Christopher Columbus&email=chris@tic.it&password=America")
    .end(function(error, response) {
      // console.log(response);
      assert.ok(
        JSON.stringify(response).includes("set-cookie"),
        "Response header contains a 'set-cookie' with coded jwt"
      );
      assert.end();
    });
});

test("Test /logout endpoint", function(assert) {
  supertest(userscontroller)
    .post("/logout")
    .end(function(error, response) {
      // console.log(response);
      assert.ok(
        JSON.stringify(response).includes("jwt=0; Max-Age=0"),
        "Response header contains a 'set-cookie' with 'jwt=0'"
      );
      assert.end();
    });
});

test("Test /known endpoint", function(assert) {
  supertest(bookmarkscontroller)
    .post("/known")
    .send("userID=1&skillID=99")
    .end(function(error, response) {
      console.log(response);
      assert.ok(
        JSON.stringify(response).includes("100,101, 102, 99"),
        "User's 1 skills has been updated from enpoint"
      );
      assert.end();
    });
});

// OTHERS TESTS *******************************************************

test("End pool connection", function(assert) {
  db.end(function() {
    assert.end();
  });
});
