var veiculoModel = require('../models/veiculoModel');

function cadastrar(request, response) {
  var modelo = request.body.modeloServer;
  var placa = request.body.placaServer;
  var ano = request.body.anoServer;
  var fkCliente = request.body.fkClienteServer;

  if (modelo == undefined) {
    response.status(400).send("Seu modelo está undefined!");
  } else if (placa == undefined) {
    response.status(400).send("Sua placa está undefined!");
  } else if (ano == undefined) {
    response.status(400).send("Seu ano está undefined!");
  } else if (fkCliente == undefined) {
    response.status(400).send("Seu fkCliente está undefined!");
  } else {
    veiculoModel.cadastrar(modelo, placa, ano, fkCliente).then(
      function (resultado) {
        response.json(resultado);
      }
    ).catch(function (erro) {
      console.log(erro);
      console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
      response.status(500).json(erro.sqlMessage);
    })
  }
}

function listarPorCliente(request, response) {
  let idCliente = request.body.idClienteServer;

  if (idCliente == undefined) {
    response.status(400).send("Seu idCliente está undefined!");
  } else {
    veiculoModel.buscarPorIdCliente(idCliente).then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

      if (resultado.length == 0) {
        response.status(403).send("idCliente inválido");
      } else {
        response.send(resultado);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("\nHouve um erro ao realizar a busca de veículos! Erro: ", erro.sqlMessage);
      response.status(500).json(erro.sqlMessage);
    })
  }
}

function excluir(request, response) {
  let idVeiculo = request.body.idVeiculoServer;
  if (idVeiculo == undefined) {
    response.status(403).send("idCliente não definido");
  } else {
    veiculoModel.excluir(idVeiculo).then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

      if (resultado.length == 0) {
        response.status(403).send("idVeiculo inválido");
      } else {
        response.send(resultado);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("\nHouve um erro ao realizar a exclusão de veículos! Erro: ", erro.sqlMessage);
      response.status(500).json(erro.sqlMessage);
    })
  }
}

module.exports = {
  cadastrar,
  listarPorCliente,
  excluir
}