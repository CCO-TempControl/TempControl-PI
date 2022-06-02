var database = require('../database/config');

function inserir(cnpj) {
  console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cnpj);

  var instrucao = `INSERT INTO sensor (fkFarmaceutica) SELECT idCliente FROM cliente WHERE cnpjCliente = '${cnpj}';`;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarPorFarmaceutica(idFarmaceutica) {
  console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorFarmaceutica():", idFarmaceutica);

  var instrucao = `
    SELECT idSensor, fkFarmaceutica, fkTransportadora, nomeCliente FROM sensor LEFT JOIN cliente ON fkTransportadora = idCliente WHERE fkFarmaceutica = ${idFarmaceutica};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarPorTransportadora(idTransportadora) {
  console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorTransportadora():", idTransportadora);

  var instrucao = `
  SELECT sensor.*, entrega.idEntrega, cliente.nomeCliente FROM sensor LEFT JOIN entrega on entrega.fkSensor = sensor.idSensor INNER JOIN cliente ON cliente.idCliente = sensor.fkFarmaceutica WHERE sensor.fkTransportadora = ${idTransportadora};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function atualizar(idSensor, fkTransportadora) {
  console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar():", idSensor, fkTransportadora);

  var instrucao = `
    UPDATE sensor SET fkTransportadora = ${fkTransportadora} WHERE idSensor = ${idSensor};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function devolver(idSensor) {
  console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function devolver():", idSensor);

  var instrucao = `
    UPDATE sensor SET fkTransportadora = null WHERE idSensor = ${idSensor};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  inserir,
  listarPorFarmaceutica,
  atualizar,
  listarPorTransportadora,
  devolver
}