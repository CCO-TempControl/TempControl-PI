var express = require('express');
var router = express.Router();

var entregaController = require('../controllers/entregaController');

router.post('/solicitar', function (request, response) {
  entregaController.solicitar(request, response);
});

router.get('/kpi-index/:idCliente&:tipoCliente', function (request, response) {
  entregaController.dadosKPI(request, response);
});


router.get('/obter/:fkCliente', function (request, response) {
  entregaController.obter(request, response);
});

router.get('/renderizarEntrega/:fkCliente', function (request, response) {
  entregaController.renderizarEntrega(request, response);
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

router.post('/listar-entregas-transportadora', function (request, response) {
  entregaController.listarEntregasTransportadora(request, response);
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

router.post('/adicionarHorSaida', function(request, response){
  entregaController.adicionarHorSaida(request, response);
})

router.post('/adicionarHorChegada', function(request, response){
  entregaController.adicionarHorChegada(request, response);
})

router.get('/estrategico-t/:idCliente', function (request, response) {
  entregaController.estrategicoTKPI(request, response);  
});

router.post('/listar-solicitacoes-farmaceutica', function (request, response) {
  entregaController.listarSolicitacoesFarmaceutica(request, response);
});

router.post('/listar-entregas-farmaceutica', function (request, response) {
  entregaController.listarEntregasFarmaceutica(request, response);
});

module.exports = router;