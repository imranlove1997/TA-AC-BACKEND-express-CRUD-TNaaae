var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

var port = 4000;

mongoose.connect('mongodb://localhost/users-diary', { useNewUrlParser: true, useUNifiedTopology: true}, (err) => {
    console.log('Connected...', err ? false : true);
});

var app = express();

app.use(logger('dev'));

app.use(express.urlencoded( { extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);
app.use('/users', userRouter);

app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
});

app.use((err, req, res, next) => {
    res.send(err);
});

app.listen(port, (err) => {
    if(err) console.log(err);
    console.log('Server is listening on port ', port);
});