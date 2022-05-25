var database = require('../database/config');

function obterDados(fkEntrega, ordenar = false, limite = 10) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDados():", fkEntrega, ordenar, limite);

    var instrucao = `
    SELECT fkEntrega, idRegistro, dht11temperatura, dht11umidade, horario, situacaoTemperatura, situacaoUmidade FROM registro where fkEntrega = ${fkEntrega} 
    `;
    if (ordenar == true) {
        instrucao += `order by horario desc`;
    }
    instrucao += ` limit 0, ${limite};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    obterDados
}