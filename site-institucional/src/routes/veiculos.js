var express = require('express');
var router = express.Router();

var veiculoController = require('../controllers/veiculoController');

router.post('/cadastrar', function (request, response) {
  veiculoController.cadastrar(request, response);
});

router.post('/listarPorCliente', function (request, response) {
  veiculoController.listarPorCliente(request, response)
});

router.post('/listarPorIdVeiculo', function (request, response) {
  veiculoController.listarPorIdVeiculo(request, response)
});

router.post('/salvarEdicao', function (request, response) {
  console.log('chegando no salvar edição da rota');
  veiculoController.salvarEdicao(request, response)
});

router.post('/excluir', function (request, response) {
  veiculoController.excluir(request, response)
});

module.exports = router;