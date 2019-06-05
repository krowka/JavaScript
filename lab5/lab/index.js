var request = require('request');
var express = require('express');

var app = express();

app.get('/', (req, res) => {
    request('http://api.nbp.pl/api/exchangerates/tables/a/2019-03-03/2019-05-07/?format=json', (err, response, body) => {
        var data = JSON.parse(body);
        var currency  = [];
        var cMin  = [];
        var cMax  = [];
        for(var i = 0; i < data[0].rates.length; i++){
            currency[i] = data[0].rates[i].currency + "  -  " + data[0].rates[i].code;
        }

        for(var i = 0; i < currency.length; i++){
            var min = 1000;
            var max = 0;
            for(var j = 0; j < data.length; j++){
                if(data[j].rates[i].mid < min){
                    min = data[j].rates[i].mid;
                }
                if(data[j].rates[i].mid > max){
                    max = data[j].rates[i].mid;
                }
            }
            cMin[i] = min;
            cMax[i] = max;
        }
        var delta = [];
        for(var i = 0; i < currency.length; i++){
            delta[i] = cMax[i] - cMin[i];
        }
        delta.sort();
        var table = "<table><tr><th>CURRENCY</th><th>DELTA</th></tr>";
        for(var i = 0; i < currency.length; i++){
            table += `<tr><td>${currency[i]}</td><td>${delta[i]}</td></tr>`;
        }
        table += "</table>";
        res.send(table);
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

