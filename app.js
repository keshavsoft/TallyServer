const express = require('express')
const app = express();

app.use(express.json());
app.use(express.text());

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/Tally', function (req, res) {
    res.send('Hello World')
});

app.post('/TallyPost', function (req, res) {
    let BodyData = req.body;
    console.log("body",BodyData);
    BodyData.k1 = 916;
    res.json(BodyData);
});

app.post('/TallyPostText', function (req, res) {
    console.log("req",req.body);
    
});

let port = 3000;
app.listen(port, () => {
    console.log(`Listening in port : ${port}`);
    console.log(`Click to open : http://localhost:${port}`);
});