require('discord.js');

function serverInfo(message){
    return  `**Server Name:** : ${message.guild.name},\n\n**Total Count:** : ${message.guild.memberCount},\n\n**Created** : ${message.guild.createdAt}`;
}

return module.exports = {
    serverInfo :serverInfo
}