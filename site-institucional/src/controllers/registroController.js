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
    if (fkEntrega == undefined) {
      response.status(400).send("Fk da Entrega é indefinido");
    }  else {
      registroModel.obterDados(fkEntrega, ordenar, limite).then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`);
  
        response.json(resultado);
      }).catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao obter os dados dos sensores! Erro: ",
            erro.sqlMessage
        );
        
        response.status(500).json(erro.sqlMessage);
      });
    }

}

function obterAlertas(request, response) {
    var fkCliente = request.params.fkClienteServer;
    var tipoDado = request.params.tipoDadoServer;

    if (fkCliente == undefined) {
      response.status(400).send("Fk da Farmacêutica é indefinido");
    } else if (tipoDado == undefined) {
      response.status(400).send("Tipo do Dado é indefinido");
    }  else {
      registroModel.obterAlertas(fkCliente, tipoDado).then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`);
  
        response.json(resultado);
      }).catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao obter os dados dos sensores! Erro: ",
            erro.sqlMessage
        );
        
        response.status(500).json(erro.sqlMessage);
      });
    }

}

function obterKPI(request, response) {
    var fkEntrega = request.params.fkEntregaServer;

    if (fkEntrega == undefined) {
      response.status(400).send("Fk da Entrega é indefinido");
    }  else {
      registroModel.obterKPI(fkEntrega).then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`);
  
        response.json(resultado);
      }).catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao obter os dados dos sensores! Erro: ",
            erro.sqlMessage
        );
        
        response.status(500).json(erro.sqlMessage);
      });
    }

}

function obterKPIEstrategico(request, response) {
  var fkCliente = request.params.fkClienteServer;

    if (fkCliente == undefined) {
      response.status(400).send("Fk da Farmacêutica é indefinido");
    }  else {
      registroModel.obterKPIEstrategico(fkCliente).then(function (resultadoKPI) {
        console.log(`\nResultados encontrados: ${resultadoKPI.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoKPI)}`);
  
        registroModel.obterTransportadorasAlertas(fkCliente).then(function (resultado) {
              console.log(`\nResultados encontrados: ${resultado.length}`);
              console.log(`Resultados: ${JSON.stringify(resultado)}`);
              let result = {
                'primeiraParte': resultadoKPI,
                'segundaParte': resultado
              };
              response.json(result);
        }).catch(function (erro) {
              console.log(erro);
              console.log(
                  "\nHouve um erro ao obter os dados dos sensores! Erro: ",
                  erro.sqlMessage
              );
              
              response.status(500).json(erro.sqlMessage);
        });
      }).catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao obter os dados dos sensores! Erro: ",
            erro.sqlMessage
        );
        
        response.status(500).json(erro.sqlMessage);
      });
    }

}

module.exports = {
  obterDados,
  obterAlertas,
  obterKPI,
  obterKPIEstrategico
}