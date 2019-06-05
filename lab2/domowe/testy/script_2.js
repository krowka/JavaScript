"use strict";
var expect = chai.expect;
var assert = chai.assert;
var global_sum = 0;

function digits(string) {
    var result = 0;

    // for(var i = 0; i < string.length; i++){
    //     if(!isNaN(string[i]))
    //         result += parseInt(string[i]);
    // }


    for (var a of string) {
        if (/[0-9]/.test(a))
            result += parseInt(a);
    }
    return result;
}

function letters(string) {
    // var result = 0;
    // for(var i = 0; i < string.length; i++){
    //     if(/[a-z]/i.test(string[i]))
    //         result += 1;
    // }
    // return result;

    var match = string.match(/[a-z]/ig);
    return match == null ? 0 : match.length;
}

function sum(string) {
    if(/[0-9]/.test(string[0])){
        var number = string.match(/[0-9]+/);
        global_sum += parseInt(number);
    }
    return global_sum;
}

var input = window.prompt("Enter data");
while (input != null) {
    var text = input + '<br>' + '\t' + "<b style = 'color: red'>" + digits(input) + "</b>" +
        '\t' + "<b style = 'color: green'>" +  letters(input) + "</b>" + '\t ' +
        "<b style = 'color: blue'>"+ sum(input) + "</b>" + "\n";
    var log =  input + '\n' + '\t' + digits(input) + '\t' + letters(input) + '\t '+ sum(input) + "\n";
    document.getElementById("mocha").innerHTML += "<pre>" + text + "</pre>";
    console.log(log);
    input = window.prompt("Enter data");
}

// describe('The digits() function', function() {
//     it('Returns 3 for 111', function () {
//         assert.equal(3, digits('111'));
//     });
//
//     it('Returns 0 for Aa',function () {
//         assert.equal(0, digits('Aa'));
//     });
//
//     it('Returns 6 for aBc123', function() {
//         assert.equal(6, digits('aBc123'));
//     });
//
//     it('Returns 15 for 1095abCD', function() {
//         assert.equal(15, digits('1095abCD'));
//     });
//
//     it('Returns 0 for empty string', function(){
//         assert.equal(0, digits(''));
//     });
// });
//
// describe('The letters() function', function() {
//     it('Returns 0 for 111', function () {
//         assert.equal(0, letters('111'));
//     });
//
//     it('Returns 2 for Aa',function () {
//         assert.equal(2, letters('Aa'));
//     });
//
//     it('Returns 3 for aBc123', function() {
//         assert.equal(3, letters('aBc123'));
//     });
//
//     it('Returns 15 for 1095abCD', function() {
//         assert.equal(4, letters('1095abCD'));
//     });
//
//     it('Returns 0 for empty string', function(){
//         assert.equal(0, letters(''));
//     });
// });
//
// describe('The sum() function', function() {
//     it('Returns 111 for 111', function () {
//         assert.equal(111, sum('111'));
//     });
//
//     it('Returns 111 for Aa',function () {
//         assert.equal(111, sum('Aa'));
//     });
//
//     it('Returns 111 for aBc123', function() {
//         assert.equal(111, sum('aBc123'));
//     });
//
//     it('Returns 1206 for 1095abCD', function() {
//         assert.equal(1206, sum('1095abCD'));
//     });
//
//     it('Returns 1206 for empty string', function(){
//         assert.equal(1206, sum(''));
//     });
// });