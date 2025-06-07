module.exports = {
  pattern: 'alive',
  alias: ['doni', 'info'],
  desc: 'Check if the bot is alive',
  function: async (client, m, { reply }) => {
    const imageUrl = "https://i.ibb.co/m5tJr8Dz/images.jpg"; // <-- ඔබේ photo එකේ URL එක මෙහි දාන්න
    const caption = "✅ හා හා ...!මං තාම පනපිටින් 😒\n\nඋබර්ලත් ඔය නොකිව්වට ඉන්නෙ මං යනකම්නෙ😒\n\n💬 Powered by KuKuගෙ දෝණි";

    await client.sendMessage(m.key.remoteJid, {
      image: { url: imageUrl },
      caption,
    }, { quoted: m });
  }
};
