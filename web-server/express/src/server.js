'use strict'

// Constants
const PORT = 3000
const HOST = '0.0.0.0'

// express 周り
const express = require('express')
const bodyParser = require('body-parser')

const crypto = require('crypto')

const app = express()

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )


// intercept OPTIONS method
if ('OPTIONS' === req.method) {
    res.send(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)


app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

// mongodb 周り
const mongoose = require('mongoose')
const Roomdata = require('./models/Roomdata')
const HomeAppliance = require('./models/HomeAppliance')

const options = {
	useUnifiedTopology : true,
    useNewUrlParser : true
}

const url = 'mongodb://user:password@mongo:27017/my-smart-room'


mongoose.connect(url, options)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('DB connection successful'))


// raspiへの赤外線信号の処理用
const request2esp32 = require('./models/request2esp32')
const aircon = require('./models/aircon')
const room_light = require('./models/room_light')

// timer 用
global.timeoutID = null

// post raspiからの部屋のデータ登録
app.post('/express/roomdata/register/', (req, res) => {
  console.log(req.body)
  let roomdata_instance = new Roomdata(req.body)
  roomdata_instance.save(function (err) {
    if (err) return console.error(err)
  })
  res.send('POST is sended.')
})


// get raspiからの部屋のデータ取得
app.get('/express/roomdata/fetch/', (req, res) => {
  let fetchnum = req.query.fetchnum
  let num = (typeof parseInt(fetchnum,10) == 'number' && parseInt(fetchnum,10) > 0) ? parseInt(fetchnum,10) : 24
  Roomdata.find(
      {}, [], // フィルター, カラム
      {
        limit : num,
        sort : {createdAt:-1}
      }
    )
    .then((data) => {
      res.send(data)
    })
    .catch(()=>{
      res.status(500)
    })
})


// post esp32への赤外線信号送信
app.post('/express/home-appliance/ir-option/', (req, res) => {
  console.dir(req.body)
  let payload
  switch(req.body.target){
    case 'room_light':
      payload = room_light.convertToIRCode(req.body.status)
      request2esp32.sendIRCode(payload)
      break
    case 'aircon':
      payload = aircon.convertToIRCode(req.body.status)
      let timerID = crypto.randomBytes(16).toString('base64').substring(0, 16)
      console.log("timerID: "+timerID)

      if(!(req.body.status.timer.settimer)){
        // timer使わない
        console.dir(payload)
        request2esp32.sendIRCode(payload)
      }else{
        // timer使う
        let power_status
        let buff_timerID = timerID
        let now = new Date()
        let now_h = now.getHours()
        let now_m = now.getMinutes()
        let [set_h,set_m] = req.body.status.timer.settime.split(':')
        let now_msec = (now_h*3600+now_m*60)*1000
        let set_msec = (set_h*3600+set_m*60)*1000
        let wait_msec = 0

        if(set_msec >= now_msec){
          wait_msec = set_msec - now_msec
        }else{
          // 日をまたぐ場合
          wait_msec = set_msec + (24*3600*1000 - now_msec)
        }

        console.log((wait_msec)/1000+' sec後');
        let power_status
        (async function(){
          if(req.body.status.timer.timermode){
            // power: on
            console.log('power: on')
            await new Promise(resolve => setTimeout(resolve, wait_msec))
            request2esp32.sendIRCode(payload)
            power_status = 1
          }else{
            // power: off
            console.log('power: off')
            request2esp32.sendIRCode(payload);
            await new Promise(resolve => setTimeout(resolve, wait_msec))
            req.body.status.power = 0
            payload = aircon.convertToIRCode(req.body.status)
            request2esp32.sendIRCode(payload);
            power_status = 0
          }
          // db更新
          HomeAppliance.findOne({}, [], {sort : {createdAt:-1}})
          .then((data) => {
            let updated_status = {}
            updated_status.home_appliance_status = JSON.parse(JSON.stringify(data.home_appliance_status))
            updated_status.home_appliance_status.aircon.power = power_status
            updated_status.home_appliance_status.aircon.timer = { settimer: false, timermode: '', settime: '' }
            let home_appliance_instance = new HomeAppliance(updated_status);
            home_appliance_instance.save(function (err) {
              if (err) console.log(err)
            })
          })
        }());
      }
      break;
  }
  res.send('POST is sended.')
})



// post 家電情報の登録
app.post('/express/home-appliance/register/', (req, res) => {
  console.log("req body: ")
  console.log(req.body)
  let home_appliance_instance = new HomeAppliance(req.body)
  home_appliance_instance.save(function (err) {
    if (err){
      res.send(err)
    }else{
      res.send('家電情報登録')
    }
  })
})


// get 家電情報の取得
app.get('/express/home-appliance/fetch/', (req, res) => {
  HomeAppliance.findOne(
    {}, [], // フィルター, カラム
    {
      sort : {createdAt:-1}
    }
  )
  .then((data) => {
    res.send(data)
  })
})



app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

