const config = require('../../config/google_config.json');
let Scraper = require('images-scraper');
let bing = new Scraper.Bing();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function getObj(arg) {
    let results;
    let rand = Math.floor(Math.random() * 4); 
    try{
         results = await bing.list({
             keyword : arg,
             num : 5,
            detail : true
        });

        return {
            url : results[rand].url,
            name : arg + results[rand].format
        };

    } catch(e) {
        console.log(e);
    }
}

async function download(obj) {
    const path = path.resolve(__dirname, 'images', obj.name);
    const response = await axios({
        method: 'GET',
        url : obj.url,
        responseType : 'stream'
    });

    response.data.pipe(fs.createWriteStream(path));

    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve();
        });

        response.data.on('error', err => { 
            reject(err);
        })
    });
}

async function upload(arg) {
    let obj = await getObj(arg);
    await download(obj);

    return [
        `./images/${obj.name}`
    ];
}

return module.exports = {
    upload : upload   
}

