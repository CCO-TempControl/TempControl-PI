var database = require('../database/config');

function cadastrar(dataEntrega, fkFarmaceutica, fkSensor, fkTransportadora) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", dataEntrega, fkFarmaceutica, fkSensor, fkTransportadora);

  var instrucao = `
    INSERT INTO entrega (dataEntrega, aprovada, fkFarmaceutica, fkSensor, fkTransportadora) VALUES ('${dataEntrega}', 'P', ${fkFarmaceutica}, ${fkSensor}, ${fkTransportadora});
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function obter(fkFarmaceutica) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obter():", fkFarmaceutica);

  var instrucao = `
    Select * from entrega where fkFarmaceutica = '${fkFarmaceutica}'
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar
}