var database = require('../database/config');

function cadastrar(cnpj, nome, email, senha, tipoUsuario, fkAdmin) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cnpj, nome, email, senha, tipoUsuario, fkAdmin);

  var instrucao = `
    INSERT INTO usuario  (nomeUsuario, emailUsuario, senhaUsuario, tipoUsuario, fkCliente, fkAdmin) SELECT '${nome}', '${email}','${senha}','${tipoUsuario}', idCliente, ${fkAdmin} FROM cliente WHERE cnpjCliente = '${cnpj}';`;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarUsuario(nome, email, senha, tipoUsuario, fkAdmin,fkCliente) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, tipoUsuario, fkAdmin);

  var instrucao = `
    INSERT INTO usuario  (nomeUsuario, emailUsuario, senhaUsuario, tipoUsuario, fkCliente, fkAdmin) VALUES('${nome}','${email}','${senha}','${tipoUsuario}','${fkCliente}',${fkAdmin});`;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar():", email, senha);

  var instrucao = `
    SELECT * FROM usuario WHERE emailUsuario = '${email}' AND senhaUsuario = '${senha}';
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

function atualizar(id,nome,email) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorId():", id);
  var instrucao = `UPDATE usuario SET nomeUsuario = '${nome}', emailUsuario = '${email}' WHERE idUsuario = ${id}`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);

}

function atualizarSenha(id,senha) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorId():", id);

  var instrucao = `UPDATE usuario SET senhaUsuario = '${senha}' WHERE idUsuario = ${id}`;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);

}

function buscarPorIdUsuario(idUsuario) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorIdUsuario()", idUsuario);

  var instrucao = `
    SELECT * FROM usuario WHERE idUsuario = ${idUsuario}
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}



function buscarPorIdCliente(idCliente) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorIdCliente():", idCliente);

  var instrucao = `
  SELECT u.nomeUsuario,u.emailUsuario,u.tipoUsuario,a.nomeUsuario AS admin FROM usuario AS u LEFT jOIN usuario AS a ON u.fkAdmin = a.idUsuario WHERE u.fkCliente = ${idCliente};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar,
  entrar,
  buscarPorId,
  atualizar,
  atualizarSenha,
  buscarPorIdCliente,
  cadastrarUsuario,
  buscarPorIdUsuario
};