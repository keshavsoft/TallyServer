const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/Tally', function (req, res) {
    res.send('Hello World')
});

app.listen(3000)