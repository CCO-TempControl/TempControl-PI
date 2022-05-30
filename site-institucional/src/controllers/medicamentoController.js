var medicamentoModel = require('../models/medicamentoModel');
/* Lista os Medicamentos da farmaceutica */
function listarPorFarmaceutica(request, response) {
  let idFarmaceutica = request.params.idFabricante;

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
        "\nHouve um erro ao listar o medicamento! Erro: ",
        erro.sqlMessage
      );

      response.status(500).json(erro.sqlMessage);
    });
  }
}
/* Adiciona um Medicamento no Banco */
function cadastrarMedicamento(request, response) {
  let idFarmaceutica = request.body.idClienteServer;
  let nomeMedicamento = request.body.nomeServer;
  let validadeMedicamento = request.body.validadeServer;
  let temperaturaMinima = request.body.tempMinServer;
  let temperaturaMaxima = request.body.tempMaxServer;
  let umidadeMinima = request.body.umiMinServer;
  let umidadeMaxima = request.body.umiMaxServer;

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
      function () {
        medicamentoModel.listarPorFarmaceutica(idFarmaceutica).then((resultado) => {
          response.json(resultado)
        }).catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro do medicamento! Erro: ",
            erro.sqlMessage
          );

          response.status(500).json(erro.sqlMessage);
        })
      }
    ).catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro do medicamento! Erro: ",
        erro.sqlMessage
      );

      response.status(500).json(erro.sqlMessage);
    });
  }
}

/* Deleta um medicamento no Banco */
function deletarMedicamento(request, response) {
  let idMedicamento = request.body.idMedicamento;
  let idFarmaceutica = request.body.idClienteServer;
  if (idFarmaceutica == undefined) {
    response.status(400).send("Fabricante não definida");
  } else if (idMedicamento == undefined) {
    response.status(400).send("Medicamento não definido");
  } else {
    medicamentoModel.deletar(
      idMedicamento
    ).then(
      function () {
        medicamentoModel.listarPorFarmaceutica(idFarmaceutica).then((resultado) => {
          response.json(resultado)

        }).catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao deletar o medicamento! Erro: ",
            erro.sqlMessage
          );

          response.status(500).json(erro.sqlMessage);
        })
      }
    ).catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao deletar o medicamento! Erro: ",
        erro.sqlMessage
      );

      response.status(500).json(erro.sqlMessage);
    });
  }
}
/* Editar um medicamento no Banco */
function editarMedicamento(request, response) {
  let idFarmaceutica = request.body.idClienteServer;
  let idMedicamento = request.body.idMedicamento;
  let nomeMedicamento = request.body.nomeServer;
  let validadeMedicamento = request.body.validadeServer;
  let temperaturaMinima = request.body.tempMinServer;
  let temperaturaMaxima = request.body.tempMaxServer;
  let umidadeMinima = request.body.umiMinServer;
  let umidadeMaxima = request.body.umiMaxServer;

  if (idMedicamento == undefined) {
    response.status(400).send("Medicamento não definido");
  } else if (idFarmaceutica == undefined) {
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
    medicamentoModel.editar(
      idMedicamento,
      nomeMedicamento,
      validadeMedicamento,
      temperaturaMinima,
      temperaturaMaxima,
      umidadeMinima,
      umidadeMaxima
    ).then(
      function () {
        medicamentoModel.listarPorFarmaceutica(idFarmaceutica).then((resultado) => {
          response.json(resultado)
        }).catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao editar o medicamento! Erro: ",
            erro.sqlMessage
          );

          response.status(500).json(erro.sqlMessage);
        })
      }
    ).catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao editar o medicamento! Erro: ",
        erro.sqlMessage
      );

      response.status(500).json(erro.sqlMessage);
    });
  }
}

module.exports = {
  listarPorFarmaceutica,
  cadastrarMedicamento,
  deletarMedicamento,
  editarMedicamento
}