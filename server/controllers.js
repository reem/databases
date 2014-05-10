/* globals require, module */
var models = require('./models');

var toQuery = function (body, fields) {
  return fields.map(function (field) {
    return body[field];
  });
};

var sqlGetter = function (promiseCreator) {
  return function (req, res, next) {
    promiseCreator()
      .then(function (data) {
        res.json(data);
      })
      .fail(function (err) {
        next(err);
      });
  };
};

var sqlSetter = function (promiseCreator, fields) {
  return function (req, res, next) {
    promiseCreator(toQuery(req.body, fields))
      .then(function () {
        res.send(201);
      })
      .fail(function (err) {
        next(err);
      });
  };
};

module.exports = {
  getMessages: sqlGetter(models.getMessages),
  addMessage: sqlSetter(models.addMessage, []),

  getUsers: sqlGetter(models.getUsers),
  addUser: sqlSetter(models.addUser, []),

  getRooms: sqlGetter(models.getRooms),
  addRoom: sqlSetter(models.addRoom, [])
};

