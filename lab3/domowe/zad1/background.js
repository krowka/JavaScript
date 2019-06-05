var m1 = 1;
var m2 = 1;

function multiply() {
    for(var i = 0; i < 50000000; i++) {
        m1 *= 1.00000000001123213213213213210329138210382901;
        m2 = m1 * 0.9999999999999999999991213132132132121323;
    }
    return m2;
}

onmessage = function() {
    var res = multiply();
    postMessage(res);
}