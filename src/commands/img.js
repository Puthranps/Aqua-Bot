let Scraper = require('images-scraper');
let bing = new Scraper.Bing();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function getObj(arg) {
    let results;
    let rand = Math.floor(Math.random() * 10); 
    try{
         results = await bing.list({
             keyword : arg,
             num : 10,
            detail : true
        });

        return {
            url : results[rand].url,
            name : arg + '.' + results[rand].format
        };

    } catch(e) {
        console.log(e);
    }
}

async function download(obj,path) {
    if(!path) path = '../../images'; //primarily for debugging purposes 
    const filepath = path.resolve(path, obj.name);
    const response = await axios({
        method: 'GET',
        url : obj.url,
        responseType : 'stream'
    });

    response.data.pipe(fs.createWriteStream(filepath));

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
    getObj : getObj,
    download : download,
    upload : upload   
}

