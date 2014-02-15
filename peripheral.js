#!/usr/bin/env node

var debug = require('debug')('door'),
    util = require('util'),
    bleno = require('bleno');

var DoorService = require('./src/door-service'),
    doorService = new DoorService();

bleno.on('stateChange', function(state){
  debug('bleno.stateChange: ' + state);
});

bleno.on('advertisingStart', function(error){
  if(!error){
    debug('bleno.advertisingStart success');
    bleno.setServices([
      doorService
    ]);
  } else {
    debug('bleno.advertisingStart error: ', error);

    debug(
      '\n==========================================================\n' + 
      'This error may be caused by having a Bluetooth device currently\n' + 
      'connected. Please disconnect the device and try to start again.\n' + 
      '==========================================================\n'
    );
  }
});

debug('Starting Door peripheral (' + doorService.uuid + ') on platform: ', process.platform);
bleno.startAdvertising(doorService.name, [doorService.uuid]);

