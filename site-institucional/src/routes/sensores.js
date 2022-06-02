var express = require("express");
var router = express.Router();

var sensorController = require('../controllers/sensorController');

router.get('/fabricante/:idFabricante', function (request, response) {
  sensorController.listarPorFarmaceutica(request, response);
})

router.get('/transportadora/:idTransportadora', function (request, response) {
  sensorController.listarPorTransportadora(request, response);
})

router.get('/devolver/:idSensor', function (request, response) {
  sensorController.devolver(request, response);
})


module.exports = router;