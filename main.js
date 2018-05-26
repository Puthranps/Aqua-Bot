const Discord = require('discord.js');
const {owner,prefix,token,dev} = require('./config.json');
const client = new  Discord.Client(); 
const util =  require('./src/utilities/discordHelpers.js');

console.log(prefix);

client.on('ready', () => {
    client.user.setGame('Playing with Coconut Meme ( ͡° ͜ʖ ͡°)');
    console.log(`connected to`);
});

client.on('message', (message) => {
    let args = util.parseArgs(message.content);
    let command = util.getCommand(message.content);
    switch(command){
        case 'ping':
            message.channel.send('Pong');
            break; 
        case 'server-info':
            message.channel.send("hi?");
            break; 
        case 'icon':
            message.channel.send(message.author.avatarURL);
            break; 
        case 'yuri':
            message.reply('',{
                files: [
                    './images/Yuri.png'
                ]
            });
            break;
        case `why is ${args[3]}'s waifu garbo?`:
            message.reply('Your waifu is trash');
            break;
    }
});

client.login(token);