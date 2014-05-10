/* globals require, dbConnection, module */

var mysql = require("mysql");

module.exports = (function () {
  dbConnection = mysql.createConnection({
    user: "root",
    password: "",
    database: "chat"
  });

  dbConnection.connect();

  return dbConnection;
}());
