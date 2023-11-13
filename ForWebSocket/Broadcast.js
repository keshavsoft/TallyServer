const WebSocket = require('ws');

let SendToAll = ({ inwss, inmessage, inClients }) => {
    inwss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(inmessage);
        }
    });
}

module.exports = SendToAll;