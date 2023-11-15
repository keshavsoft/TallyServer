let CommonBroadcast = require('./Broadcast');
let CommonAsJson = require('./ReceiveMessage/AsJson');
let CommonAsString = require('./ReceiveMessage/AsString');

let StartFunc = ({ inMessageAsString, inClients, inws }) => {

    const metadata = inClients.get(inws);

    try {
        let LocalJsonData = JSON.parse(inMessageAsString.toString());

        CommonAsJson({ inMessageAsJson: LocalJsonData, inws: inws, inMetadata: metadata });

    } catch (error) {
        CommonAsString({ inMessageAsString: inMessageAsString });

    };
};

module.exports = StartFunc;