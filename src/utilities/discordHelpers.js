const jobj = require('../../config.json');

const prefix = jobj.prefix

String.prototype.capitalize = () => {
    return this.charAt(0).toUpperCase();
};

String.prototype.isNumber = () => {
    return !isNaN(parseInt(this));
};

function parseArgs(str){
    return str.slice(prefix.length).trim().split(/ +/g); 
}

function getCommand(str){
    return parseArgs(str).shift();   
}

return module.exports = {
    parseArgs : parseArgs,
    getCommand : getCommand
}
