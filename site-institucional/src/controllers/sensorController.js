var sensorModel = require('../models/sensorModel');

function listarPorFarmaceutica(request, response) {
  var idFarmaceutica = request.params.idFabricante;

  if (idFarmaceutica == undefined) {
    response.status(400).send("Id da Farmacêtica é indefinido");
  } else if (idFarmaceutica <= 0) {
    response.status(400).send("Id da Farmacêtica é inválido");
  } else {
    sensorModel.listarPorFarmaceutica(idFarmaceutica).then(function (resultado) {
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

function listarPorTransportadora(request, response) {
  var idTransportadora = request.params.idTransportadora;

  if (idTransportadora == undefined) {
    response.status(400).send("id da transportadora é indefinido");
  } else {
    sensorModel.listarPorTransportadora(idTransportadora).then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`);

      console.log(resultado);

      response.json(resultado);
    }).catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar os sensores! Erro: ",
        erro.sqlMessage
      );

      response.status(500).json(erro.sqlMessage);
    });
  }
}

function solicitar(request, response) {
  var idFarmaceutica = request.params.idClienteServer;
  var qtdSensores = parseInt(request.params.quantidadeServer);

  if (idFarmaceutica == undefined) {
    response.status(400).send("Id da Farmacêtica é indefinido");
  } else if (idFarmaceutica <= 0) {
    response.status(400).send("Id da Farmacêtica é inválido");
  } else if (qtdSensores <= 0) {
    response.status(400).send("Quantidade de sensor menor que 0");
  } else {
    for (let i = 1; i <= qtdSensores; i++) {
      sensorModel.inserir(idFarmaceutica).then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`);

        console.log(resultado);
        if (i == qtdSensores) {
          response.json(resultado);
        }
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
}

function devolver(request, response) {
  var idSensor = request.params.idSensor;
  if (idSensor == undefined) {
    response.status(400).send("Id do sensor é indefinido");
  } else {
    sensorModel.devolver(idSensor).then(function (resultado) {
      console.log(resultado);
      response.status(200);
    }).catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao devolver o sensor! Erro: ",
        erro.sqlMessage
      );

      response.status(500).json(erro.sqlMessage);
    });
  }
}

module.exports = {
  listarPorFarmaceutica,
  solicitar,
  listarPorTransportadora,
  devolver
}