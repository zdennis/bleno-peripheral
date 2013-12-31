#!/usr/bin/env node

var util = require('util');
var bleno = require('bleno');

var PrimaryService = bleno.PrimaryService,
    Characteristic = bleno.Characteristic;

var name         = 'MyP';
//    serviceUuids =  ['DD613893991A4C4F9115709BF14A4FD7'];
//var serviceUuids = ['fffffffffffffffffffffffffffffff0']


var characteristic = new Characteristic({
  uuid: 'fffffffffffffffffffffffffffffff1',
  properties: ['read', 'notify', 'writeWithoutResponse'], // read, write, writeWithoutResponse, notify
  value: null,
  descriptors: [
  ],
  onReadRequest: function(error){
    console.log("read-request: " + error);
  },
  onWriteRequest: function(callback){
    console.log("write request with arguments");
    console.log(arguments);
    var result = Characteristic.RESULT_SUCCESS;
    callback(result)
  },
  onSubscribe: function(error){
    console.log("subscribed: " + error);
  },
  onUnsubscribe: function(error){
    console.log("unsubscribed: " + error);
  },
  onNotify: function(error){
    console.log("notified: " + error);
  }
});

var primaryService = new PrimaryService({
  uuid: 'DD613893991A4C4F9115709BF14A4FD7',
  characteristics: [
    characteristic
  ]
});


bleno.on('stateChange', function(state){
  console.log("state changed: " + state);
});

bleno.on('advertisingStart', function(error){
  if(!error){
    console.log("advertising started without error");
    bleno.setServices([
      primaryService
    ]);
  } else {
    console.log("advertising started with error");
  }
});

bleno.startAdvertising(name, [primaryService.uuid]);

