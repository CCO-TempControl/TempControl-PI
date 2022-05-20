var database = require('../database/config');

function inserir(fkEntrega, idEndereco, endereco, bairro, cidade, uf, numero, cep) {
  console.log("ACESSEI O ENDERECO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function inserir():", fkEntrega, idEndereco, endereco, bairro, cidade, uf, numero, cep);

  var instrucao = `
    INSERT INTO endereco (fkEntrega, idEndereco, endereco, bairro, cidade, uf, numero, cep) VALUES (${fkEntrega}, ${idEndereco}, '${endereco}', '${bairro}', '${cidade}', '${uf}', ${numero}, '${cep}');
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  inserir
}