var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var path = require('path');
var Student = require('./models/student');

var port = 3000;

mongoose.connect('mongodb://localhost/school', { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log(err ? err : 'Connected...');
});

var app = express();
app.use(logger('dev'));

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/students/new', (req, res) => {
    res.render('new');
})

app.post('/students', (req, res) => {
    console.log(req.body);
    Student.create(req.body, (err, student) => {
        console.log(err);
        res.json(student);
    });
});

app.get('/students', (req, res) => {
    Student.find({}, (err, students) => {
        console.log(err);
        res.render('students', { students: students});
    });
});

app.get('/students/:id', (req, res) => {
    var id = req.params.id;
    Student.findById(id, (err, student) => {
        console.log(err);
        res.render('students', {students: [student]});
    });
});

app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
});

app.listen(port, () => {
    console.log('Server is listening on port ', port);
});