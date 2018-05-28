const axios = require('axios');

async function getWeather(arg){
    let encodedAddress = encodeURIComponent(arg);
    let geoCode = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;
    
    try {

        let response = await axios.get(geoCode);
        if(response === 'ZERO_RESULTS') return 'Unable to fetch weather, verify location.';

        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        let weatherinfo =  `https://api.darksky.net/forecast/831d6b9cc3dba230ada7a14bdb0c0a9b/${lat},${lng}`;

        let results = await axios.get(weatherinfo);
        let currentTemp = response.data.currently.temperature;
        let apparentTemp = response.data.currently.apparentTemperature;

        return `It's currently ${currentTemp}, however it feels like ${apparentTemp}.`;

    } catch(e) {
        if(e.code==='ENOTFOUND') return 'unable to connect';
        return `${e} is causing an issue`;
    }
    
}

return module.exports = {
    getWeather : getWeather
}