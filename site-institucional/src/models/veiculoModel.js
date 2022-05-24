var database = require('../database/config');

function cadastrar(modelo, placa, ano, fkCliente) {
  console.log("ACESSEI O VEICULO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", modelo, placa, ano, fkCliente);

  var instrucao = `
    INSERT INTO veiculo (modelo, placa, ano, fkTransportadora) VALUES ('${modelo}', '${placa}', '${ano}', '${fkCliente}');
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

// function buscarPorId(id) {
//   console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorId():", id);

//   var instrucao = `
//     SELECT * FROM usuario WHERE idUsuario = ${id}
//   `;

//   console.log("Executando a instrução SQL: \n" + instrucao);
//   return database.executar(instrucao);

// }

function buscarPorIdCliente(idCliente) {
  console.log("ACESSEI O VEICULO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorIdCliente():", idCliente);

  var instrucao = `
    SELECT * FROM veiculo WHERE fkTransportadora = ${idCliente}
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarPorIdVeiculo(idVeiculo) {
  console.log("ACESSEI O VEICULO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorIdVeiculo():", idVeiculo);

  var instrucao = `
    SELECT * FROM veiculo WHERE idVeiculo = ${idVeiculo}
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function salvarEdicao(idVeiculo, modelo, placa, ano, fkTransportadora){
  console.log('chegando no salvar edição do model');
  console.log("ACESSEI O VEICULO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function salvarEdicao():", idVeiculo, modelo, placa, ano, fkTransportadora);

  var instrucao = `
    UPDATE veiculo SET modelo = '${modelo}', placa = '${placa}', ano = ${ano}, fkTransportadora = ${fkTransportadora} WHERE idVeiculo = ${idVeiculo};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function excluir(idVeiculo){
  console.log("ACESSEI O VEICULO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluir():", idVeiculo);

  var instrucao = `
    DELETE FROM veiculo WHERE idVeiculo = ${idVeiculo}
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar,
  buscarPorIdCliente,
  buscarPorIdVeiculo,
  salvarEdicao,
  excluir
};