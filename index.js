const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers,
} = require("@whiskeysockets/baileys");

const P = require("pino");
const fs = require("fs");
const qrcode = require("qrcode-terminal");
const config = require("./config");
const { getBuffer, getGroupAdmins } = require("./lib/functions");
const path = require("path");

const ownerNumber = config.OWNER_NUM || [];

async function connectToWA() {
  const { state, saveCreds } = await useMultiFileAuthState(
    __dirname + "/auth_info_baileys/"
  );
  const { version } = await fetchLatestBaileysVersion();

  const robin = makeWASocket({
    logger: P({ level: "silent" }),
    browser: Browsers.macOS("Firefox"),
    auth: state,
    version,
  });

  robin.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("📲 Scan the QR Code Below:");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "close") {
      if (
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
      ) {
        console.log("Reconnecting...");
        connectToWA();
      } else {
        console.log("Connection closed. You are logged out.");
      }
    } else if (connection === "open") {
      console.log("✅ Bot connected to WhatsApp");
    }
  });

  robin.ev.on("creds.update", saveCreds);

  // LOAD ALL COMMANDS FROM plugins FOLDER
  const commands = [];
  const pluginsPath = path.join(__dirname, "plugins");
  const pluginFiles = fs
    .readdirSync(pluginsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of pluginFiles) {
    const command = require(path.join(pluginsPath, file));
    commands.push(command);
  }

  robin.ev.on("messages.upsert", async (meks) => {
    const mek = meks.messages[0];
    if (!mek.message) return;

    mek.message =
      getContentType(mek.message) === "ephemeralMessage"
        ? mek.message.ephemeralMessage.message
        : mek.message;

    if (mek.key && mek.key.remoteJid === "status@broadcast") return;

    const type = getContentType(mek.message);
    const from = mek.key.remoteJid;
    const body =
      type === "conversation"
        ? mek.message.conversation
        : type === "extendedTextMessage"
        ? mek.message.extendedTextMessage.text
        : type === "imageMessage" && mek.message.imageMessage.caption
        ? mek.message.imageMessage.caption
        : type === "videoMessage" && mek.message.videoMessage.caption
        ? mek.message.videoMessage.caption
        : "";

    const prefix = config.PREFIX || "!";
    const isCmd = body.startsWith(prefix);
    const commandName = isCmd
      ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
      : "";

    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(" ");
    const isGroup = from.endsWith("@g.us");
    const sender = mek.key.fromMe
      ? robin.user.id.split(":")[0] + "@s.whatsapp.net"
      : mek.key.participant || mek.key.remoteJid;
    const senderNumber = sender.split("@")[0];
    const botNumber = robin.user.id.split(":")[0];
    const isOwner = ownerNumber.includes(senderNumber);
    const groupMetadata = isGroup
      ? await robin.groupMetadata(from).catch(() => {})
      : null;
    const groupAdmins = isGroup ? getGroupAdmins(groupMetadata?.participants) : [];
    const isBotAdmins = isGroup
      ? groupAdmins.includes(botNumber + "@s.whatsapp.net")
      : false;
    const isAdmins = isGroup ? groupAdmins.includes(sender) : false;

    const reply = (text) => {
      robin.sendMessage(from, { text }, { quoted: mek });
    };

    if (!isCmd) return;

    // FIND COMMAND FROM loaded commands
    const cmd =
      commands.find((c) => c.pattern === commandName) ||
      commands.find((c) => c.alias && c.alias.includes(commandName));

    if (cmd) {
      try {
        await cmd.function(robin, mek, {
          from,
          body,
          isCmd,
          commandName,
          args,
          q,
          isGroup,
          sender,
          senderNumber,
          botNumber,
          isOwner,
          isAdmins,
          isBotAdmins,
          reply,
        });
      } catch (error) {
        console.error("[COMMAND ERROR]", error);
        reply("❌ Command එක ක්‍රියාත්මක කිරීමේ දෝෂයකි.");
      }
    } else {
      reply("❌ Unknown command. Use !menu to see commands.");
    }
  });
}

connectToWA().catch(console.error);
