const mongoose = require('mongoose');

const RoomdataSchema = mongoose.Schema({
    time:String,
    data:{
        temp: Number,
        pres: Number,
        hum : Number
    }
})

module.exports = mongoose.model('Roomdata',RoomdataSchema);


