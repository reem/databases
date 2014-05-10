/* globals require, __dirname */
var express = require("express");
var app = express();
var _  = require("underscore");
app.configure(function(){
  app.set("port", 8080);
  app.use(express.logger("dev"));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname +"/../client"));
  app.use(app.router);
  app.use(function(err, req, res, next){
    console.error(err.stack);
    dbConnection.close();
    res.send(500);
  });
});

require("./routes.js")(app);

app.listen(app.get("port"));
console.log("on 3k");
