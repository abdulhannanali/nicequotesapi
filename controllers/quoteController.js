var quoteController = function (Quote) {
  var getAllQuotes = function(req, res){
    // Displaying all the items in the database
    // TODO: Implement the pagination
    Quote.find({}, function(error, quotes){
      res.json(quotes);
    });
  }

  var addAQuote = function(req, res, next) {
    // Save a new quote in the database
    if (!req.body.mainline) {
      next(new Error("The mainline of the quote is missing."))
    }
    else if(!req.body.author) {
      next(new Error("Who's the author?"))
    }
    else {
      var newQuote = new Quote();
      newQuote.mainline = req.body.mainline;
      newQuote.author = req.body.author;

      // tags are read as comma seperated
      if (req.body.tags) {
        newQuote.tags = req.body.tags.split(",");
      }

      newQuote.save(function(error) {
        if (error) {
          res.send(error.message);
        }
        else {
          res.json(newQuote);
        }
      });
    }
  }

  return {
    get: getAllQuotes,
    post: addAQuote
  }
}

module.exports = quoteController;
