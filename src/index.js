const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const eventFiles = fs.readdirSync("./src/events").filter((file) => file.endsWith(".js"));
const functions = fs.readdirSync("./src/functions").filter((file) => file.endsWith(".js"));
const prefixFolders = fs.readdirSync("./src/prefix").filter((file) => file.endsWith(".js"));
const commandsFolders = fs.readdirSync("./src/commands");

(async () => {
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }

  client.handleEvents(eventFiles, "./src/events");

  client.login(process.env.TOKEN);
})();

console.log("Async!");
