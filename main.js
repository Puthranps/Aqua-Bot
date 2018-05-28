const Discord = require('discord.js');
const {owner,prefix,token,dev} = require('./config.json');
const client = new  Discord.Client(); 
const util =  require('./src/utilities/discordHelpers.js');
const img = require('./src/commands/img.js');
const gif = require('./src/commands/gif.js');
const help = require('./src/commands/help.js');
const info = require('./src/commands/server-info.js');

client.on('ready', () => {
    client.user.setActivity('Playing with Coconut Meme ( ͡° ͜ʖ ͡°)');
    console.log(`connected to ${owner}'s server`);
});

client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    newUsers.set(member.id, member.user);
    
    if (newUsers.size > 10) {
      const defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
      const userlist = newUsers.map(u => u.toString()).join(" ");
      defaultChannel.send("Welcome our new users!\n" + userlist);
      newUsers.clear();
    }
});

client.on('message', (message) => {
    if(message.author.bot) return; 
    if(message.content.indexOf(prefix) !== 0) return;
     
    let args = util.parseArgs(message.content);

    switch(args[0].toLowerCase()){
        case 'ping':
            return message.channel.send('Pong');
        case 'server-info':
            return message.channel.send(info.serverInfo(message.content));
        case 'icon':
            return message.channel.send(message.author.avatarURL); 
        case 'img':
            if(args[1] === null) {
                return message.channel.send('Please insert a term to search....');
            }
            let path = '../images';
            return message.channel.send('',{files:img.upload(args[1],path)});
        case 'gif':
            if(args[1] === null) {
                return message.channel.send('Please insert a term to search....');
            }
            return message.channel.send(gif.searchGif(args[1]));
        case 'help':
            return message.channel.send(help.displayCommands());
        default:
            return message.channel.send('Invalid command');       
    }
});

client.login(token);
