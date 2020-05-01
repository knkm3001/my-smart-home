const request = require('request');

exports.execIRCode = function(payload){
    var options = {
        url: 'http://192.168.0.48/esp32/flashIR',
        headers: {
            "Content-type": "application/json",
          },
          json: payload
      };
    request.post(options, function(error, response, body){
        console.dir(response.statusCode)
    });
}