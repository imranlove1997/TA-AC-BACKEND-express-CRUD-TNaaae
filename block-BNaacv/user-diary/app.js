var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var path = require('path');
var userRouter = require('./routes/users');

var port = 3000;

mongoose.connect('mongodb://localhost/user-diary', { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log(err ? err : 'Connected...');
});

var app = express();

app.use(logger('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded( { extended: false}));

app.use(express.json());

//routes

app.get('/', (req, res) => {
    res.render('index');
})

app.use('/users', userRouter);

app.use((req, res, next) => {
    res.status(404).send('404 Page Not Found');
});

app.listen(port, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Sever is listening on port', port);
    }
});