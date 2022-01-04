require("dotenv").config();

const _ = require("lodash");
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});
const CHANNEL_WHITELISTS = new Set([
    'pesugihan-bijital', 'currencybot'
])
const PORT = process.env.PORT || 5000

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_BOT_PREFIX = process.env.DISCORD_BOT_PREFIX;

const currency = require("./currency");

const handleCurrencyHelper = () => {
    return "Format: `-currency {amount} {origin currency} {target currency}` \n \n Supported currency:\n`- Indonesian Rupiah Rp (idr)\n- United States Dollar $ (usd)\n- South Korean Won ₩ (krw)\n- Japanese Yen ¥ (jpy)\n- Euro € (eur)\n- Singaporean Dollar S$ (sgd)`"

}

const main = () => {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on("message", async msg => {
        if (!CHANNEL_WHITELISTS.has(msg.channel.name)) return;
        if (!_.startsWith(msg.content, DISCORD_BOT_PREFIX)) return;

        const requestedMsg = msg.content.split(" ");
        const requestPrefix = requestedMsg[0]

        if (requestPrefix == "-currency") {
            let result = "";

            if (requestedMsg[1] == "help") result = handleCurrencyHelper()
            else if (requestedMsg.length != 4) result = `Wrong format. Try again!`;
            else {
                result = await currency.handleCurrencyConverterRequest(requestedMsg[1], requestedMsg[2], requestedMsg[3]);
            }

            console.log(`${requestedMsg} requested by ${msg.author.username}`)

            return msg.reply(result)
        }

    });

    client.login(DISCORD_BOT_TOKEN);
}

main();