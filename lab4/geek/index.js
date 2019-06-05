var http = require("http");
var url = require("url");
var fs = require("fs");
var qs = require("querystring");
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'D:/Pliki/SQLite/db1.db'
});

var Subject = sequelize.define('Subjects', {
    SubjectName: Sequelize.STRING,
    StudentName: Sequelize.STRING
}, {
    timestamps: false
});
Subject.removeAttribute('id');

var Grade = sequelize.define('Grades', {
    TeacherName: Sequelize.STRING,
    SubjectName: Sequelize.STRING,
    StudentName: Sequelize.STRING,
    Grade: Sequelize.REAL
}, {
    timestamps: false
});
Grade.removeAttribute('id');


function collectRequestData(request, callback) {
    var body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        callback(qs.parse(body));
    })
}


http.createServer(function (request, response) {
    console.log("--------------------------------------");
    console.log("The relative URL of the current request: " + request.url + "\n");
    var url_parts = url.parse(request.url, true); //parsing (relative) URL

    if (url_parts.pathname == '/subjects') {
        fs.readFile("subjects.html", (error, data) => {
            if (error) {
                response.writeHead(404);
                response.write("File not found");
            } else {
                response.writeHead(200, {'Content_Type': 'text/html; charset=utf-8'});
                response.write(data);
            }
            response.end();
        });

    } else if (url_parts.pathname == '/subjects/add') {
        collectRequestData(request, data => {
            response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
            var subject = Subject.build({
                SubjectName: data['subject_name'],
                StudentName: data['student_name']
            });
            subject.save().then(() => {
                console.log("Added record");
                response.write(data['subject_name'] + " | " + data['student_name'] + "\n");
                response.write("RECORD ADDED SUCCESSFULLY\n");
                response.end();
            });
        });
    } else if (url_parts.pathname == '/subjects/delete') {
        collectRequestData(request, data => {
            response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
            if (data['student_name'] == "*") {
                Subject.destroy({where: {SubjectName: data['subject_name']}}).then( () => {
                    console.log("Records deleted");
                    response.write(data['subject_name'] + " | " + data['student_name'] + "\n");
                    response.write("RECORDS DELETED SUCCESSFULLY\n");
                    response.end();
                });
            } else {
                Subject.findOne({
                    where: {
                        SubjectName: data['subject_name'],
                        StudentName: data['student_name']
                    }
                }).then(record => {
                    record.destroy().then(() => {
                        console.log("Record deleted");
                        response.write(data['subject_name'] + " | " + data['student_name'] + "\n");
                        response.write("RECORD DELETED SUCCESSFULLY\n");
                        response.end();
                    })
                })
            }
        });
    } else if (url_parts.pathname == '/subjects/show') {
        var subject_name = url_parts.query['subject_name'];
        Subject.findAll({
            where: {
                SubjectName: subject_name
            },
            raw: true,
        }).then(subjects => {
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.write("<style>table, td, th { border: 1px solid #ddd;text-align: left;}table {border-collapse: collapse;width: 100%;}th, td {padding: 15px;}</style>");
            response.write("<table style='width:100%'>");
            response.write("<tr><th>PRZEDMIOT</th><th>STUDENT</th></tr>");
            for (var i = 0; i < subjects.length; i++) {
                response.write(`<tr><td>${subjects[i].SubjectName}</td><td>${subjects[i].StudentName}</td></tr>`);
            }
            response.write("</table>");
            response.end();
        });

    } else if (url_parts.pathname == '/grades') {
        fs.readFile("grades.html", (error, data) => {
            if (error) {
                response.writeHead(404);
                response.write("File not found");
            } else {
                response.writeHead(200, {'Content_Type': 'text/html; charset=utf-8'});
                response.write(data);
            }
            response.end();
        });

    } else if (url_parts.pathname == '/grades/add') {
        collectRequestData(request, data => {
            response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            var grade = Grade.build({
                TeacherName: data['teacher_name'],
                SubjectName: data['subject_name'],
                StudentName: data['student_name'],
                Grade: data['grade']
            });
            grade.save().then(() => {
                console.log("Grade added");
                response.write(`${data['teacher_name']} | ${data['subject_name']} | ${data['student_name']} | ${data['grade']}\n`);
                response.write("RECORD ADDED SUCCESSFULLY\n");
                response.end();
            })
        })
    } else if (url_parts.pathname == '/grades/delete') {
        collectRequestData(request, data => {
            response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
            Grade.findOne({
                where: {
                    TeacherName: data['teacher_name'],
                    SubjectName: data['subject_name'],
                    StudentName: data['student_name'],
                    Grade: data['grade']
                }
            }).then(record => {
                record.destroy().then(() => {
                    console.log("Record deleted");
                    response.write(`${data['teacher_name']} | ${data['subject_name']} | ${data['student_name']} | ${data['grade']}\n`);
                    response.write("RECORD DELETED SUCCESSFULLY\n");
                    response.end();
                })
            })
        });
    } else if (url_parts.pathname == '/grades/show') {
        var teacher_name = url_parts.query['teacher_name'];
        Grade.findAll({
            where: {
                TeacherName: teacher_name
            },
            raw: true,
        }).then(grades => {
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.write("<style>table, td, th { border: 1px solid #ddd;text-align: left;}table {border-collapse: collapse;width: 100%;}th, td {padding: 15px;}</style>");
            response.write("<table style='width:100%'>");
            response.write("<tr><th>PROFESOR</th><th>PRZEDMIOT</th><th>STUDENT</th><th>OCENA</th></tr>");
            for (var i = 0; i < grades.length; i++) {
                var bc = 'green';
                if(grades[i].Grade < 3.0){
                    bc = 'red';
                }
                response.write(`<tr><td>${grades[i].TeacherName}</td><td>${grades[i].SubjectName}</td><td>${grades[i].StudentName}</td><td style = "background-color: ${bc}">${grades[i].Grade}</td></tr>`);
            }
            response.write("</table>");
            response.end();
        });

    } else {
        fs.readFile("home.html", (error, data) => {
            if (error) {
                response.writeHead(404);
                response.write("File not found");
            } else {
                response.writeHead(200, {'Content_Type': 'text/html; charset=utf-8'});
                response.write(data);
            }
            response.end();
        });
    }
}).listen(9090);
console.log("The server was started on port 9090");