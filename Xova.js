const { SSL_OP_TLS_ROLLBACK_BUG } = require("constants");
const Eris = require("eris");

// Replace BOT_TOKEN with personal bot's token
const BOT_TOKEN = ""; // Delete this before pushing

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
                description: "*Usage:* `~rank <name> <hex color>`\n*Example:* ~rank Xero #ffff00",
                color: 16776960
            }
        });
    }
    else {
        const color = args[args.length - 1];
        const colorReg = new RegExp(color);

        if (color.length == 7) { // Removes # from hex color for easier reading
            color = color.substring(1);
        }

        if (colorReg.test(/[a-f0-9]{6}/)) { // Checks if value is a true hex color
            bot.createMessage(msg.channel.id, { // If not hex value, returns error message
                embed: {
                    title: "Improper Usage",
                    description: "Must be a hex color\n*Example:* ~rank Xero #ffff00",
                    color: 16776960
                }
            });
        }
        else {
            const nameArr = [];
            for (i = 0; i < args.length - 1; i++) { // Gets rid of hex color for name
                nameArr[i] = args[i];               // Optimize this code
            }
            const name = nameArr.join(" ");

            // Checks for role name (Conflicts with roleID)
            if (msg.channel.guild.roles.find(role => role.name == name) != null) {
                bot.createMessage(msg.channel.id, { // If not hex value, returns error message
                    embed: {
                        title: "Role Name In Use",
                        description: "Please choose a different name or contact a staff member.",
                        color: 16776960
                    }
                });
            }

            //Creates role
            bot.createRole(msg.channel.guild.id, {
                name: name,
                color: parseInt(color, 16),
                permissions: 65536
            })
            // Adds role to user
            /*
            bot.addGuildMemberRole(msg.channel.guild.id, msg.author.id, 
                msg.channel.guild.roles.get(roles => msg.channel.guild.roles.find(role => role.name == name)));
            */
            console.log("Role sucessfully created!");
        }
    }

}, {
    description: "Creates custom ranks",
    fullDescription: "Creates a custom rank for user based on input.\n*Usage:* `~rank <name> <hex color>`\n*Example:* ~rank Xero ffff00"
})

bot.connect();