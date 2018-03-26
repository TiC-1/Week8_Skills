var url = require("url");
var Pool = require("pg").Pool;
var environment = process.env.NODE_ENV || "development";
require("env2")("./config." + environment + ".env");

if (!process.env.DATABASE_URL) {
  throw new Error("Connection data missing in configuration.");
}

var params = url.parse(process.env.DATABASE_URL);
var userPass = params.auth.split(":");

var options = {
  connectionString: process.env.DATABASE_URL,
  max: process.env.DB_MAX_CONNECTIONS || 2
}

var pool = new Pool(options);

module.exports = pool;
