const WebSocket = require('ws');

let wss;

let StartFunc = (server) => {

    wss = new WebSocket.Server({ server });

    wss.on("connection", WsOnConnection);

};

let WsOnConnection = (ws, req) => {

    const ip = req.socket.remoteAddress;
    ws.send(ip);

    ws.on('message', (messageAsString) => {
        const message = {};

        message.inComingMessage = messageAsString.toString();

       console.log("message",messageAsString.toString());

       
    });

    ws.on('close', () => {
        console.log('closed');
    });

    ws.send('Hai Socket established');
};

module.exports = StartFunc;