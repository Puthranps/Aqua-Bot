const jobj = require('./config.json');

const prefix = jobj.prefix;
const token = jobj.token;
const owner = jobj.owner;
const dev = jobj.dev;

const Discord = require('discord.js');

const client = new  Discord.Client(); 
const util =  require('./src/utilities/discordHelpers.js');
const img = require('./src/commands/img.js');
const help = require('./src/commands/help.js');
const info = require('./src/commands/server-info.js');

client.on('ready', () => {
    client.user.setActivity('Playing with Coconut Meme ( ͡° ͜ʖ ͡°)');
    console.log(`connected to ${owner}'s server`);
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
                return message.channel.send('Please insert a term to search...');
            }
            path = './images'
            await img.getObj(args[0])
            .then( obj => {
                 img.download(obj)
                    .then(function (result) {
                        console.log("Downloaded success!!!")
                        console.log(obj.name);
                        return message.channel.send({files: [`${path}/code.jpg`]} );
    
                    }).catch(function(err) {
                        console.log("inside error");
                        console.log(err)
                });
            }).catch( (err) => {
                console.log("outside error");
                console.log(err);
            });

        case 'help':
            return message.channel.send(help.displayCommands());
        default:
            return message.channel.send('Invalid command');       
    }
});

client.login(token);
