#!/usr/bin/env node

var debug = require('debug')('door');

var Door = {
  open: function(){
    debug("Door#open with arguments: ", arguments);
  }
};


module.exports = Door;
