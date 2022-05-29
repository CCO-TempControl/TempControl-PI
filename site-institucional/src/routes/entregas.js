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

router.post('/listar-solicitacoes-transportadora', function (request, response) {
  entregaController.listarSolicitacoesTransportadora(request, response);
});

router.post('/obterDados', function (request, response) {
  entregaController.obterDados(request, response);
});

router.post('/aprovarEntrega', function(request, response){
  entregaController.aprovarEntrega(request, response);
})

router.post('/negarEntrega', function(request, response){
  entregaController.negarEntrega(request, response);
})

module.exports = router;