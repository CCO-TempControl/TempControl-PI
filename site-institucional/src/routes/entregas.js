var express = require('express');
var router = express.Router();

var entregaController = require('../controllers/entregaController');

router.post('/solicitar', function (request, response) {
  entregaController.solicitar(request, response);
});

router.get('/obter/:fkCliente', function (request, response) {
  entregaController.obter(request, response);
});

router.get('/operacao/inicial/:fkCliente', function (request, response) {
  entregaController.operacaoInicial(request, response);
});

router.get('/operacao/kpi/:idEntrega', function (request, response) {
  entregaController.operacaoKPI(request, response);
});

module.exports = router;