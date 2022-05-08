var database = require('../database/config');

function cadastrar(fkCliente, nome, email, senha, tipoUsuario, fkAdmin) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkCliente, nome, email, senha, tipoUsuario, fkAdmin);

  var instrucao = `
    INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario, tipoUsuario, fkCliente, fkAdmin) VALUES ('${nome}', '${email}', SHA2('${senha}', 512), '${tipoUsuario}', ${fkCliente}, ${fkAdmin});
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar():", email, senha);

  var instrucao = `
    SELECT * FROM usuario WHERE emailUsuario = '${email}' AND senhaUsuario = SHA2('${senha}', 512);
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

function buscarPorIdCliente(idCliente) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorIdCliente():", idCliente);

  var instrucao = `
    SELECT * FROM usuario WHERE fkCliente = ${idCliente}
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar,
  entrar,
  buscarPorId,
  buscarPorIdCliente
};