function displayCommands() {
    return {
        'ping': 'Returns pong!',
        'server-info': 'Displays information of the current server',
        'icon':'Returns icon of the user that called the command.'
    }
}

return module.exports = {
    displayCommands : displayCommands
}