var supertest = require("supertest");

var server = supertest.agent("http://localhost:9090");

// UNIT test begin
describe('GET /', function () {
    it('respond with /subjects/show', function (done) {
        server
            .get('/subjects/show?subject_name=JavaScript')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('respond with /grades/show', function (done) {
        server
            .get('/grades/show?teacher_name=Wac%C5%82aw+Frydrych')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });

});