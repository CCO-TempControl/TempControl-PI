var express = require("express");
var router = express.Router();

var transportadoraController = require('../controllers/transportadoraController');

router.post('/cadastrar', function (request, response) {
  transportadoraController.cadastrar(request, response);
})

router.post('/autenticar', function (request, response) {
  transportadoraController.entrar(request, response);
})

module.exports = router;