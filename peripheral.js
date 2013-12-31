#!/usr/bin/env node

var util = require('util');
var bleno = require('bleno');

var PrimaryService = bleno.PrimaryService,
    Characteristic = bleno.Characteristic;

var name         = 'MyPeripheral',
    serviceUuids =  ['DD613893991A4C4F9115709BF14A4FD7'];
//var serviceUuids = ['fffffffffffffffffffffffffffffff0']


bleno.on('stateChange', function(state){
  console.log("state changed: " + state);
});

bleno.on('advertisingStart', function(state){
  console.log("advertising started");
});

var characteristic = new Characteristic({
  uuid: 'fffffffffffffffffffffffffffffff1',
  properties: ['writeWithoutResponse'], // read, write, writeWithoutResponse, notify
  value: null,
  descriptors: [
  ],
  onReadRequest: null,
  onWriteRequest: function(callback){
    console.log("write request with arguments");
    console.log(arguments);
    var result = Characteristic.RESULT_SUCCESS;
    callback(result)
  },
  onSubscribe: null,
  onUnsubscribe: null,
  onNotify: null
});

var primaryService = new PrimaryService({
  uuid: 'DD613893991A4C4F9115709BF14A4FD7',
  characteristics: [
    characteristic
  ]
});

bleno.setServices = [
  primaryService
];

console.log(primaryService.uuid);
bleno.startAdvertising(name, [primaryService.uuid]);

