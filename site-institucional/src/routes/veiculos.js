var express = require('express');
var router = express.Router();

var veiculoController = require('../controllers/veiculoController');

router.post('/cadastrar', function (request, response) {
  veiculoController.cadastrar(request, response);
});

router.post('/listarPorCliente', function (request, response) {
  veiculoController.listarPorCliente(request, response)
});

module.exports = router;