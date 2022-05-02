var express = require("express");
var router = express.Router();

var transportadoraController = require('../controllers/transportadoraController');

router.post('/cadastrar', function (request, response) {
  transportadoraController.cadastrar(request, response);
});

router.get('/:idCliente', function (request, response) {
  transportadoraController.listar(request, response)
})

module.exports = router;