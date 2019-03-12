const credentials = require('./credentials');
const request = require('request');

const ora = require('ora');
const spinner = ora('Obteniendo información');
spinner.color = 'yellow';

const chalk = require('chalk');

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

function getLocation(query, callback){
  let url = `${_mapbox}${query}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
  request.get({url: url, json: true},
    function (error, response, body) {
      if(error){
        callback('\nHubo un error con el servicio de ubicación', undefined);
      }
      else if(response.statusCode != 200) {
        callback('\nAcceso denegado. Token inválido', undefined);
      }
      else if(body.features.length < 1){
        callback('\nNo se encontro la ubicación especificada', undefined);
      }
      else{
        let coordinates = body.features[0].center.reverse().toString();
        callback(undefined, coordinates);
      }
    });
}

function getWeather(query, callback){
  url =  `${_darksky}${DARK_SKY_SECRET_KEY}/${query}?units=si&lang=es`;
  request({url: url, json: true}, function (error, response, body) {
    if(error){
      callback('Hubo un error con el servicio del clima', undefined);
    }
    else if (response.statusCode != 200) {
      callback('Acceso denegado. Token inválido', undefined);
    }
    else{
      let today = body.daily.data[0];
      let weather = {
        current_temp: body.currently.temperature,
        summary: today.summary,
        precipitation: today.precipProbability * 100
      };
      callback(undefined, weather);
    }

  });
}

function run(){
  console.log(chalk.blue.bold('\nEscribe el lugar del que quieres el pronóstico:') + chalk.green('(Default: Monterrey, Nuevo León)'));
  // Read location
  rl.on('line', function (line) {
    // If no input, go default
    if (line.length == 0) {
      line = 'Monterrey, Nuevo Leon';
    }
    spinner.start();
    // Get coordinates
    getLocation(line, function (error, response) {
      if (error) {
        spinner.stop();
        console.log(chalk.bgRed.bold('\n' + error));
        process.exit(1);
      } else {
        // Get weather
        getWeather(response, function (error, response) {
          spinner.stop();
          if (error) {
            console.log(chalk.bgRed.bold('\n' + error));
            process.exit(1);
          } else {
            // Output weather
            let output = chalk.cyan(
              `\n${chalk.underline(response.summary)} Actualmente está a ${chalk.bold(response.current_temp)} °C. Hay ${chalk.bold(response.precipitation + '%')} de posibilidad de lluvia.\n`);
            console.log(output);
            process.exit();
          }
        });
      }
    });
  });
}

run();