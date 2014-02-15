#!/usr/bin/env node

var debug       = require('debug')('door'),
    exec        = require('child_process').exec,
    fs          = require('fs'),    
    doorOpenCommand = process.env.DOOR_OPEN_COMMAND;

if(!doorOpenCommand)
  throw("The DOOR_OPEN_COMMAND environment variable wasn't specified. It must be supplied and point to an executable to open the door.");

if(!fs.existsSync(doorOpenCommand))
  throw("The door open command doesn't exist! Please check your path, was given: DOOR_OPEN_COMMAND=" + allowedFile);

debug("Using door open command: " + doorOpenCommand);


var Door = {
  open: function(){
    var child;

    child = exec(doorOpenCommand, function (error, stdout, stderr) {
      debug("Door open stdout: " + stdout);
      debug("Door open stderr: " + stderr);
      if (error !== null) {
        console.log('Door open error: ' + error);
      }
    });
  }
};


module.exports = Door;
