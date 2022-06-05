var express = require("express");
var router = express.Router();

var registroController = require('../controllers/registroController');

/* router.get('/obterDados/:fkEntrega', function (request, response) {
  registroController.obterDados(request, response);
}) */

router.get('/obterDados/:fkEntregaServer&:ordenarServer&:limiteServer', function (request, response) {
  registroController.obterDados(request, response);
});

router.get('/obterAlertas/:fkClienteServer&:tipoDadoServer&:tipoCliente', function (request, response) {
  registroController.obterAlertas(request, response);
});

router.get('/obterKPI/:fkEntregaServer', function (request, response) {
  registroController.obterKPI(request, response);
});

router.get('/obterKPIEstrategico/:fkClienteServer&:tipoCliente', function (request, response) {
  registroController.obterKPIEstrategico(request, response);
});

router.get('/monitorar-entregas/:fkCliente&:tipoCliente', function (request, response) {
  registroController.monitorarEntregas(request, response);
});

router.get('/situacaoRegistro/:fkCliente&:tipoCliente', function (request, response) {
  registroController.situacaoRegistro(request, response);
});

module.exports = router;