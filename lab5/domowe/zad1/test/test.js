//Source: https://codeforgeek.com/2015/07/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:9000");

// UNIT test begin
describe('adds source code variables: GET /', function () {
    it('respond with html', function (done) {
        server
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200)
            .expect("1 + 2 = 3")
            .end(done);
    });
});

describe('adds given args: GET /add/3/4', function () {
    it('respond with html', function (done) {
        server
            .get("/add/3/4")
            .expect('3 + 4 = 7')
            .end(done);
    });
});