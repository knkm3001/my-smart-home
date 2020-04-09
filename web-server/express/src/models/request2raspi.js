const request = require('request');

exports.execIRCodes = function(payload){
    var options = {
        url: 'http://192.168.0.5:5000/raspi/infrared_code/',
        headers: {
            "Content-type": "application/json",
          },
          json: payload
      };
    request.post(options, function(error, response, body){
        console.dir(response.statusCode)
    });
}