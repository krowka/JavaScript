const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
var account = "";

app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost/wirtualny-dziekanat', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: false}));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Successfully connected to the database");
});


var teacherSchema = new mongoose.Schema({
    teacher_id: Number,
    password: String,
    fullname: String
});

var groupSchema = new mongoose.Schema({
    group_id: Number,
    subject_name: String,
    teacher_id: [Number]
});

var studentSchema = new mongoose.Schema({
    index_id: Number,
    password: String,
    fullname: String,
    grades: [{group_id: Number, grades: [Number]}]
});

var Teacher = mongoose.model('Teacher', teacherSchema);
var Group = mongoose.model('Group', groupSchema);
var Student = mongoose.model('Student', studentSchema);


app.listen(3000, () => {
    console.log("Server is listening on the port 3000\n")
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.get('/a', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

app.post('/add', (req, res) => {
    console.log(req.body.id);
    console.log(req.body.password);
    console.log(req.body.fullname);
    var newTeacher = new Teacher({teacher_id: req.body.id, password: req.body.password, fullname: req.body.fullname});
    newTeacher.save((err, newTeacher) => {
        if (err) return console.error(err);
        res.send("Added successfully");
    })
});

app.post('/admin/addGroup', (req, res) => {
    console.log(req.body.id);
    console.log(req.body.password);
    console.log(req.body.fullname);
    var newTeacher = new Teacher({teacher_id: req.body.id, password: req.body.password, fullname: req.body.fullname});
    newTeacher.save((err, newTeacher) => {
        if (err) return console.error(err);
        res.send("Added successfully");
    })
});

async function getGrades(res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write("<style>table, td, th { border: 1px solid #ddd;text-align: left;}table {border-collapse: collapse;width: 100%;}th, td {padding: 15px;}</style>");
    res.write(`<div><h1>${account.fullname}</h1></div>`)
    res.write("<table style='width:100%'>");
    res.write("<tr><th>PRZEDMIOT</th><th>OCENY</th><th>ŚREDNIA</th></tr>");
    for (var i = 0; i < account.grades.length; i++) {
        var grades = account.grades[i].grades;
        var average = "";
        if (grades.length != 0) {
            average = grades.reduce((a, b) => {
                return a + b
            }) / grades.length;
        }
        await Group.findOne({group_id: account.grades[i].group_id}, (err, group) => {
            if (err) return console.error(err);
            res.write(`<tr><td>${group.subject_name}</td><td>${grades.join(", ")}</td><td>${average}</td></tr>`);
        });
    }
    res.write("</table>");
    res.end();
}

app.get('/grades', (req, res) => {
    getGrades(res);
});

app.post('/students/login', (req, res) => {
    Student.findOne({index_id: req.body.id}, (err, student) => {
        if (err) return console.error(err);
        if (student.password == req.body.password) {
            account = student;
            console.log("Logged successfully");

            res.redirect("/grades");
        } else {
            res.send("Wrong password");
        }
    });
});

app.get('/teacherCRUD', (req, res) => {
    res.sendFile(__dirname + '/teacherCRUD.html');
});

app.post('/teachers/login', (req, res) => {
    Teacher.findOne({teacher_id: req.body.id}, (err, teacher) => {
        if (err) return console.error(err);
        if (teacher.password == req.body.password) {
            account = teacher;
            console.log("Logged successfully " + account);
            res.redirect("/teacherCRUD");
        } else {
            res.send("Wrong password");
        }
    });
});

app.post('/teacher/addGrade', (req, res) => {
    Student.findOne({'index_id': req.body.student_id}, (err, student) => {
        if (err) return console.error(err);
        for(var i = 0; i < student.grades.length; i++){
            if(student.grades[i].group_id == req.body.group_id){
                student.grades[i].grades.push(req.body.grade);
                student.save();
                res.send("Added");
                break;
            }
        }
    });
});

app.post('/teacher/deleteGrade', (req, res) => {
    Student.findOne({'index_id': req.body.student_id}, (err, student) => {
        if (err) return console.error(err);
        for(var i = 0; i < student.grades.length; i++){
            if(student.grades[i].group_id == req.body.group_id){
                for(var j = 0; j < student.grades[i].grades.length; j++){
                    if(student.grades[i].grades[j] == req.body.grade){
                        let deleted = student.grades[i].grades.splice(j, 1);
                        res.send("Deleted " + deleted);
                        student.save();
                        break;
                    }
                }
            }
        }
    });
});




app.get('/teacher/showGrades', (req, res) => {
    // Group.find({teacher_id : account.teacher_id}, (err, groups) => {
    //     // console.log("outer");
    //     for(var i =  0; i < groups.length; i++){
    //         console.log(groups[i].subject_name + " " + groups[i].group_id);
    //         res.send(groups[i].subject_name + " " + groups[i].group_id);
    //         Student.find({ grades: { $elemMatch: { group_id: groups[i].group_id }}}, (err, students) => {
    //             // console.log("inner");
    //             for(var j = 0; j < students.length; j++) {
    //                 console.log(students[j].grades[0].grades);
    //                 res.send(students[j].fullname + " " + students[j].index_id + " " + students[j].grades[0].grades)
    //             }
    //         })
    //     }
    // });
});