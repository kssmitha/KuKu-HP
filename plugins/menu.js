module.exports = {
  pattern: 'menu',
  alias: ['help', 'commands'],
  desc: 'Show bot menu with redeem links and owner info',
  function: async (client, m, { reply }) => {
    const menuText = `
╔══════════════════════════════╗
          *📋 BOT MENU*          
╚══════════════════════════════╝

✨ *Available Commands:*

  ➤ *!alive*  — Check if the bot is online  
  ➤ *!rules*  — View server/group rules  
  ➤ *!menu*   — Show this menu  

📥 *Redeem Links:*

  • *awadane*          
  • *sigma*            
  • *wishala karadarayak* 
  • *aaah*             
  • *ed*               
  • *ew*               
  • *ata*              
  • *patiyo*           
  • *hello*            
  • *kewada*           
  • *thotamata*        
  • *honey*            
  • *heei*            
  • *kanawa*           
  • *uttakkewa*       

───────────────────────────────
👤 *Owner Information:*

  Name: *K Sasmitha*  
  Contact: +94 75 242 5527

═══════════════════════════════
© 2025 POWERD BY දුකාගෙ දෝණී 
`;

    const imageUrl = "https://i.ibb.co/hkgKGVX/Chat-GPT-Image-May-25-2025-10-25-36-PM.png"; // Replace with your picture link

    await client.sendMessage(m.key.remoteJid, {
      image: { url: imageUrl },
      caption: menuText,
    }, { quoted: m });
  }
};
