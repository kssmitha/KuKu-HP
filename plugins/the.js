module.exports = {
  pattern: "the",
  alias: [],
  desc: "Send tea message 🍵",
  category: "fun",
  use: "",
  function: async (robin, m, { isGroup, reply }) => {
    if (!isGroup) return reply("මෙම command එක group තුල විතරක් භාවිතා කළ හැක.");
    return reply("ආ මේක ඔයාට ☕");
  },
};
