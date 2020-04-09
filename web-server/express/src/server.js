'use strict';

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// express 周り
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// mongodb 周り
const mongoose = require('mongoose');
const Roomdata = require('./models/Roomdata'); 

const options = {
	useUnifiedTopology : true,
    useNewUrlParser : true
}

const url = 'mongodb://user:password@mongo:27017/my-smart-room'


mongoose.connect(url, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('DB connection successful'));


// raspiへの赤外線信号の処理用
const request2raspi = require('./models/request2raspi');
const aircon = require('./models/aircon'); 
const room_light = require('./models/room_light'); 

app.get('/', (req, res) => {
  res.render("index",{});
});


// post raspiからの部屋のデータ登録
app.post('/express/api/register/', (req, res) => {
    console.log(req.body);
    var roomdata_instance = new Roomdata(req.body);
    roomdata_instance.save(function (err) {
      if (err) return console.error(err);
    });
    res.send('POST is sended.');
  });

// get raspiからの部屋のデータデータ取得
app.get('/express/api/fetch/', (req, res) => {
  var fetchnum = req.query.fetchnum;
  var num = (typeof parseInt(fetchnum,10) == 'number' && parseInt(fetchnum,10) > 0) ? parseInt(fetchnum,10) : 24
  Roomdata.find(
    {}, // フィルター
    [], // カラム
    {
      limit : num,
      sort : {createdAt:-1}
    }
    )
    .then((data) => {
      res.send(data);
    })
});


// post raspiへの赤外線信号送信
app.post('/express/api/ir-option/', (req, res) => {
  console.log(req.body);
  let payload;
  switch(req.body.target){
    case 'room_light':
      payload = room_light.convertToIRData(req.body.status)
      request2raspi.execIRCodes(payload);
      break;
    case 'aircon':
      payload = aircon.convertToIRData(req.body.status)
      console.dir(payload)
      request2raspi.execIRCodes(payload);
      break;
  }
  res.send('POST is sended.');
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);