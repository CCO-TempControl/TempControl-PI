var database = require('../database/config');

function cadastrar(nome, cnpj, qtdSensor, email, telefone, senha) {
  console.log("ACESSEI O FARMACEUTICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj, qtdSensor, email, telefone, senha);

  var instrucao = `
    INSERT INTO usuario (nomeUsuario, cnpjUsuario, emailUsuario, telefoneUsuario, senhaUsuario, tipoUsuario) VALUES ('${nome}', '${cnpj}', '${email}', '${telefone}', SHA2('${senha}', 512), 'F');
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar
}