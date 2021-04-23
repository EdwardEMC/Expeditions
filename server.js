// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// ******************************************************************************
// Dependencies
// =============================================================
const compression = require("compression")
const express = require("express");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Socket Io set up
const server = require("http").Server(app);
const io = require("socket.io")(server);

// Using compression npm to improve performance
app.use(compression());

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ 
  defaultLayout: "main",
  helpers:{
    section: function(name, options){
      if(!this._sections){this._sections = {}};
      this._sections[name] = options.fn(this);
      return null;
    } 
  }
}));
app.set("view engine", "handlebars");

// Socket.io configuration
// =============================================================
require("./socket/socketOptions.js")(io);

// Routes
// =============================================================
require("./routes/htmlRoutes.js")(app);

// Syncing our sequelize models and then starting our Express app through the server not app (due to socket.io setup)
// =============================================================
server.listen(PORT, function() {
  console.log("App listening on http://localhost:" + PORT);
});