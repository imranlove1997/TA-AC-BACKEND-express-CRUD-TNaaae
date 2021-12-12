var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var port = 3000;

// connected to database
mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log("Connected", err ? false : true);
});

//intiliazing express
var app = express();

// capture form data
app.use(express.urlencoded({ extended: false}));

// ejs set
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//routing

app.use('/', indexRouter);
app.use('/users', userRouter);
// page not found error
app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
});

// Custom error
app.use((err, req, res, next) => {
    res.send(err);
})

app.listen(port, () => {
    console.log('Server is listening on port ', port);
})