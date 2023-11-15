let CommonBroadcast = require('../Broadcast');
let CommonOnlineClients = require('../OnlineClients')

let StartFunc = ({ inMessageAsJson, inws, inMetadata, inClients, inwss }) => {

    let LocalJsonData = inMessageAsJson;

    if (LocalJsonData.From === "Service" && LocalJsonData.Type === "SysInfo") {
        inMetadata.SysMAC = LocalJsonData.SysMac
    };
    if (LocalJsonData.Type === "AlterClient") {

        LocalFuncForAlterClient({ LocalJsonData, inMetadata, inws, inClients, inwss });
    }
};

let LocalFuncForAlterClient = ({ LocalJsonData, inMetadata, inws, inClients, inwss }) => {

    LocalFuncForSendUserName({ LocalJsonData, inMetadata, inws });

    LocalFuncForSendClients({ inClients, inwss });

}

let LocalFuncForSendUserName = ({ LocalJsonData, inMetadata, inws}) => {
    inMetadata.Name = LocalJsonData.UserName;
    let LocalObjectToSend = {};
    LocalObjectToSend.MessageType = "WSServer";
    LocalObjectToSend.JsonData = {};
    LocalObjectToSend.JsonData.Type = "UserName";
    LocalObjectToSend.JsonData.UserName = LocalJsonData.UserName;

    inws.send(JSON.stringify(LocalObjectToSend));
}

let LocalFuncForSendClients = ({ inClients, inwss }) => {
    
    let LocalObjectToSend = {};
    LocalObjectToSend.MessageType = "OnlineClients";
    LocalObjectToSend.JsonData = CommonOnlineClients({ inClients });

    CommonBroadcast({ inwss: inwss, inmessage: JSON.stringify(LocalObjectToSend) });

}


module.exports = StartFunc;
