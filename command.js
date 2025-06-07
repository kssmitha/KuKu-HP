function cmd(info, func) {
    var data = info;
    data.function = func;

    // 🔍 මෙන්න මෙතන දැමිය යුතුයි
    console.log("[REGISTERING COMMAND]", data.pattern);

    if (!data.dontAddCommandList) data.dontAddCommandList = true;
    if (!data.desc) data.desc = '';
    if (!data.fromMe) data.fromMe = false;
    if (!data.category) data.category = 'misc';
    if (!data.filename) data.filename = 'Not Provided';

    commands.push(data);
    return data;
}
