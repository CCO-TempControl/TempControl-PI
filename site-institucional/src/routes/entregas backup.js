var express = require('express');
var router = express.Router();

var entregaController = require('../controllers/entregaController');

router.post('/solicitar', function (request, response) {
  entregaController.solicitar(request, response);
});

router.get('/obter/:fkCliente', function (request, response) {
  entregaController.obter(request, response);
});

router.post('/listar-solicitacoes-transportadora', function (request, response) {
  console.log("****ACESSEI A ROTA ENTREGAS");
  entregaController.listarSolicitacoesTransportadora(request, response);
});

module.exports = router;