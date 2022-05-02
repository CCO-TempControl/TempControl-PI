var database = require('../database/config');

function cadastrar(nome, cnpj, telefone, tipo) {
  console.log("ACESSEI O CLIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj, telefone, tipo);

  var instrucao = `
    INSERT INTO cliente (nomeCliente, cnpjCliente, telefoneCliente, tipoCliente) VALUES ('${nome}', '${cnpj}', '${telefone}', '${tipo}');
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listar(idCliente, tipoCliente) {
  console.log("ACESSEI O CLIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar():", idCliente, tipoCliente);

  var instrucao = `
    SELECT * FROM cliente WHERE tipoCliente = '${tipoCliente}' AND idCliente <> ${idCliente};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar,
  listar
}