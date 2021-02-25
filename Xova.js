const { SSL_OP_TLS_ROLLBACK_BUG } = require("constants");
const Eris = require("eris");

// Replace BOT_TOKEN with personal bot's token
const BOT_TOKEN = "";

const bot = new Eris.CommandClient(BOT_TOKEN, {}, {
    description: "Utility Bot",
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
        var color = args[args.length - 1];

        if (color.length == 7) { // Removes # from hex color for easier reading
            color = color.substring(1);
        }
        const colorReg = new RegExp('[a-f0-9]{6}');

        if (!colorReg.test(color)) { // Checks if value is a true hex color
            bot.createMessage(msg.channel.id, { // If not hex value, returns error message
                embed: {
                    title: "Improper Usage",
                    description: "Must be a hex color\n*Example:* ~rank Xero #ffff00",
                    color: 16776960
                }
            });
        }
        else {
            var nameArr = [];
            for (i = 0; i < args.length - 1; i++) { // Gets rid of hex color for name
                nameArr[i] = args[i];               
            }
            const name = nameArr.join(" ");

            // Checks for role name (role names conflicts with role IDs)
            if (msg.channel.guild.roles.find(role => role.name == name) != null) {
                bot.createMessage(msg.channel.id, { // If not hex value, returns error message
                    embed: {
                        title: "Role Name In Use",
                        description: "Please choose a different name or contact a staff member.",
                        color: 16776960
                    }
                });
            }
            else {
                //Creates role
                const promiseRole = msg.channel.guild.createRole({
                    name: name,
                    color: parseInt(color, 16),
                    permissions: 65536
                })
                    .then(function(response) {
                        return response;
                    });
                
                // Adds role to user
                const addRole = async () => {
                    const wait = await promiseRole;
                    msg.member.addRole(wait.id);
                }; 
                addRole();

                // Success message
                bot.createMessage(msg.channel.id, { 
                    embed: {
                        title: "Rank Successfully Created!",
                        description: "The rank has been created and added!",
                        color: 16776960
                    }
                });
            }
        }
    }

}, {
    description: "Creates custom ranks",
    fullDescription: "Creates a custom rank for user based on input.\n*Usage:* `~rank <name> <hex color>`\n*Example:* ~rank Xero ffff00"
})

bot.connect();