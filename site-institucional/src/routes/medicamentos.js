var express = require("express");
var router = express.Router();

var medicamentoController = require('../controllers/medicamentoController');

router.get('/fabricante/:idFabricante', function (request, response) {
  medicamentoController.listarPorFarmaceutica(request, response);
})

router.post('/', function (request, response) {
  medicamentoController.cadastrarMedicamento(request, response);
});

module.exports = router;