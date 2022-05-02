var database = require('../database/config');

// Lista os Medicamentos da farmaceutica
function listarPorFarmaceutica(idFarmaceutica) {
  console.log("ACESSEI O MEDICAMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorFarmaceutica():", idFarmaceutica);

  var instrucao = `
    SELECT * FROM medicamento WHERE fkFarmaceutica = ${idFarmaceutica};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

/* Adiciona um Medicamento no Banco */
function cadastrar(nomeMedicamento, validadeMedicamento, temperaturaMinima, temperaturaMaxima, umidadeMinima, umidadeMaxima, idFarmaceutica) {
  console.log("ACESSEI O MEDICAMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarMedicamento():", idFarmaceutica);

  var instrucao = `
    INSERT INTO medicamento values (null, '${nomeMedicamento}', '${validadeMedicamento}', ${temperaturaMinima}, ${temperaturaMaxima}, ${umidadeMinima}, ${umidadeMaxima}, ${idFarmaceutica});
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listarPorFarmaceutica,
  cadastrar
}