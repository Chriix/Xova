const Eris = require("eris");

// Replace BOT_TOKEN with personal bot's token
const BOT_TOKEN = "";

const bot = new Eris.CommandClient(BOT_TOKEN, {}, {
    description: "Custom Rank/Nickname Bot",
    owner: "**Chrix**",
    prefix: "~"
})

bot.on("ready", () => { // Turns but on 
    console.log("Online!") // Logs bot activity
})

// Ping command
bot.registerCommand("ping", "Pong!", {
    description: "Replies with Pong",
    fullDescription: "Checks bot's activity"
})

// Rank command
bot.registerCommand("rank", (msg, args) => {
    if (args.length < 2) { // Checks for name and color arguments
        bot.createMessage(msg.channel.id, { // If name and color are not included, returns error message
            embed: {
                title: "Command Usage",
                description: "*Usage:* `~rank <name> <hex color>`\n*Example:* ~rank R4NK #ffff00",
                color: 16776960
            }
        });
    }
    else {
        const colorReg = new RegExp(args[args.length - 1]);

        if (!colorReg.test(/^#/)) { // Removes # from hex color for easier reading
            args[args.length - 1] = args[args.length - 1].substring(1);
        }

        if (colorReg.test(/[a-f0-9]{6}/)) { // Checks if value is a true hex color
            bot.createMessage(msg.channel.id, { // If not hex value, returns error message
                embed: {
                    title: "Improper Usage",
                    description: "Must be a hex color\n*Example:* ~rank R4NK #ffff00",
                    color: 16776960
                }
            });
        }
        else {
            const color = args[args.length - 1];
            const nameArr = [];
            for (i = 0; i < args.length - 1; i++) { // Gets rid of hex color for name
                nameArr[i] = args[i];               // Optimize this code
            }
            console.log(color); // For debugging only

            const name = nameArr.join(" ");
            console.log(name);
        }
    }

    },{
    description: "Creates custom ranks",
    fullDescription: "Creates a custom rank for user based on input.\n*Usage:* `~rank <name> <hex color>`\n*Example:* ~rank R4NK ffff00"
})

bot.connect();