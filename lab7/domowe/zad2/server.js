const express = require('express');
var cors = require('cors')

var app = express()
app.use(cors())
const port = 9000;

app.get('/:i', (req, res) => {
    var int = parseInt(req.params.i);
    res.status(200).send("" + (int+1))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));