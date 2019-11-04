var mongoose   = require('mongoose');

var Schema       = mongoose.Schema;

var L3Schema   = new Schema({
    name: String,
    type: String,
    loanperiod: Number,
    quantity: Number
});

module.exports = mongoose.model('Bingas', L3Schema);

