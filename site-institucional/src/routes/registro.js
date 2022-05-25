var express = require("express");
var router = express.Router();

var registroController = require('../controllers/registroController');

/* router.get('/obterDados/:fkEntrega', function (request, response) {
  registroController.obterDados(request, response);
}) */

router.get('/obterDados/:fkEntregaServer&:ordenarServer&:limiteServer', function (request, response) {
  registroController.obterDados(request, response);
});



module.exports = router;