const mongoose = require('mongoose');

const cdrSchema = new mongoose.Schema({
  callerName: String,
  callerNumber: String,
  receiverNumber: String,
  city: String,
  callDirection: Boolean,
  callStatus: Boolean,
  callDuration: Number,
  callCost: Number,
  callStartTime: Date,
  callEndTime: Date,
  id: Number
});

module.exports = mongoose.model('CDR', cdrSchema, 'cdr'); 