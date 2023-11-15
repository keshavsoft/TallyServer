const WebSocket = require('ws');

let SendToAll = ({ inwss, inmessage }) => {
    inwss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(inmessage);
        }
    });

}

let SendSingle = ({ inws, inmessage, inReceiver, inClients }) => {
    inClients.forEach(function each(client) {
        if (client.Name === inReceiver) {
            console.log("sent",inmessage);

            inws.send(inmessage);
            console.log("delivered",inmessage);

        }
    });

}

module.exports = SendSingle;