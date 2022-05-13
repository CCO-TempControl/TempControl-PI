var medicamentoModel = require('../models/medicamentoModel');
// Lista os Medicamentos da farmaceutica
function listarPorFarmaceutica(request, response) {
  var idFarmaceutica = request.params.idFabricante;

  if (idFarmaceutica == undefined) {
    response.status(400).send("Id da Farmacêtica é indefinido");
  } else if (idFarmaceutica <= 0) {
    response.status(400).send("Id da Farmacêtica é inválido");
  } else {
    medicamentoModel.listarPorFarmaceutica(idFarmaceutica).then(function (resultado) {
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
/* Adiciona um Medicamento no Banco */
function cadastrarMedicamento(request, response) {
  var idFarmaceutica = request.body.idClienteServer;
  var nomeMedicamento = request.body.nomeServer;
  var validadeMedicamento = request.body.validadeServer;
  var temperaturaMinima = request.body.tempMinServer;
  var temperaturaMaxima = request.body.tempMaxServer;
  var umidadeMinima = request.body.umiMinServer;
  var umidadeMaxima = request.body.umiMaxServer;
  
  if (idFarmaceutica == undefined) {
    response.status(400).send("Fabricante não definida");
  } else if (nomeMedicamento == undefined) {
    response.status(400).send("Nome do medicamento não definido");
  } else if (temperaturaMinima == undefined) {
    response.status(400).send("Temperatura Miníma não definida");
  } else if (temperaturaMaxima == undefined) {
    response.status(400).send("Temperatura Máxima não definida");
  } else if (umidadeMinima == undefined) {
    response.status(400).send("Umidade Miníma não definida");
  } else if (umidadeMaxima == undefined) {
    response.status(400).send("Umidade Máxima não definida");
  } else {
    medicamentoModel.cadastrar(
      nomeMedicamento, 
      validadeMedicamento, 
      temperaturaMinima, 
      temperaturaMaxima, 
      umidadeMinima, 
      umidadeMaxima, 
      idFarmaceutica
    ).then(
      function(insert) {
        var idMedicamento = insert.insertId;

        medicamentoModel.buscarPorId(idMedicamento).then(function(resultado) { 
          response.json(resultado[0]) 
        }).catch(function (erro) {
          console.log(erro);
          console.log(
              "\nHouve um erro ao realizar o cadastro! Erro: ",
              erro.sqlMessage
          );
          
          response.status(500).json(erro.sqlMessage);
        })
      }
    ).catch(function (erro) {
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
  listarPorFarmaceutica,
  cadastrarMedicamento
}