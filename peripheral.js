#!/usr/bin/env node

var util = require('util');
var bleno = require('bleno');

/*
var PrimaryService = bleno.PrimaryService;
var Characteristic = bleno.Characteristic;

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

bleno.startAdvertising('GeLo')
*/

/*
var uuid = 'e2c56db5dffb48d2b060d0f5a71096e0';
var major = 0; // 0x0000 - 0xffff
var minor = 0; // 0x0000 - 0xffff
var measuredPower = -59; // -128 - 127

bleno.startAdvertisingIBeacon(uuid, major, minor, measuredPower);
*/


var name = 'MyPeripheral';
var serviceUuids =   ['DD613893991A4C4F9115709BF14A4FD7'];
//var serviceUuids = ['fffffffffffffffffffffffffffffff0']

bleno.startAdvertising(name, serviceUuids);

