var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  mainline: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  topic: {
    type: String
  },
  tags: {
    type: Array
  }
});

QuoteSchema.statics.random = function(cb) {
  this.count(function(err, count) {
    if (err) {
      return cb(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(cb);
  }.bind(this));
}

module.exports = mongoose.model("Quote", QuoteSchema);
