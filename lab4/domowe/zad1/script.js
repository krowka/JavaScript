
const Operation = require('./module.js');

var argv = process.argv;
if (argv.length == 4) {
    var x = argv[2];
    var y = argv[3];
    /**
     * @class
     * Represents a operation
     * @param x - The first number
     * @param y - The second number.
     */
    const operation = new Operation(x, y);
    /**
     * Function to sum entered numbers.*/
    console.log(operation.sum());
}
else {
    console.log("Wrong number of arguments!\nRequire 2 args.")
}
// console.log(Operation.prototype.sum());