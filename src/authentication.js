var debug = require('debug')('door');


var Authentication = {
  authenticate: function(secret){
    debug('Authentication#authenticate with arguments: ', arguments);
    return secret === "abc123";
  }
};


module.exports = Authentication;
