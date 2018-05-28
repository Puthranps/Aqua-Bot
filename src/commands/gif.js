const GiphyRandom = require('giphy-random');
const {key} = require('../../config/giphy_config.json');
 
const giphyRandom = new GiphyRandom({ apiKey: key });
 
async function getGif(arg) {
    try{
        let result = await giphyRandom.get({tag : arg});
        return result.images.fixed_height_still.url;
    } catch(e) {
        console.log(e);
    }
}

return module.exports = {
    getGif : getGif
}