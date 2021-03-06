// 家電情報データ用のmongooseスキーマ

const mongoose = require('mongoose');

const HomeApplianceSchema = mongoose.Schema(
  {
  home_appliance_status:{
      aircon:{
          power : Boolean,
          mode : String,
          temp : Number,
          wind : 
            {
            windpower:Number,
            winddirec:Number
            },
          timer:{
            settimer:Boolean,
            timermode:String,
            settime:String
            }
          },
      room_light:{
          power : Boolean
          }
        }
    }, 
    {
        timestamps: true
    })

module.exports = mongoose.model('HomeAppliance',HomeApplianceSchema);


