var express = require("express");
var router = express.Router();

var medicamentoController = require('../controllers/medicamentoController');

router.get('/fabricante/:idFabricante', function (request, response) {
  medicamentoController.listarPorFarmaceutica(request, response);
})

/* Adiciona um Medicamento no Banco */
router.post('/adicionarMedicamento', function (request, response) {
  medicamentoController.adicionarMedicamento(request, response);
});

module.exports = router;