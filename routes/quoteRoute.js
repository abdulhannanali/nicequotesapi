var express = require("express");

var router = function (Quote) {
  var quoteController = require("../controllers/quoteController")(Quote);
  var Router = express.Router();

  Router.route("/")
    .get(quoteController.get)
    .post(quoteController.post);

  Router.route("/id/:id")
    .get(quoteController.getAQuote);

  // route for getting a random quote
  Router.route("/random")
    .get(quoteController.getRandom);

  return Router;
}

module.exports = router;
