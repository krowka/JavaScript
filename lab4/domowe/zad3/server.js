var http = require("http");
var url = require("url");
const fs = require('fs');
// var checkPath = require("./script");


http.createServer(function (request, response) {
        /*
          ,,request'' - input stream - contains data received from the browser, e.g. encoded contents of HTML form fields

          ,,response'' - output stream - put in it data that you want to send back to the browser.
             The answer sent by this stream must consist of two parts: the header and the body.
             The header contains, among others, information about the type (MIME) of data contained in the body.
             The body contains the correct data, e.g. a form definition.

        */
        console.log("--------------------------------------");
        console.log("The relative URL of the current request: " + request.url + "\n");
        var url_parts = url.parse(request.url, true); //parsing (relative) URL

        if (url_parts.pathname == '/submit') { //Processing the form content, if the relative URL is '/ submit'
            var path = url_parts.query['path']; //Read the contents of the field (form) named 'name'
            response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});  //Creating an answer header - we inform the browser that the body of the answer will be plain text
            fs.lstat(path, (error, stat) => {
                    if (error) {
                        response.write(error.toString());
                        response.end();
                    } else if (stat.isDirectory()) {
                        response.write(`${path} is a directory.\n`);
                        response.end();
                    } else if (stat.isFile()) {
                        response.write(`${path} is a file.\n`);
                        fs.readFile(path, (err, data) => {
                            if (err) {
                                response.write(err.toString());
                                response.end();
                            } else {
                                response.write(`----------------------------------------\n--------------FILE CONTENT--------------\n----------------------------------------\n${data.toString()}`);
                                response.end();
                            }
                        });
                    } else {
                        response.write(`${path} is neither a directory nor a file.\n`);
                        response.end();
                    }
                }
            );
            console.log("Sending a response");
        } else { //Generating the form
            console.log("Creating a response header");
            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});  //Creating a repsonse header - we inform the browser that the body of the response will be HTML text
            //and now we put an HTML form in the body of the answer
            console.log("Creating a response body")
            response.write('<form method="GET" action="/submit">');
            response.write('<label for="path">Enter path</label>');
            response.write('<input name="path">');
            response.write('<br>');
            response.write('<input type="submit">');
            response.write('<input type="reset">');
            response.write('</form>');
            response.end();  //The end of the response - send it to the browser
            console.log("Sending a response")
        }
}).listen(5050);
console.log("The server was started on port 5050");
console.log("To end the server, press 'CTRL + C'");