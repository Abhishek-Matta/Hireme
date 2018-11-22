var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bidSchema = new Schema({
    bidAmount: {type: String, required: true},
    timeDuration: {type: String, required: true},
    userId: {type: String, required: true},
    title: {type: String, required: true}
});



module.exports = mongoose.model('bid', bidSchema, 'bids');