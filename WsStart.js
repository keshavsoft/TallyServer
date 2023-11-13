const WebSocket = require('ws');

let wss;
const clients = new Map();
const clientsInfo = new Map();


let StartFunc = (server) => {

    wss = new WebSocket.Server({ server });

    wss.on("connection", WsOnConnection);

};

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};


let insertToClients = ({ inClients, ws }) => {
    const id = uuidv4();
    const color = Math.floor(Math.random() * 360);
    const metadata = { id, color };

    inClients.set(ws, metadata);
};

let WsOnConnection = (ws, req) => {
    insertToClients({
        inClients: clients,
        ws
    });

    const ip = req.socket.remoteAddress;
    ws.send(ip);

    ws.on('message', (messageAsString) => {
        const message = {};

        message.inComingMessage = messageAsString.toString();

        const metadata = clients.get(ws);

        console.log("metadata", metadata, message);

        if (messageAsString.toString() === "keshav") {

            for (let [key, value] of clients) {
                key.send(`broadcast : ${messageAsString.toString()}`);
            };

        };

        try {
            let LocalJsonData = JSON.parse(messageAsString.toString());

            if (LocalJsonData.From === "Service" && LocalJsonData.Type === "SysInfo") {
                metadata.SysMAC = LocalJsonData.SysMac
            };
            // console.log("22222222", JSON.parse(messageAsString.toString()));
            ws.send(`rec sysinfo : ${LocalJsonData.SysMac}`);
            console.log("333", metadata);

        } catch (error) {

        };
    });

    ws.on('close', () => {
        console.log('closed');
    });

    ws.send('Hai Socket established');
};

module.exports = StartFunc;