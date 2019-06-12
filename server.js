var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var mongoose = require('mongoose');

var list = require('./server/routes/lists');

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', list.router);

app.use(express.static(path.join(__dirname + '/dist/meanTest1')));

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '/dist/meanTest1/index.html'));
});

const db = 'mongodb://localhost:27017/meantest1';
mongoose.connect(db, { useNewUrlParser: true }, function(err){
    console.log("mongo connection done");
    if(err){
        console.log("Error.."+err);
    }
});

app.get('/list', list.getlists);
app.post('/add', list.savelist);
app.delete('/list/:id', list.deletelist);
app.put('/list/edit/:id', list.updateList);
app.get('/list/:id', list.getlist);

var port = process.env.PORT || 3000;
app.set('port', port);

var server = http.createServer(app);

server.listen(port, function(err){
    if(err){
       return console.log('something bad happened', err);
    }
    console.log("Server is running..!!");
});