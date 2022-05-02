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
function adicionarMedicamento(request, response) {
  var idFarmaceutica = request.body.idCliente;
  var nomeMedicamento = request.body.nome;
  var validadeMedicamento = request.body.validade;
  var temperaturaMinima = request.body.tempMin;
  var temperaturaMaxima = request.body.tempMax;
  var umidadeMinima = request.body.umiMin;
  var umidadeMaxima = request.body.umiMax;
  
  if (idFarmaceutica == undefined) {
    response.status(400).send("idFabricante não definida");
  } else if (nomeMedicamento == undefined) {
    response.status(400).send("Nome Do Medicamento não definido");
  } else if (temperaturaMinima == undefined) {
    response.status(400).send("temp.Min não definida");
  } else if (temperaturaMaxima == undefined) {
    response.status(400).send("temp.Max não definida");
  } else if (umidadeMinima == undefined) {
    response.status(400).send("Umi.Min não definida");
  } else if (umidadeMaxima == undefined) {
    response.status(400).send("Umi.Max não definida");
  } else {
    medicamentoModel.adicionar(nomeMedicamento, validadeMedicamento ,temperaturaMinima, temperaturaMaxima, umidadeMinima, umidadeMaxima, idFarmaceutica);
  }
}

module.exports = {
  listarPorFarmaceutica,
  adicionarMedicamento
}