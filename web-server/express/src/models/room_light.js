exports.convertToIRCode = function(status){
    if(status.power){
        var payload = {
            "base_time": 583,
            "signal": ["16", "8", "0x017620df", "1, 77", "16, 8", "0xe730e11e", "1, 77", "6, 3", "0x80080c0af500ff10ef43bc", "1, 62", "6, 3", "0x344a901484"]
            }
    }else{
        var payload = {
            "base_time": 555,
            "signal": ["16", "8", "0x017600ff", "1", "1"]
            }
    }
    return payload;

};