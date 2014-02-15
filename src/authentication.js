var debug       = require('debug')('door'),
    fs          = require('fs'),
    allowedFile = process.env.ALLOWED_FILE;

if(!allowedFile)
  throw("The allowed file wasn't specified. It must be supplied as an environment variable, e.g: ALLOWED_FILE=/path/to/file.json");

if(!fs.existsSync(allowedFile))
  throw("The allowed file doesn't exist! Please check your path, was given: ALLOWED_FILE=" + allowedFile);

debug("Using allowed file at " + allowedFile);

var Authentication = {
  authenticate: function(secret){
    var allowed = JSON.parse(fs.readFileSync(allowedFile));

    debug('Authentication#authenticate with arguments: ', arguments);
    return !!allowed[secret];
  }
};


module.exports = Authentication;
