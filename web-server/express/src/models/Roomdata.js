const mongoose = require('mongoose');

const RoomdataSchema = mongoose.Schema(
    {
        time:String,
        data:{
            temp: Number,
            pres: Number,
            hum : Number
        }
    }, 
    {
        timestamps: true
    })

module.exports = mongoose.model('Roomdata',RoomdataSchema);


