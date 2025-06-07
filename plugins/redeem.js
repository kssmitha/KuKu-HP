module.exports = {
  pattern: 'redeem',
  desc: 'Send redeem MP3 file based on redeem code',
  function: async (client, mek, { from, args, reply }) => {
    if (!args.length) {
      return reply('❗ Please specify a redeem code.\nExample: !redeem ed');
    }

    const redeemCode = args[0].toLowerCase();

    // Map redeem codes to Google Drive links (or direct URLs)
    const redeemLinks = {
      'awadane': 'https://drive.google.com/file/d/1iL6LkjVKD4a8veYxhyhgJlLMuA33NkSv/view?usp=drive_link',
      'sigma': 'https://drive.google.com/file/d/1TVU4GQUpdYNFUhOhTapOWDbjNBp3YFFP/view?usp=drive_link',
      'wishala': 'https://drive.google.com/file/d/1CcW_5YeDv4JQsU7W2AX6Eg2pUEE9q6_f/view?usp=drive_link',
      'aaah': 'https://drive.google.com/file/d/1Z7X6fsf3k2QZF-ce-WYSAtDtc1RvtWXm/view?usp=drive_link',
      'ed': 'https://drive.google.com/file/d/1mvSBwNIz-Q8uwHfDC2lWrG1MGQuh-fFE/view?usp=drive_link',
      'ew': 'https://drive.google.com/file/d/1wP2WwGbzsuXKKAgZPXFXhxPEPF677pr8/view?usp=drive_link',
      'ata': 'https://drive.google.com/file/d/18EaAQBctCldNdyMPK-ngiaWniRHR_fed/view?usp=drive_link',
      'patiyo': 'https://drive.google.com/file/d/1UkCXWqzc-vtUfFn1K16w1ChbgebmemLD/view?usp=drive_link',
      'hello': 'https://drive.google.com/file/d/1DHjF81zhjyaKwsfwKgKnyjnGy6XijW6K/view?usp=drive_link',
      'kewada': 'https://drive.google.com/file/d/1yL96KQ7mnFIaBtvvtEcf2oU5vnrkzDt3/view?usp=drive_link',
      'thotamata': 'https://drive.google.com/file/d/1n1E4JtD8LN1tqySY29xYDRC2oaMPAxpa/view?usp=drive_link',
      'honey': 'https://drive.google.com/file/d/1_ggLdSxyaBZxXSNtMhaYP0voqVX7OgQd/view?usp=drive_link',
      'heei': 'https://drive.google.com/file/d/1VlTVSBUmye5MfbAd5XcJeLTg7t7hH_zY/view?usp=drive_link',
      'kanawa': 'https://drive.google.com/file/d/1WLoxPxxCIyjpNHjDLQseWKzDzb3Er8Cn/view?usp=drive_link',
      'uttakkewa': 'https://drive.google.com/file/d/1FUPyT_OkDLXG01VsdG-cnRh68MzuoL49/view?usp=drive_link',
    };

    const link = redeemLinks[redeemCode];
    if (!link) {
      return reply(`❌ Redeem code "${redeemCode}" not found.\nPlease check the code and try again.`);
    }

    // Send MP3 file as a link message or if you want to send direct media,
    // you need to download the file or get a direct downloadable URL (Google Drive preview links won't work for direct media)
    // For now, send the link with a caption.

    await client.sendMessage(from, {
      audio: { url: link },
      mimetype: 'audio/mpeg',
      fileName: `${redeemCode}.mp3`,
      caption: `🎵 Here is your redeem: *${redeemCode}*`,
    }, { quoted: mek });
  }
};
