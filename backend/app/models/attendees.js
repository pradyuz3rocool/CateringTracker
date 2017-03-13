var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AttendeesSchema = new Schema({name: String, QRCode: String, Breakfast: Boolean, Lunch: Boolean, Dinner: Boolean});

module.exports = mongoose.model('Attendees', AttendeesSchema);