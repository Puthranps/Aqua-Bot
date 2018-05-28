async function kickMember(message, reason){
    if(!message.member.roles.some(role => ['Administrator', 'Moderator'].includes(role.name))) {
        return message.reply('Permissions denied, must be an Adminstrator or Moderator');
    }

    let member = message.mentions.member.first(); 

    if(!member) return message.reply('Member does not exist');
    else if(!member.kickable) return message.reply('Unable to kick member, might be due to their role or I was not granted permissions');

    if(!reason) reason = 'No reason provided';
    try{
        await member.kick(reason);
        message.reply(`${member.user.tag} was successfully kicked`);
    } catch(e){
        message.reply(`Unable to kick member due to ${e} error`);
    }
}

return module.exports = {
    kickMember : kickMember
}