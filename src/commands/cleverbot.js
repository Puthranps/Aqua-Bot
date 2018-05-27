const Cleverbot = require("cleverbot-node");
const clbot = new Cleverbot;
clbot.configure({botapi: "IAMKEY"});


function cleverChat(message){
    clbot.write(message.content, (response) => {
        message.channel.startTyping();
        setTimeout(() => {
          message.channel.send(response.output).catch(console.error);
          message.channel.stopTyping();
        }, Math.random() * (1 - 3) + 1 * 1000);
      });
}