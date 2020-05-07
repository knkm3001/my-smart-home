const request = require("request")

exports.asyncRequest = function(options){
    return new Promise(function(resolve,reject){
        request(options, function(err, res, body){
            if(!err && res.statusCode == 200){
                resolve(body);
            }else{
                reject(err);
            }
        })
    })
}