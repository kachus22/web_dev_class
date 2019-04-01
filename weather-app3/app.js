const weather = require('./weather')
const path = require('path')
const express = require('express')

const app = express()
const publicDir = path.join(__dirname, 'public')

const chalk = require('chalk');
const ora = require('ora');
const spinner = ora('Obteniendo información');
spinner.color = 'yellow';


app.get('/weather', function (req, res) {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  if (!req.query.search) {
    return res.send({
      error: 'Tienes que dar un lugar para buscar el clima'
    });
  }
  spinner.start();
  weather.getInfo(req.query.search, function (error, response) {
    if (error) {
      spinner.stop();
      console.log(chalk.bgRed.bold('\n ' + error));
      return res.send({
        error: error
      });
    }
    spinner.stop();
    res.send({
      asd: response
    });
  });
});


app.get('*', function (req, res) {
  res.send({
    error: 'Esta ruta no existe'
  });
});

app.listen(3000, function () {
  console.log(chalk.blue.bold('\n Listo para recibir peticiones\n'));
  console.log(chalk.green(' Ejemplo:\n http://localhost:3000/weather?search=Monterrey'));
});