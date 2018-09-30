const jobj = require('./config.json');

const Discord = require('discord.js');

const client = new  Discord.Client(); 
const util =  require('./src/utilities/discordHelpers.js');
const img = require('./src/commands/img.js');
const help = require('./src/commands/help.js');
const info = require('./src/commands/server-info.js');
const weather = require('./src/commands/weather.js');

client.on('ready', () => {
    client.user.setActivity('Playing with Coconut Meme ( ͡° ͜ʖ ͡°)');
    console.log(`connected to ${jobj.owner}'s server`);
});

// client.on("guildMemberAdd", member => {
//     const guild = member.guild;
//     newUsers.set(member.id, member.user);
//   ​
//     if (newUsers.size > 10) {
//       const defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
//       const userlist = newUsers.map(u => u.toString()).join(" ");
//       defaultChannel.send("Welcome our new users!\n" + userlist);
//       newUsers.clear();
//     }
// });

client.on('message', async message => {
    if(message.author.bot) return; 
    if(message.content.indexOf(prefix) !== 0) return;

    let args = util.parseArgs(message.content);
    let command = args.shift();
    console.log(args);

    switch(command){
        case 'ping':
            return message.channel.send('Pong');
        case 'server-info':
            return message.channel.send(info.serverInfo(message));
        case 'icon':
            return message.channel.send(message.author.avatarURL); 
        case 'img':
            if(args[0] === null) {
                return message.channel.send('Please insert a term to search....');
            }
            let path = '../images';
            return message.reply('',{files:img.upload(args[0], path)});
        case 'gif':
            if(args[0] === null) {
                return message.channel.send('Please insert a term to search....');
            }
            return message.channel.send(gif.getGif(args[0]));
        case 'help':
            return message.channel.send(help.displayCommands());
        case 'weather': 
            return message.channel.send(...args);
        default:
            return message.channel.send('Invalid command');       
    }
});

// NDk2MDI4Njk4MTYwNTI5NDE4.DpKq3Q.Bqd4VkP6a5Q_J5Hu_7pqOO5-mEE

client.login("NDk2MDI4Njk4MTYwNTI5NDE4.DpKq3Q.Bqd4VkP6a5Q_J5Hu_7pqOO5-mEE");
