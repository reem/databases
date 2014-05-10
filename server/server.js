/* globals require, __dirname */
var express = require("express");
var app = express();
var dbConnection = require("./dbConnection.js");

app.configure(function(){
  app.set("port", 8080);
  app.use(express.logger("dev"));
  app.use(express.json());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + "/../client"));
  app.use(app.router);
  app.use(function(err, req, res){
    console.error(err.stack);
    dbConnection.close();
    res.send(500);
  });
});

require("./routes.js")(app);

app.listen(app.get("port"));
console.log("Listening on ", app.get("port"));
