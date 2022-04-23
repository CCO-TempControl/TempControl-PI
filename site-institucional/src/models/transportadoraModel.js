var database = require("../database/config");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, cnpj, email, telefone, senha) {
  console.log("ACESSEI O TRANSPORTADORA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj, email, telefone, senha);
  
  var instrucao = `
    INSERT INTO usuario (nomeUsuario, cnpjUsuario, emailUsuario, telefoneUsuario, senhaUsuario, tipoUsuario) VALUES ('${nome}', '${cnpj}', '${email}', '${telefone}', SHA2('${senha}', 512), 'T');
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar
};