const credentials = require('./credentials');
const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const MAPBOX_TOKEN = credentials.MAPBOX_TOKEN;;
const DARK_SKY_SECRET_KEY = credentials.DARK_SKY_SECRET_KEY;

const _mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const _darksky = 'https://api.darksky.net/forecast/'

function getLocation(query){
  let url = `${_mapbox}${query}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
  request.get({url: url, json: true},
    function (error, response, body) {
      if(error){
          console.log('Hubo un error al buscar la ubicación');
          process.exit(1);
      }
      else{
        let coordinates = body.features[0].center.reverse().toString();
        getWeather(coordinates);
      }
    });
}

function getWeather(query){
  url =  `${_darksky}${DARK_SKY_SECRET_KEY}/${query}?units=si&lang=es`;
  request({url: url, json: true}, function (error, response, body) {
    if(error){
      console.log('Hubo un error al buscar el clima');
      process.exit(1);
    }
    else{
      let current_temp = body.currently.temperature;
      let today =  body.daily.data[0];
      let summary = today.summary;
      let precipitation = today.precipProbability * 100;
      console.log(`${summary} Actualmente está a ${current_temp}°C. Hay ${precipitation}% de posibilidad de lluvia.`);
      process.exit();
    }

  });
}

console.log('Escribe el lugar del que quieres el pronóstico: (Default: Monterrey, Nuevo León)');
rl.on('line', function(line){
    if(line.length == 0){
      getLocation('Monterrey, Nuevo Leon');
    }
    else{
      getLocation(line);
    }
})
