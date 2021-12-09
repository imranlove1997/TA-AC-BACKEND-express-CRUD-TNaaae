var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var path = require('path');

mongoose.connect("mongodb://localhost/school", { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log(err ? err : 'Conencted...');
});

var app = express();

app.use(logger('dev'));

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))


app.get('/', (req, res) => {
    res.render('index', { name: 'Altcampus'});
});



app.listen(3000, () => {
    console.log('Listening on port 3000');
});