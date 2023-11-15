const express = require('express')
const fs = require('fs')
const xml2js = require('xml2js')
const app = express();
const http = require('http');
const server = http.createServer(app);
let CommonForWebSocketStart = require("./WsStart");

CommonForWebSocketStart(server);

app.use(express.text({ limit: '50mb' }));

app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/Tally', function (req, res) {
    res.send('Hello World')
});

app.post('/TallyPost', function (req, res) {
    let BodyData = req.body;
    console.log("body", BodyData);
    BodyData.k1 = 916;
    res.json(BodyData);
});

app.post('/TallyPostText', function (req, res) {
    // console.log("req-------------",req.body);
    fs.writeFileSync("TallyNew.xml", req.body);

    ToJson({ inBodyData: req.body });

    res.end(req.body.toString());
});

var port = normalizePort(process.env.PORT || '3000');

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

server.listen(port, () => {
    console.log(`Listening in port : ${port}`);
    console.log(`Click to open : http://localhost:${port}`);
});

let ToJson = ({ inBodyData }) => {
    var parseString = require('xml2js').parseString;
    parseString(inBodyData, function (err, result) {
        let DataNeeded = result.ENVELOPE.BODY[0].DATA[0].COLLECTION[0].LEDGER;
        let ArrayData = DataNeeded.map(element => element["$"].NAME);
        fs.writeFileSync("AccountNames.json", JSON.stringify(ArrayData));

        console.log(ArrayData);
    });
};