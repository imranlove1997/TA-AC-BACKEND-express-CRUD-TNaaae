var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema ({
    name: String,
    email: String
}, {timestamps: true});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;