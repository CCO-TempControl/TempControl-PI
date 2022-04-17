var database = require("../database/config");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, cnpj, email, telefone, senha) {
  console.log("ACESSEI O TRANSPORTADORA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj, email, telefone, senha);
  
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
    INSERT INTO transportadora (nome, cnpj, email, telefone, senha) VALUES ('${nome}', '${cnpj}', '${email}', '${telefone}', SHA2('${senha}', 512));
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar
};