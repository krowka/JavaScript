var supertest = require("supertest");
var chai = require('chai');
var fs  = require('fs');

chai.use(require('chai-json'));

var server = supertest.agent("http://localhost:3000");

describe('checking operators: /execute/testfile1.json', function () {
    it('1 + 2 =? 3', function (done) {
        server
            .get('/execute/testfile1.json')
            .expect('Content-Type', /text/)
            .expect(200)
            .expect("1 + 2 = 3\n")
            .end(done);
    });
});

// describe('verify JSON file', function () {
//     it('to be a JSON file', function (done) {
//         var file = fs.openSync('./testfile1.json', "rs+");
//         expect(file).to.be.a.jsonFile();
//     });
//});