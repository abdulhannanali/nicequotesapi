var express = require("express");

var router = function (Quote) {
  var quoteController = require("../controllers/quoteController")(Quote);
  var quoteMiddlewares = require("../middlewares/quoteMiddlewares")();
  var Router = express.Router();

  Router.use(quoteMiddlewares.queryObjectMiddleware);


  Router.route("/")
    .get(quoteController.get)
    .post(quoteController.post);

  Router.route("/id/:id")
    .get(quoteController.getAQuote);

  // route for getting a random quote
  Router.route("/random")
    .get(quoteController.getRandom);

  Router.use(quoteMiddlewares.notFoundMiddleware);
  Router.use(quoteMiddlewares.errorMiddleware);
  return Router;
}

module.exports = router;
