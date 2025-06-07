module.exports = {
  pattern: 'rules',
  alias: ['pani_nithi', 'pani_rules'],
  desc: 'Send the Pani Discord rules',
  function: async (client, m, { reply }) => {
    const rulesText = `
🛑 *පැනි නීති පොත* 🛑

*අති විශේෂ* - පැනි මණ්ඩලයේ සභාපති තුමාට අවශ්‍ය ඕනෑම වෙලාවක ඔබව Ban(Hide) හෝ timeout කරනු ලබයි...!

01. Discord වැසියන්ට අගෞරව කිරීම තහනම්.
02. රන්ඩු වෙලා chat එක විනාස කරන එව්න් 5min timeout.
03. රන්ඩු කරොත් නම් 20min timeout.
04. Spam = 30min timeout.
05. අනවශ්‍ය YouTubers කියෙව්වොත් BAN.
06. Mod ලට අපහාස කරන්න එපා.
07. Whatsapp group එකෙන් ගියාම නැවත ඇඩ් නෑ.
08. Gay කතා, අගෞරව = timeout.
09. Whatsapp ලින්ක් දැමීම තහනම්.

> HoneyPani666
    `;

    await client.sendMessage(m.key.remoteJid, { text: rulesText }, { quoted: m });
  }
};
