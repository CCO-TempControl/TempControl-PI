var database = require('../database/config');

function listarPorFarmaceutica(idFarmaceutica) {
  console.log("ACESSEI O MEDICAMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorFarmaceutica():", idFarmaceutica);

  var instrucao = `
    SELECT * FROM medicamento WHERE fkFarmaceutica = ${idFarmaceutica};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listarPorFarmaceutica
}