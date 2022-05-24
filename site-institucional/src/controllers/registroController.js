var registroModel = require('../models/registroModel');

function obterDados(request, response) {
    var fkEntrega = request.params.fkEntregaServer;
    var ordenar = request.params.ordenarServer;
    var limite = request.params.limiteServer;

    if (limite <= 0 || typeof limite != 'number') { /* Verificar */
        limite = 10;
    }
    if (typeof ordenar != 'boolean') { /* Verificar */
      ordenar = false;
    }

    if (fkEntrega == undefined) {
      response.status(400).send("Fk da Entrega é indefinido");
    }  else {
      registroModel.obterDados(fkEntrega, limite, ordenar).then(function (resultado) {
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