const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "i9IjyBpa#TQNDyEqC2w7S3-5X92GRnfTlCdU533G_xZpZXju2XWc",
  MONGODB: process.env.MONGODB || "mongodb://mongo:OtEpltjzwQaICmtNmgUNjmpQAKCLKpJV@switchback.proxy.rlwy.net:18194",
  OWNER_NUM: process.env.OWNER_NUM || "94752425527",
};
