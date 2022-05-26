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

      response.json(resultado);
    }).catch(function (erro) {
      console.log(erro);
      console.log("\nHouve um erro ao realizar a busca de veículos! Erro: ", erro.sqlMessage);
      response.status(500).json(erro.sqlMessage);
    })
  }
}

function listarPorIdVeiculo(request, response) {
  let idVeiculo = request.body.idVeiculoServer;

  if (idVeiculo == undefined) {
    response.status(400).send("Seu idVeiculo está undefined!");
  } else {
    veiculoModel.buscarPorIdVeiculo(idVeiculo).then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

      if (resultado.length == 0) {
        response.status(403).send("idCliente inválido");
      } else {
        response.send(resultado);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("\nHouve um erro ao realizar a busca dos dados do veiculo! Erro: ", erro.sqlMessage);
      response.status(500).json(erro.sqlMessage);
    })
  }
}

function salvarEdicao(request, response) {
  console.log('chegando no salvar edição do controller');
  let idVeiculo = request.body.idVeiculoServer;
  let modelo = request.body.modeloServer;
  let placa = request.body.placaServer;
  let ano = request.body.anoServer;
  let fkTransportadora = request.body.fkTransportadoraServer;

  if (idVeiculo == undefined) {
    response.status(400).send("Seu idVeiculo está undefined!");
    console.log("Seu idVeiculo está undefined!");
  } else if (modelo == undefined){
    response.status(400).send("Seu modelo está undefined!");
    console.log("Seu modelo está undefined!");
  } else if (placa == undefined){
    response.status(400).send("Sua placa está undefined!");
    console.log("Sua placa está undefined!");
  } else if (ano == undefined){
    response.status(400).send("Seu ano está undefined!");
    console.log("Seu ano está undefined!");
  } else if (fkTransportadora == undefined){
    response.status(400).send("Seu fkTransportadora está undefined!");
    console.log("Seu fkTransportadora está undefined!");
  } else {
    console.log("chegando no else");
    veiculoModel.salvarEdicao(idVeiculo, modelo, placa, ano, fkTransportadora).then(function (resultado){
      response.json(resultado);
      console.log(`Resultado so salvar edição: ${resultado}`);
    }).catch(function(erro){
      console.log(erro);
      console.log("\nHouve um erro ao realizar o salvamento da edição dos dados do veiculo! Erro: ", erro.sqlMessage);
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
  listarPorIdVeiculo,
  salvarEdicao,
  excluir
}