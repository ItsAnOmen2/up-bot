// general initialisation
const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();
var initLogInfo = "[" + new Date(Date()) + "] ";
var localPoliticalList = config.politicalList

// bot start/end events
bot.on("ready", () => {
   console.log(initLogInfo + "Bot started.")
});
bot.on("guildCreate", guild => {
    console.log(initLogInfo + `Bot added in ${guild.name} with ${guild.memberCount} members.`)
});
bot.on("guildRemove", guild => {
    console.log(initLogInfo + `Bot removed in ${guild.name} with ${guild.memberCount} members.`)
});

// commands
bot.on("message", async message => {
    // command exceptions
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;

    // identifies commands and arguments
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // ping
    if(command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
      }

    // get role
    if(command == "getrole"){
    var givenRole1 = false
    const roleToGet = String(args[0], 10);
    var role = message.guild.roles.find(roleToGet);
        if(role == ""){
            message.reply("\n Please re-enter command with political affiliation. \n List of political affiliations: " + localPoliticalList)
            return;
        }

        // TO FIX, YOU CAN'T SWITCH AN OBJECT YOU RETARD
        switch(role){
            case role == "role1":
                message.author.members.addRole("role1")
                var givenRole1 = true
                message.reply(roleToGet `added. DEBUG: givenRole1 = ${givenRole1}`)
                break;

            default:
            message.reply("\n Please re-enter command with valid political affiliation. \n List of political affiliations: " + localPoliticalList)

        }

    }










});

bot.login(config.token);