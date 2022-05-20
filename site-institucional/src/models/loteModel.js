var database = require('../database/config');

function inserir(fkMedicamento, fkEntrega, qtd) {
  console.log("ACESSEI O LOTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function inserir():", fkMedicamento, fkEntrega, qtd);

  var instrucao = `
    INSERT INTO lote (fkMedicamento, fkEntrega, qtd) VALUES (${fkMedicamento}, ${fkEntrega}, ${qtd});
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  inserir
}