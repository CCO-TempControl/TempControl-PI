var database = require('../database/config');

function inserir(fkFarmaceutica) {
  console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkFarmaceutica);

  var instrucao = `
    INSERT INTO sensor (fkFarmaceutica) VALUES (${fkFarmaceutica});
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarPorFarmaceutica(idFarmaceutica) {
  console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorFarmaceutica():", idFarmaceutica);

  var instrucao = `
    SELECT * FROM sensor WHERE fkFarmaceutica = ${idFarmaceutica};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function atualizar(fkFarmaceutica, idSensor, fkTransportadora) {
  console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar():", fkFarmaceutica, idSensor, fkTransportadora);

  var instrucao = `
    UPDATE sensor SET fkTransportadora = ${fkTransportadora} WHERE idSensor = ${idSensor} AND fkFarmaceutica = ${fkFarmaceutica}
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  inserir,
  listarPorFarmaceutica,
  atualizar
}