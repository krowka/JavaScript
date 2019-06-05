// OLD VERSION OF CREATING CLASS
// function Operation(x, y) {
//     this.x = x;
//     this.y = y;
// }
// Operation.prototype.sum = function () {return this.x + this.y;}

// NEW VERSION

module.exports =
    class Operation {
    constructor(x, y) {
        this.x = parseInt(x);
        this.y = parseInt(y);
    }
    sum() {
        return this.x + this.y;
    }
};