var database = require('../database/config');

function cadastrar(dataEntrega, fkSensor, fkTransportadora) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", dataEntrega, fkSensor, fkTransportadora);

  var instrucao = `
    INSERT INTO entrega (dataEntrega, aprovada, fkSensor, fkTransportadora) VALUES ('${dataEntrega}', 'P', ${fkSensor}, ${fkTransportadora});
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function obter(fkFarmaceutica) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obter():", fkFarmaceutica);

  var instrucao = `
    SELECT * FROM entrega;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar,
  obter
}