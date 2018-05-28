async function permissions(message){
    return message.member.roles.some(roles => ['Administrator', 'Moderator'].includes(roles.name));
}

async function purgeChannel(message,count) {
    try {
        if(!await permissions(message)) return message.reply('Invalid permissions :p');
        if(!count||count < 2 || count > 100) return Message.channel.send('Count is too large');
        const fetched = await message.channel.fetchMessages({count : deletCount});
        message.channel.bulkDelete(fetched);
    } catch(e) {
        message.reply(`${e} caused an error`);
    }
}

return module.exports = {
    purgeChannel : purgeChannel
}
