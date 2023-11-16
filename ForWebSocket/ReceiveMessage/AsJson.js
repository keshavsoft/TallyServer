let CommonBroadcast = require('../Broadcast');
let CommonBroadcastOnly = require('../BroadcastOnly');
let CommonPrivateMessage  = require('../PrivateMessage');
let CommonOnlineClients = require('../OnlineClients')

let StartFunc = ({ inMessageAsJson, inws, inMetadata, inClients, inwss }) => {

    let LocalJsonData = inMessageAsJson;

    if (LocalJsonData.From === "Service" && LocalJsonData.Type === "SysInfo") {
        inMetadata.SysMAC = LocalJsonData.SysMac
    };
    if (LocalJsonData.Type === "AlterClient") {

        LocalFuncForAlterClient({ LocalJsonData, inMetadata, inws, inClients, inwss });
    }
    if (LocalJsonData.Type === "BroadcastOnly") {

        LocalFuncForBroadcastOnly({ inws, inwss, inMetadata, LocalJsonData  });
    }
    if (LocalJsonData.Type === "BroadcastAll") {

        LocalFuncForBroadcastAll({ inwss, inMetadata, LocalJsonData  });
    }
    if (LocalJsonData.Type === "PrivateMessage") {

        LocalFuncForPrivateMessage({ inws, inMetadata, LocalJsonData, inClients  });
    }
   
};

let LocalFuncForAlterClient = ({ LocalJsonData, inMetadata, inws, inClients, inwss }) => {

    LocalFuncForSendUserName({ LocalJsonData, inMetadata, inws });

    LocalFuncForSendClients({ inClients, inwss });

}

let LocalFuncForSendUserName = ({ LocalJsonData, inMetadata, inws }) => {
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

let LocalFuncForBroadcastOnly = ({ inws, inwss, inMetadata, LocalJsonData  }) => {
    let LocalMessageAsString = LocalJsonData.Message;
    let LocalObjectToSend = {};
    LocalObjectToSend.MessageType = "BroadcastOnly";
    LocalObjectToSend.JsonData = {};
    LocalObjectToSend.JsonData.FromName = inMetadata.Name;
    LocalObjectToSend.JsonData.FromId = inMetadata.id;
    LocalObjectToSend.JsonData.FromMessage = LocalMessageAsString;
    console.log("LocalObjectToSend",LocalObjectToSend);

    CommonBroadcastOnly({ inws, inwss: inwss, inmessage: JSON.stringify(LocalObjectToSend) });
}

let LocalFuncForBroadcastAll = ({ inwss, inMetadata, LocalJsonData  }) => {
    let LocalMessageAsString = LocalJsonData.Message;
    let LocalObjectToSend = {};
    LocalObjectToSend.MessageType = "BroadcastAll";
    LocalObjectToSend.JsonData = {};
    LocalObjectToSend.JsonData.FromName = inMetadata.Name;
    LocalObjectToSend.JsonData.FromId = inMetadata.id;
    LocalObjectToSend.JsonData.FromMessage = LocalMessageAsString;

    CommonBroadcast({ inwss: inwss, inmessage: JSON.stringify(LocalObjectToSend) });
}

let LocalFuncForPrivateMessage = ({ inws, inMetadata, LocalJsonData, inClients  }) => {
    let LocalMessageAsString = LocalJsonData.Message;
    let LocalReceiverName = LocalJsonData.Receiver;
    let LocalObjectToSend = {};
    LocalObjectToSend.MessageType = "PrivateMessage";
    LocalObjectToSend.JsonData = {};
    LocalObjectToSend.JsonData.FromName = inMetadata.Name;
    LocalObjectToSend.JsonData.FromId = inMetadata.id;
    LocalObjectToSend.JsonData.FromMessage = LocalMessageAsString;
    LocalObjectToSend.JsonData.Receiver = LocalReceiverName;

    CommonPrivateMessage({ inws, inmessage: JSON.stringify(LocalObjectToSend), inReceiver: LocalReceiverName, inClients });
}


module.exports = StartFunc;
