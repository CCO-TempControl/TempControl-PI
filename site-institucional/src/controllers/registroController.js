var registroModel = require('../models/registroModel');

function obterDados(request, response) {
    var fkEntrega = request.params.fkEntregaServer;
    var ordenar = request.params.ordenarServer;
    var limite = parseInt(request.params.limiteServer);

    if (limite <= 0 || isNaN(limite)) {
        limite = 10;
    }
    if (ordenar != 'false' && ordenar != 'true') {
      ordenar = false;
    } else {
      if (ordenar == 'true') {
        ordenar = true;
      } else {
        ordenar = false
      }
    }
    if (fkEntrega == 'undefined') {
      response.status(400).send("Fk da Farmacêutica é indefinido");
    }  else {
      registroModel.obterDados(fkEntrega, ordenar, limite).then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`);
  
        console.log(resultado);
  
        response.json(resultado);
      }).catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
        );
        
        response.status(500).json(erro.sqlMessage);
      });
    }

}

module.exports = {
  obterDados
}