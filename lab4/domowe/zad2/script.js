const fs = require('fs');
// var path = process.argv[2];

exports.checkPath = function checkPath(path) {
    try {
        var stat = fs.lstatSync(path);
        var result = "";
        if (stat.isDirectory()) {
            // console.log("\x1b[32m%s\x1b[0m\n", `${path} is a directory.`);
            result = `${path} is a directory.\n`;
        } else if (stat.isFile()) {
            // console.log("\x1b[32m%s\x1b[0m\n", `${path} is a file.`);
            // console.log("Content of the file:\n%s", fs.readFileSync(path).toString());
            result = `${path} is a file.\n`;
            result += fs.readFileSync(path).toString();
        } else {
            // console.log("\x1b[33m%s\x1b[0m\n", `${path} is neither a directory nor a file.`)
            result = `${path} is neither a directory nor a file.\n`;
        }
    } catch (err) {
        // printError(`Path: ${path} does not exist.`);
       result = `Path: ${path} does not exist.\n`;
       // console.log(err);
    } finally {
        return result;
    }

};

function printError(string) {
    console.error("\x1b[31m%s\x1b[0m\n", string);
}

// if(fs.existsSync(path)){
//     console.log(path);
// }
// else {
//     console.log(`Path: ${path} does not exist.`);
// }