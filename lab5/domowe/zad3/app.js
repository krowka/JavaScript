var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.json());

app.get('/execute/:path', (req, res) => {

    var json = require(`./${req.params.path}`);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // console.log(json.opsArray);
    // res.write(JSON.stringify(json.opsArray));
    // res.write(JSON.stringify(json.opsArray[0].number1));
    // res.write(JSON.stringify(json.opsArray[0].number2));
    // res.write(json.opsArray[0].operator);
    for (var i = 0; i < json.opsArray.length; i++) {
        var number1 = json.opsArray[i].number1;
        var number2 = json.opsArray[i].number2;
        var op = json.opsArray[i].operator;
        switch (op) {
            case "+":
                res.write(`${number1} + ${number2} = ${number1 + number2}\n`);
                break;
            case "-":
                res.write(`${number1} - ${number2} = ${number1 - number2}\n`);
                break;
            case "*":
                res.write(`${number1} * ${number2} = ${number1 * number2}\n`);
                break;
            case "/":
                res.write(`${number1} / ${number2} = ${number1 / number2}\n`);
                break;
            default:
                res.write(`Not supported operator: ${op}\n SUPPORTED OPERATORS: '+', '-', '*', '/'\n`);
        }
    }
    res.end();
});


app.get('/', function (request, response) {
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("Enter 'localhost:3000/execute/exampleFilename.json' into your address bar to proceed the data.");
    response.end();
});

app.listen(3000, () => {
    console.log('The application is available on port 3000');
});