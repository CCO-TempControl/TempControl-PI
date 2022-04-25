var database = require('../database/config');

function entrar(email, senha) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar():", email, senha);

  var instrucao = `
    SELECT * FROM usuario WHERE emailUsuario = '${email}' AND senhaUsuario = SHA2('${senha}', 512);
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function editar(id, nome, email, senha, cnpj, telefone) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar():", id, nome, email, senha, cnpj, telefone);

  var instrucao = `
    UPDATE usuario 
    SET nomeUsuario = '${nome}', 
    emailUsuario = '${email}', 
    senhaUsuario = SHA2('${senha}', 512), 
    cnpjUsuario = '${cnpj}', 
    telefoneUsuario = '${telefone}' 
    WHERE idUsuario = ${id}
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarPorId(id) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorId():", id);

  var instrucao = `
    SELECT * FROM usuario WHERE idUsuario = ${id}
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
  
}

module.exports = {
  entrar,
  editar,
  buscarPorId
};