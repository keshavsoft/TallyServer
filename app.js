const express = require('express')
const fs = require('fs')
const xml2js = require('xml2js')
const app = express();

app.use(express.text({limit: '50mb'}));

app.use(express.json());

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
    // console.log("req-------------",req.body);
    fs.writeFileSync("TallyNew.xml",req.body);

    var parseString = require('xml2js').parseString;
    parseString(req.body, function (err, result) {
        console.log(result.ENVELOPE.BODY[0].DATA[0].COLLECTION[0].LEDGER[0]["$"].NAME);
    });

    res.end(req.body.toString());
});


let port = 3000;
app.listen(port, () => {
    console.log(`Listening in port : ${port}`);
    console.log(`Click to open : http://localhost:${port}`);
});