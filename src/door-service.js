#!/usr/bin/env node

var debug = require('debug')('door'),
    util = require('util'),
    bleno = require('bleno');

var DoorAuthCharacteristic = require('./door-auth-characteristic');


var DoorService = function(){
  DoorService.super_.call(this, {
    name: 'Door',
    uuid: 'DD613893991A4C4F9115709BF14A4FD7',
    characteristics: [
      new DoorAuthCharacteristic()
    ]
  });
};
util.inherits(DoorService, bleno.PrimaryService);


module.exports = DoorService;
