/* globals dbConnection, require, module */

var _ = require("underscore");
var Q = require("q");
var util = require("./utility.js");

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
  addRoom : sqlToPromise(""),
  getRooms : sqlToPromise(""),
  addMessage : sqlToPromise("INSERT INTO Users(username) VALUES (?);" +
                            "INSERT INTO Rooms(roomname) VALUES (?) " +
                            "INSERT INTO Messages(text, userid, roomid) " +
                            "VALUES (?, (SELECT id FROM Users WHERE username = ?), "+
                            "  (SELECT id FROM Rooms WHERE roomname = ?));"),
  getMessages : sqlToPromise(""),
  addUser : sqlToPromise("")
};

