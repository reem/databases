/* globals require, module */

var _ = require("underscore");
var Q = require("q");
var util = require("./utility.js");
var dbConnection = require("./dbConnection.js");

var sqlToPromise = function (queryString) {
  return function (queryArguments) {
    var defer = Q.defer();
    util.promise(
      _.partial(
        dbConnection.query.bind(dbConnection),
        queryString, queryArguments),
      defer
    );
    return defer.promise;
  };
};

module.exports = {
  addRoom : sqlToPromise("INSERT INTO Rooms(roomname) " +
                         "VALUES (?);"),
  getRooms : sqlToPromise("SELECT roomname FROM Rooms"),

  addMessage : sqlToPromise("INSERT INTO Messages(text, userid, roomid) " +
                            "VALUES (?, (SELECT id FROM Users WHERE username = ? LIMIT 1), "+
                            "  (SELECT id FROM Rooms WHERE roomname = ? LIMIT 1));"),
  getMessages : sqlToPromise("SELECT u.username AS username, m.text AS text, r.roomname AS roomname " +
                             "FROM Messages m " +
                             "INNER JOIN Users u " +
                             "ON m.userid = u.id " +
                             "INNER JOIN Rooms r " +
                             "ON m.roomid = r.id;"),

  addUser : sqlToPromise("INSERT INTO Users(username) " +
                         "VALUES (?);"),
  getUsers : sqlToPromise("SELECT username FROM Users")
};

