var database = require('../database/config');

function inserir(fkFarmaceutica, idSensor) {
  console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkFarmaceutica, idSensor);

  var instrucao = `
    INSERT INTO sensor (fkFarmaceutica, idSensor, estado) VALUES (${fkFarmaceutica}, ${idSensor}, 'ok');
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  inserir
}