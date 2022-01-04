require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const _ = require("lodash");

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_BOT_PREFIX = process.env.DISCORD_BOT_PREFIX;

const main = () => {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
    
    client.on("message", msg => {
        if (!_.startsWith(msg.content, DISCORD_BOT_PREFIX)) return;
    
        console.log(msg)
        const requestedMsg = msg.content.split(" ");
        console.log(requestedMsg)
        
        msg.reply(`Calculating from ${requestedMsg[1]} ${requestedMsg[2]} to ${requestedMsg[3]}`)
    });
    
    client.login(DISCORD_BOT_TOKEN);
}

main();