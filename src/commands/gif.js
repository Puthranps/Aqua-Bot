const gifSearch = require('gif-search');

async function searchGif(search) {
    try{
        await gifSearch.random(search);
        await console.log(gifurl);
        return gifurl; 
    }catch(e){
        console.log(e);
    }
}

return module.exports = {
    searchGif : searchGif
}