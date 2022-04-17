var express = require("express");
var router = express.Router();

var transportadoraController = require('../controllers/transportadoraController');

router.post('/cadastrar', function (request, response) {
  transportadoraController.cadastrar(request, response);
});

module.exports = router;