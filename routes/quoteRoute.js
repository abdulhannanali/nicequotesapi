var express = require("express");

var router = function (Quote) {
  var quoteController = require("../controllers/quoteController")(Quote);
  var Router = express.Router();

  Router.route("/")
    .get(quoteController.get)
    .post(quoteController.post);


  // route for getting a random quote
  Router.route("/random")
    .get(function(req, res) {
      Quote.count(function (err, count) {
        if (err) {
          res.json({
            error: err
          });
        }
        else {
          var rand = Math.floor(Math.random() * count);
          Quote.findOne({}, {}, {skip: rand}, function(err, quote) {
            if (err) {
              res.json({
                error: err
              });
            }
            else {
              res.json(quote);
            }
          });
        }
      });
    });

  return Router;
}

module.exports = router;
