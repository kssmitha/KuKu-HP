const { readEnv } = require("../lib/database");
const { cmd, commands } = require("../command");

cmd(
  {
    pattern: "menu",
    alise: ["info"],
    desc: "get cmd list",
    category: "main",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      const config = await readEnv();
      let menu = {
        main: "",
        download: "",
        group: "",
        owner: "",
        convert: "",
        search: "",
      };

      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern && !commands[i].dontAddCommandList) {
          menu[
            commands[i].category
          ] += `${config.PREFIX}${commands[i].pattern}\n`;
        }
      }

      let madeMenu = `👋 *Hello  ${pushname}*


╭━━━〔 🌟 *BOT MENU* 🌟 〕━━━╮
┃
┃ 👑 *Owner Info*
┃   • Name: K Sasmitha
┃   • WhatsApp: wa.me/+94752425527
┃
┃ 🎁 *Redeems*
┃   • 
┃   • 
┃
┃ 📜 *Other Commands*
┃   • !help - Show this menu
┃   • !info - Bot info
┃   • !ping - Check bot status
┃
┃ > MADE BY Ks
╰━━━━━━━━━━━━━━━━━━━━╯
`;
      await robin.sendMessage(
        from,
        {
          image: {
            url: "https://i.ibb.co/hkgKGVX/Chat-GPT-Image-May-25-2025-10-25-36-PM.png",
          },
          caption: madeMenu,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);
