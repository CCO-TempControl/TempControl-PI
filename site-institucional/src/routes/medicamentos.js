var express = require("express");
var router = express.Router();

var medicamentoController = require('../controllers/medicamentoController');

router.get('/fabricante/:idFabricante', function (request, response) {
  medicamentoController.listarPorFarmaceutica(request, response);
})

router.post('/cadastrar', function (request, response) {
  medicamentoController.cadastrarMedicamento(request, response);
});

router.post('/deletar', function (request, response) {
  medicamentoController.deletarMedicamento(request, response);
});

module.exports = router;