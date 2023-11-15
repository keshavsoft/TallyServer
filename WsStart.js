const WebSocket = require('ws');

let wss;
const clients = new Map();
const clientsInfo = new Map();
let CommonBroadcast = require('./ForWebSocket/Broadcast')
let CommonOnlineClients = require('./ForWebSocket/OnlineClients')
let CommonOnlineClientsFromSendMessage = require('./ForWebSocket/SendMessage/OnlineClients')
let CommoninsertToClients = require('./ForWebSocket/insertToClients')

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
    const Name = "Anonymous"
    const metadata = { id, color, Name };

    inClients.set(ws, metadata);
};

let WsOnConnection = (ws, req) => {
    CommoninsertToClients({
        inClients: clients,
        ws
    });

    const ip = req.socket.remoteAddress;
    ws.send(ip);

    CommonOnlineClientsFromSendMessage({ inmessage: CommonOnlineClients({ inClients: clients }), inws: ws });

    ws.on('message', (messageAsString) => {
        const message = {};
        message.inComingMessage = messageAsString.toString();

        const metadata = clients.get(ws);

        console.log("metadata", metadata, message);

        // console.log("-------------------",JSON.parse(messageAsString.toString()));
        if (message.inComingMessage.MessageType === "AlterClient") {
            metadata.Name = message.inComingMessage.JsonData;
        }
        try {
            let LocalJsonData = JSON.parse(messageAsString.toString());

            if (LocalJsonData.From === "Service" && LocalJsonData.Type === "SysInfo") {
                metadata.SysMAC = LocalJsonData.SysMac
            };
            // ws.send(`rec sysinfo : ${LocalJsonData.SysMac}`);
            ws.send(`rec sysinfo : ${LocalJsonData.SysMac}`);
            console.log("333", metadata);

        } catch (error) {
            let LocalMessageAsString = messageAsString.toString();
            if (LocalMessageAsString === "keshav") {
                CommonBroadcast({ inwss: wss, inmessage: JSON.stringify({ FromId: metadata.id, FromMessage: LocalMessageAsString }), inClients: clients });
            }
        };
    });

    ws.on('close', () => {
        console.log('closed');
    });

    ws.send('Hai Socket established');
};

module.exports = StartFunc;