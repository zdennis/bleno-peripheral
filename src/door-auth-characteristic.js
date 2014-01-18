#!/usr/bin/env node

var debug = require('debug')('door'),
    util = require('util'),
    bleno = require('bleno');

var Authentication = require('./authentication'),
    Door = require('./door');


var DoorAuthCharacteristic = function(){
  DoorAuthCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffff1',
    properties: ['read', 'notify', 'writeWithoutResponse'], // read, write, writeWithoutResponse, notify
  //  secure: ['read', 'notify', 'writeWithoutResponse'],
    value: null,
    descriptors: []
  });
};
util.inherits(DoorAuthCharacteristic, bleno.Characteristic);


DoorAuthCharacteristic.prototype.onReadRequest = function(offset, callback){
  debug('DoorAuthCharacteristic#onReadRequest with arguments: ', arguments);

  var result = this.RESULT_SUCCESS,
      data   = new Buffer('The door');

  // Offset is provided by the client when the message is too long for
  // one packet. The default BTLE packet size is 20 bytes.
  if (offset > data.length) {
    result = this.RESULT_INVALID_OFFSET;
    data = null;
  }

  callback(result, data);
};


DoorAuthCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback){
  debug('DoorAuthCharacteristic#onWriteRequest with arguments: ', arguments);

  var result;

  if(Authentication.authenticate(data.toString('utf8'))){
    debug('door authentication success');
    Door.open();
    result = this.RESULT_SUCCESS;
  } else {
    debug('door authentication failed');
    result = this.RESULT_UNLIKELY_ERROR;
  }

  callback(result);
};


DoorAuthCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) { 
  debug('DoorAuthCharacteristic#onSubscribe with arguments: ', arguments);
  setInterval(function(){
    updateValueCallback(new Buffer("hello Fred " + Math.random()));
  }, 5000)
};


DoorAuthCharacteristic.prototype.onUnsubscribe = function(){
  debug('DoorAuthCharacteristic#onUnsubscribe with arguments: ', arguments);
};


DoorAuthCharacteristic.prototype.onNotify = function(){
  debug('DoorAuthCharacteristic#onNotify with arguments: ', arguments);
};


module.exports = DoorAuthCharacteristic;
