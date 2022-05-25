var express = require("express");
var router = express.Router();

var sensorController = require('../controllers/sensorController');

router.get('/fabricante/:idFabricante', function (request, response) {
  sensorController.listarPorFarmaceutica(request, response);
})

module.exports = router;