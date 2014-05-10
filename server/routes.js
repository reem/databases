/* globals module, require */

var controllers = require("./controllers.js");

module.exports = function(app){
  app.get("/classes/messages", controllers.getMessages);
  app.get("/classes/rooms", controllers.getRooms);
  app.get("/classes/users", controllers.getUsers);

  app.post("/classes/messages", controllers.addMessage);
  app.post("/classes/rooms", controllers.addRoom);
  app.post("/classes/users", controllers.addUser);
};
