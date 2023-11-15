let StartFunc = ({ inMessageAsJson, inws, inMetadata }) => {

    let LocalJsonData = inMessageAsJson;

    if (LocalJsonData.From === "Service" && LocalJsonData.Type === "SysInfo") {
        inMetadata.SysMAC = LocalJsonData.SysMac
    };
    // inws.send(`rec sysinfo : ${LocalJsonData.SysMac}`);
    if (LocalJsonData.Type === "AlterClient") {
        inMetadata.Name = LocalJsonData.UserName;
        let LocalObjectToSend = {};
        LocalObjectToSend.MessageType = "WSServer";
        LocalObjectToSend.JsonData = {};
        LocalObjectToSend.JsonData.Type = "UserName";
        LocalObjectToSend.JsonData.UserName = LocalJsonData.UserName;

        inws.send(JSON.stringify(LocalObjectToSend))
    }
    console.log("333", inMetadata);
};

module.exports = StartFunc;
