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

const url = 'mongodb://root:root@mongo:27017'

mongoose.connect(url, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('DB connection successful'));


app.get('/', (req, res) => {
  res.render("index",{});
});

app.post('/api/register/', (req, res) => {
    console.log(req.body);
    res.send('POST is sended.');

    var obj = req.body;
  });

app.get('/user', async (req, res) => {
	const users = await User.find({});
	res.json(users);
});


app.get('/user2', async (req, res) => {
	const users = await User2.find({});
	res.json(users);
});

app.get('/roomdata', (req, res) => {
	const roomdata = Roomdata.find({});
	res.json(roomdata);
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);