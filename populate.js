var request = require("request"),
    cheerio = require("cheerio"),
    fs = require("fs"),
    mongoose = require("mongoose"),
    Quote = require("./models/quote"),
    keys = require("./config/keys")();

// Conenction to the database
mongoose.connect(keys.MONGODB_CONNECTION_URI);
var db = mongoose.connection;
var topic = "leadership"

db.once('open', function () {
  // Link to be scraped * is replaced by the number
  var scrapeLink = "http://www.brainyquote.com/quotes/topics/topic_"+topic+"*.html";

  var allQuotes = [];

  request(scrapeLink.replace("*", ""), function(error, response, body){
    var $ = cheerio.load(body);
    var numberOfPages = numPages($) - 2;
    console.log(numberOfPages);
    for (var i = 1; i <= numberOfPages; i++) {
      request(scrapeLink.replace("*", i), function(error, response, body) {
        if (error) {
            console.log(error);
        }
        else {
          var $ = cheerio.load(body);
          var quotes = $(".boxyPaddingBig");
          quotes.each(function(index, element){
            var newQuote = new Quote();
            var quote = {};
            var children = $(element).children();
            quote.main = $(children).first().text();
            quote.author = $(children).last().children().text();

            var tagsArray = [];
            // adding the tags
            var tags = $(element).next();
            tags.children().children().each(function(index, element){
              tagsArray.push($(element).text().replace("\n", ""));
            });
            quote.tags = tagsArray;
            newQuote.mainline = quote.main;
            newQuote.author = quote.author;
            newQuote.tags = quote.tags;
            newQuote.topic = topic;
            newQuote.save(function(err) {
              if (err) {
                console.log('error adding a quote');
              }
              else {
                console.log("added a quote");
              }
            });

          });
        }
      });
    }
  });
});

function numPages($) {
  return parseInt($(".pagination-sm").children().last().prev().text());
}
