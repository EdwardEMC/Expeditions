// Routes
// =============================================================
module.exports = function(app) {
  // home page to join a guides or create a new one
  app.get("/", function(req, res) {
    res.render("home");
  });

  app.get("/Guide", function(req, res) {
    res.render("guide");
  });

  // page for explorers to wait for guide instructions
  app.get("/Expedition", function(req, res) {
    res.render("expedition");
  });
};