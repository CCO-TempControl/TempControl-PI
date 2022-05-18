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
  console.log("ACESSEI O MEDICAMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeMedicamento, validadeMedicamento, temperaturaMinima, temperaturaMaxima, umidadeMinima, umidadeMaxima, idFarmaceutica);

  var instrucao = `
    INSERT INTO medicamento values (null, '${nomeMedicamento}', ${validadeMedicamento}, ${temperaturaMinima}, ${temperaturaMaxima}, ${umidadeMinima}, ${umidadeMaxima}, ${idFarmaceutica});
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

/* Deleta um Medicamento no Banco */
function deletar(idMedicamento) {
  console.log("ACESSEI O MEDICAMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idMedicamento);

  var instrucao = `
    DELETE FROM medicamento WHERE idMedicamento = ${idMedicamento};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

/* Edita um Medicamento no Banco */
function editar(idMedicamento, nomeMedicamento, validadeMedicamento, temperaturaMinima, temperaturaMaxima, umidadeMinima, umidadeMaxima) {
  console.log("ACESSEI O MEDICAMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar():", idMedicamento, nomeMedicamento, validadeMedicamento, temperaturaMinima, temperaturaMaxima, umidadeMinima, umidadeMaxima);

  var instrucao = `
    UPDATE medicamento SET nome = '${nomeMedicamento}', validade = ${validadeMedicamento}, tempMin = ${temperaturaMinima},
    tempMax = ${temperaturaMaxima},umidMin = ${umidadeMinima}, umidMax= ${umidadeMaxima}
                where idMedicamento = ${idMedicamento};
    `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
module.exports = {
  listarPorFarmaceutica,
  cadastrar,
  deletar,
  editar
}