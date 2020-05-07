const asyncRequest = require('./asyncRequest');

exports.sendIRCode = async (payload)=>{
    const options = {
        url: 'http://192.168.0.48/esp32/flashIR',
        method: "POST",
        headers: {
            "Content-type": "application/json",
          },
          json: payload
      };
    const res = await asyncRequest.asyncRequest(options)
}