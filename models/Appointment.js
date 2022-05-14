const mongoose = require('mongoose');

const appointment = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  notification: {
    type: Number,
  },
  timeZone: {
    type: String,
  },
  time: {
    type: Object,
  },
});

const Appointment = mongoose.model('appointment', appointment);

module.exports = Appointment;
