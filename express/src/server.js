'use strict';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// express 周り
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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

const url = 'mongodb://user:password@mongo:27017/myroom_data'


mongoose.connect(url, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('DB connection successful'));


app.get('/', (req, res) => {
  res.render("index",{});
});



// post データ登録
app.post('/api/register/', (req, res) => {
    console.log(req.body);
    var roomdata_instance = new Roomdata(req.body);
    roomdata_instance.save(function (err) {
      if (err) return console.error(err);
    });
    res.send('POST is sended.');
  });

// get データ取得
app.get('/api/fetch/', (req, res) => {
  var fetchnum = req.query.fetchnum;
  var num = (typeof parseInt(fetchnum,10) == 'number' && parseInt(fetchnum,10) > 0) ? parseInt(fetchnum,10) : 60
  console.log(num);
  console.log(typeof num);
  Roomdata.find(
    {}, // フィルター
    [], // カラム
    {
      limit:num,
      sort: {createdAt:-1}
    }
    )
    .then((data) => {
      res.send(data);
    })
});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);