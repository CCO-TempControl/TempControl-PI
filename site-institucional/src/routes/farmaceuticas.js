var express = require('express');
var router = express.Router();

var farmaceuticaController = require('../controllers/farmaceuticaController');

router.post('/cadastrar', function (request, response) {
  farmaceuticaController.cadastrar(request, response);
});

module.exports = router;