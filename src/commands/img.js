let Scraper = require('images-scraper');
let bing = new Scraper.Bing();
const axios = require('axios');
const fs = require('fs');
const Path = require('path');

async function getObj(arg) {
    let results;
    let rand = Math.floor(Math.random() * 1); 
    
    try {
         results = await bing.list({
             keyword : arg,
             num : 1,
            detail : true
        });

        //console.log(results);

        return {
            url : results[rand].url,
            name : arg + '.' + results[rand].format
        };

    } catch(e) {
        console.log(e);
    }
}

 async function download(obj) {
    const path = Path.resolve('images/', 'code.jpg'); 
    console.log("Download beginning");

    const response = await axios({
        method: 'GET',
        url : obj.url.toString(),
        responseType : 'stream'
    })

    response.data.pipe(fs.createWriteStream(path));

    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve()
        })
    
        response.data.on('error', () => {
          reject()
        })
      });
}

return module.exports = {
    getObj : getObj,
    download : download
}

