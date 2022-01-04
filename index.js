require("dotenv").config();

const _ = require("lodash");
const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const CHANNEL_WHITELISTS = new Set([
    'pesugihan-bijital', 'currencybot'
])
const PORT = process.env.PORT || 5000

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_BOT_PREFIX = process.env.DISCORD_BOT_PREFIX;

const currency = require("./currency");

const main = () => {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
    
    client.on("message", async msg => {
        if (!CHANNEL_WHITELISTS.has(msg.channel.name)) return;
        if (!_.startsWith(msg.content, DISCORD_BOT_PREFIX)) return;
    
        const requestedMsg = msg.content.split(" ");

        if (requestedMsg[0] == "-currency") {
            
            if (requestedMsg.length != 4) {
                return msg.reply(`Wrong format. Try again!`)
            };
            const result = await currency.handleCurrencyConverterRequest(requestedMsg[1], requestedMsg[2], requestedMsg[3]);
            console.log(`${requestedMsg} requested by ${msg.author.username}`)
            
            return msg.reply(result)
        }

        return msg.reply(`Wrong format. Try again!`)

    });
    
    client.login(DISCORD_BOT_TOKEN);
}

main();