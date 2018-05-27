const Discord = require('discord.js');
const {owner,prefix,token,dev} = require('./config.json');
const client = new  Discord.Client(); 
const util =  require('./src/utilities/discordHelpers.js');
const img = require('./src/commands/img.js');
const gif = require('./src/commands/gif.js');
const help = require('./src/commands/help.js');

client.on('ready', () => {
    client.user.setActivity('Playing with Coconut Meme ( ͡° ͜ʖ ͡°)');
    console.log(`connected to ${owner}'s server`);
});

client.on('message', (message) => {
    let args = util.parseArgs(message.content);

    switch(args[0].toLowerCase()){
        case 'ping':
            return message.channel.send('Pong');
        case 'server-info':
            return message.channel.send("hi?");
        case 'icon':
            return message.channel.send(message.author.avatarURL); 
        case 'img':
           return message.reply('',{files:img.upload(args[1])});
        case 'gif':
            return message.channel.send(gif.searchGif(args[1]));
        case 'help':
            return message.channel.send(help.displayCommands());
        case 'clever':
        case 'cleverbot':
            return;
        default:
            return message.channel.send('Invalid command');       
    }
});

client.login(token);