let CommonBroadcast = require('../Broadcast');

let StartFunc = ({ inMessageAsString } ) => {
    let LocalMessageAsString = inMessageAsString.toString();
        if (LocalMessageAsString === "keshav") {
            CommonBroadcast({ inwss: wss, inmessage: JSON.stringify({ FromId: metadata.id, FromMessage: LocalMessageAsString }) });
        }

};

module.exports = StartFunc;
