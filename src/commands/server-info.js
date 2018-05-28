return module.exports = {
    serverInfo : message => {
        return {
            "**Server Name:**" : message.guild.name,
            "**Total Count:**" : message.guild.memberCount,
            "**Region:**" : message.guid.region,
            "**Created:" : message.guild.createdAt 
        };
    }
}