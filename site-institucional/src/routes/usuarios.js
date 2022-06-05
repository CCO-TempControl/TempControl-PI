var express = require('express');
var router = express.Router();

var usuarioController = require('../controllers/usuarioController');

router.post('/cadastrar', function (request, response) {
  usuarioController.cadastrar(request, response);
});

router.post('/cadastrarUsuario', function (request, response) {
  usuarioController.cadastrarUsuario(request, response);
});

router.post('/autenticar', function (request, response) {
  usuarioController.entrar(request, response)
});

router.get('/listarPorCliente/:idCliente', function (request, response) {
  usuarioController.listarPorCliente(request, response)
});

router.post('/alterarDados', function (request, response) {
  usuarioController.alterarDados(request, response)
});

router.post('/alterarSenha', function (request, response) {
  usuarioController.alterarSenha(request, response)
});

module.exports = router;