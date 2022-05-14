'use strict';

const express = require('express');
const momentTimeZone = require('moment-timezone');
const moment = require('moment');
// const { Appointment } = require('../src/db');
const { Appointment } = require('../models/Appointment');

/* eslint-disable new-cap */
const router = express.Router();

const getTimeZones = function() {
  return momentTimeZone.tz.names();
};

// GET: /appointments
router.get('/', function(req, res, next) {
  Appointment.find().then(function(appointments) {
    res.render('appointments/index', { appointments: appointments });
  });
});

// GET: /appointments/create
router.get('/create', function(req, res, next) {
  res.render('appointments/create', {
    timeZones: getTimeZones(),
    appointment: new Appointment({
      name: '',
      phoneNumber: '',
      notification: '',
      timeZone: '',
      time: '',
    }),
  });
});

// POST: /appointments
router.post('/', function(req, res, next) {
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(req.body.time, 'YYYY-MM-DD hh:mma');

  const appointment = new Appointment({
    name: name,
    phoneNumber: phoneNumber,
    notification: Number(notification),
    timeZone: timeZone,
    time: time,
  });
  console.log('name', typeof appointment.name);
  console.log('phoneNumber', typeof appointment.phoneNumber);
  console.log('notification', typeof appointment.notification);
  console.log('timeZone', typeof appointment.timeZone);
  console.log('time', typeof appointment.time);

  appointment.save().then(function() {
    res.redirect('/');
  });
});

// GET: /appointments/:id/edit
router.get('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  Appointment.findOne({ _id: id }).then(function(appointment) {
    res.render('appointments/edit', {
      timeZones: getTimeZones(),
      appointment: appointment,
    });
  });
});

// POST: /appointments/:id/edit
router.post('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(req.body.time, 'YYYY-MM-DD hh:mma');

  Appointment.findOne({ _id: id }).then(function(appointment) {
    appointment.name = name;
    appointment.phoneNumber = phoneNumber;
    appointment.notification = notification;
    appointment.timeZone = timeZone;
    appointment.time = time;

    appointment.save().then(function() {
      res.redirect('/');
    });
  });
});

// POST: /appointments/:id/delete
router.post('/:id/delete', function(req, res, next) {
  const id = req.params.id;

  Appointment.remove({ _id: id }).then(function() {
    res.redirect('/');
  });
});

module.exports = router;
