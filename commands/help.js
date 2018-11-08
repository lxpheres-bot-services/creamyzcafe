const Discord = require("discord.js");
const fs = require("fs");
var embedutility = ``;
var embedmoderation = ``;
var embeddev = ``;

module.exports.run = async (bot, message, args) => {	
 fs.readdir("./commands", (err, files) => {
	if (err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if (jsfile.length <= 0) {
		return
	}

	jsfile.forEach((f, i) => {
		let props = require(`../commands/${f}`);
		if (props.help.category === "Utility") {
			embedutility = embedutility + ` \n ;${props.help.name} - ${props.help.description}`
		} else if (props.help.category === "Moderation") {
			embedmoderation = embedmoderation + ` \n ;${props.help.name} - ${props.help.description}`
		}
	});
 })

const command = args.shift();

if (command && `../commands/` + command + `.js`) {
	fs.readdir("./commands", (err, files) => {
		let props = require(`../commands/${command}`);
		message.channel.send({embed: {
    			color: 10181046,
    			author: {
      			name: bot.user.username,
      			icon_url: bot.user.avatarURL
    			},
    		title: "Commands",
    		description: "Commands for Creamy'z Cafe Bot",
    	fields: [{
        	name: "Name",
        	value: props.help.name,
		inline: true
      	},
	{
        	name: "Usage",
        	value: "`;" + props.help.usage + "`",
		inline: true
      	},
	{
        	name: "Required Permission",
        	value: props.help.mentionedperm,
		inline: true
      	},
	{
		name: "Category",
		value: props.help.category,
		inline: true
	},
	{
        	name: "Description",
        	value: props.help.longdes,
		inline: true
      	},
    	],
    	timestamp: new Date(),
    footer: {
      icon_url: bot.user.avatarURL,
      text: "By Lxphere"
    }
  }
});})
} else {message.channel.send("I sent a direct message to you of the help menu! If you did not get it, please try enabling `Direct Messages from Server Members` and try again!");
message.author.send({embed: {
    color: 15844367,
    author: {
      name: bot.user.username,
      icon_url: bot.user.avatarURL
    },
    title: "Commands",
    description: "Commands for Creamy'z Cafe Bot",
    fields: [{
        name: "Moderation",
        value: "`;ban` - Bans the user given.  \n`;kick` - Kicks the user given. \n`;warn` - Warns the user given. \n`;purge` Purges the amount of messages given."
      },
      {
        name: "Utility",
        value: "`;ping` - Replies with the bots ping. \n`;help` - Replies with this menu. \n`;up` - Replies with how long the bot has been up and running."
      },
      {
        name: "Developer Commands",
        value: "Developer commands are not shown to the public right now."
      },
      {
        name: "Command Descriptions",
        value: "Type `;help <command>` here in this DM to get information on a command."
      },
    ],
    timestamp: new Date(),
    footer: {
      icon_url: bot.user.avatarURL,
      text: "By Lxphere"
    }
  }
});
	
}

module.exports.help = {
	name: "help",
	usage: "help [command]",
	description: "sends all server commands",
	longdes: "Sends a list of all the command to the user who ran the command. This will show details about a command if said.",
	mentionedperm: "none",
  category: "Utility"
}
