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

var promiseRead = function (path) {
  var defer = Q.defer();
  util.promise(_.partial(fs.readFile, path));
  return defer;
};

var promiseRead = function (path) {
  var defer = Q.defer();

  fs.readFile(path, function (err, data) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(data);
    }
  });

  return defer;
};

var filePromise = promiseRead("hello.txt");
filePromise
  .then(function (contentes) {
    //
  })
  .fail(function (err) {
    console.error(err);
  });

