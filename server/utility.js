/* globals module */

module.exports.failable = function (failer, error, success) {
  failer(function (err, data) {
    if (err) {
      error(err);
    } else {
      success(data);
    }
  });
};

module.exports.promise = function (func, defer) {
  module.exports.failable(func, defer.reject, defer.resolve);
};
