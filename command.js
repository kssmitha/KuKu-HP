var commands = [];

function cmd(info, func) {
  var data = info;
  data.function = func;

  console.log("[REGISTERING COMMAND]", data.pattern);

  if (!data.dontAddCommandList) data.dontAddCommandList = true;
  if (!data.desc) data.desc = '';
  if (!data.fromMe) data.fromMe = false;
  if (!data.category) data.category = 'misc';
  if (!data.filename) data.filename = 'Not Provided';

  commands.push(data);
  return data;
}

// Example command - ping
cmd({
  pattern: "ping",
  desc: "Replies with pong",
  fromMe: false,
  category: "general",
}, async (robin, mek, m, extra) => {
  robin.sendMessage(mek.key.remoteJid, { text: "pong" }, { quoted: mek });
});

module.exports = {
  cmd,
  commands,
};
