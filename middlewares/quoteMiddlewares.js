// This contains the middlewares express requires to write code

module.exports = function () {

  var notFound = function (req, res, next) {
    res.status(404);
    res.json ({
      "Error": "404! NOT FOUND!",
      "message": "Sorry no quote found for this query."
    })
  }

  var error = function (error, req, res, next) {
    res.status(500);
    res.json({
      "Error":"500! Error Occured!",
      "message":"Some internal database error occured while processing your request"
    });
  }

  var queryObjectMiddleware = function(req, res, next){
    var queryObj = {};
    if (req.query.author) {
      queryObj.author = req.query.author;
    }
    if (req.query.topic) {
      queryObj.topic = req.query.topic;
    }

    if (req.query.tags) {
      queryObj.tags = req.query.tags.split(",").map(function(value, index, array){
        return value.trim();
      });
    }

    req.queryObj = queryObj;
    next();
  }

  return {
    queryObjectMiddleware: queryObjectMiddleware,
    notFoundMiddleware: notFound,
    errorMiddleware: error
  }

}
