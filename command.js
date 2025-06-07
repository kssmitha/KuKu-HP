var commands = [];

function cmd(info, func) {
    var data = info;
    data.function = func;
    if (!data.dontAddCommandList) data.dontAddCommandList = true;
    if (!info.desc) info.desc = true;
    if (!data.fromMe) data.fromMe = false;
    if (!info.category) data.category = true;
    if(!info.filename) data.filename = true;
    commands.push(data);
    return data;
}
module.exports = {
    cmd,
    AddCommand:cmd,
    Function:cmd,
    Module:cmd,
    commands,
};
