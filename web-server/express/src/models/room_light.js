exports.convertToIRCode = function(status){
    if(status.power){
        var payload = {
            "base_time": 583,
            "signal": [[16, 8], "017620df", [1, 77], [16, 8], "e730e11e", [1, 77], [6, 3], "80080c0af500ff10ef43bc", [1, 62], [6, 3], "344a901484"]
            }
    }else{
        var payload = {
            "base_time": 555,
            "signal": [[16, 8], "017600ff", [1, 1]]
            }
    }
    return payload;

};