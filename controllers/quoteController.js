var quoteController = function (Quote) {

  var hateoasURL = function (req, stringToAdd) {
  // construct a hateoasURL
    var defaultString = req.protocol + "://" + req.headers.host + "/api/quotes";
    return defaultString + stringToAdd;
  }

  var addALink = function (req, quote) {
    quote.link = req.protocol + "://" + req.headers.host + "/api/quotes/id/" + quote._id;
    return quote;
  }

  // returns a quote to be sent to the response with filters added to it
  // the following filters are added yet
  // filterByThisAuthor
  // filterByThisTopic
  var addFiltersToQuote = function (req, quote) {
    // default limit to the number of quotes to be displayed
    var limit = 20;

    var newQuote = quote.toJSON();


    newQuote.filter = {};

    newQuote.filter.filterByThisAuthor = hateoasURL(req, "?author=" + quote.author.replace(" ", "%20") + "&limit=" + limit);
    newQuote.filter.filterByThisTopic = hateoasURL(req, "?topic=" + quote.topic + "&limit=" + limit);

    /// random quote of this topic
    newQuote.filter.randomQuoteByThisAuthor = hateoasURL(req, "/random?topic=" + quote.topic);
    newQuote.filter.randomQuoteByThisTopic = hateoasURL(req, "/random?author=" + quote.author);
    return newQuote;
  }



  var getAllQuotes = function(req, res){

    var q = Quote.find(req.queryObj);
    if (req.query.limit) {
      q.limit(req.query.limit)
        .exec(function (error, quotes) {
          if (error) {
            next(error);
          }
          else if (quotes[0] == null) {
            next();
          }
          else {
            // adding a link to each quote
            var newQuotes = [];
            quotes.forEach(function(quote, index, array) {
              newQuotes.push(addALink(req, quote.toJSON()));
            });
            newQuotes.pipe(res);
          }
        })
    }
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
          next(error);
        }
        else {
          res.json(newQuote);
        }
      });
    }
  }

  /*
   * Responds with a random quote
   * if a topic is selected in the random quote
   * the quote is selected from the specific topic
   */
  var getARandomQuote = function(req, res, next) {
    Quote.find(req.queryObj).count(function (err, count) {
      if (err) {
        next(err);
      }
      else {
        var rand = Math.floor(Math.random() * count);
        Quote.findOne(req.queryObj, {}, {skip: rand}, function(err, quote) {
          if (err) {
            next(err);
          }
          else if (quote == null) {
            next(new Error("No Quote Found"));
          }
          else {
            res.json(addFiltersToQuote(req, quote));
          }
        });
      }
    });
  };

  var getAQuote = function (req, res, next) {
      if (req.params.id) {
        Quote.findById(req.params.id, function(err, quote) {
          if (err) {
            if (err.path == "_id" && err.name == "CastError") {
              next();
            }
            else {
              next(err);
            }
          }
          else {
            res.json(addFiltersToQuote(req, quote));
          }
        });
      }
  }


  return {
    get: getAllQuotes,
    post: addAQuote,
    getAQuote: getAQuote,
    getRandom: getARandomQuote
  }
}

module.exports = quoteController;
