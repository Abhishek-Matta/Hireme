var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const chatInfoSchema = new Schema({
    room: {type: String, required: true},
  sender: { type: String, required: true },
    receiver:{ type: String, required: true }
});



module.exports = mongoose.model('chatInfo', chatInfoSchema, 'chatInfo');
