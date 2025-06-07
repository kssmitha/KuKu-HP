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

// !rules command එක මෙහෙ register කරන්න
cmd(
  {
    pattern: 'rules',
    desc: 'Shows the group rules',
    fromMe: false,
    category: 'info',
    filename: 'rules.js',
  },
  async (sock, mek, m, { from, reply }) => {
    const rulesText = `
🛑 *පැනි නීති පොත* 🛑

*අති විශේෂ* - පැනි මණ්ඩලයේ සභාපති තුමාට අවශ්‍ය ඕනෑම වෙලාවක ඔබව Ban(Hide) හෝ timeout කරනු ලබයි...!

01. Discord වැසියන්ට අගෞරව කිරීම තහනම්.
02. රන්ඩු වෙලා chat එක බොක කරන එව්න් 5min timeout.
03. ආයි එනකොටත් රන්ඩු නම් 20min timeout.
04. Spam = 30min timeout.
05. අනවශ්‍ය YouTubers කිව්වොත් BAN.
06. Mod ලට අපහාස කරන්න එපා.
07. Whatsapp group එකෙන් ගියාම නැවත ඇඩ් නෑ.
08. Gay කතා, අගෞරව = timeout.
09. Whatsapp ලින්ක් දැමීම තහනම්.

> HoneyPani666
    `.trim();

    await sock.sendMessage(from, { text: rulesText }, { quoted: mek });
  }
);

module.exports = {
  cmd,
  commands,
};
