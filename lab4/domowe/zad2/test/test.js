var expect = require('chai').expect;
var module = require('../script');

describe('The checkPath() method', function() {

  it('Check if path is a file and print its content', function() {
    var res = module.checkPath('./parentDir/file.txt');
    expect(res).to.equal('./parentDir/file.txt is a file.\nfile');
    res = module.checkPath('./parentDir/childDir1/file1.txt');
    expect(res).to.equal('./parentDir/childDir1/file1.txt is a file.\nfile1');
    res = module.checkPath('./parentDir/childDir2/file2.txt');
    expect(res).to.equal('./parentDir/childDir2/file2.txt is a file.\nfile2');
  });

  it('Check if path is a directory', function() {
    var res = module.checkPath('./parentDir');
    expect(res).to.equal('./parentDir is a directory.\n');
    res = module.checkPath('./parentDir/childDir1');
    expect(res).to.equal('./parentDir/childDir1 is a directory.\n');
    res = module.checkPath('./parentDir/childDir2');
    expect(res).to.equal('./parentDir/childDir2 is a directory.\n');
  });

  it('Check if path exists', function() {
    var res = module.checkPath('./non/existing/path');
    expect(res).to.equal('Path: ./non/existing/path does not exist.\n');
  });
//   it('Returns 0 for -2+2', function() {
//     var op = new module(-2,2);
//     expect(op.sum()).to.equal(0);
//   });
});