var database = require('../database/config');

function obterDados(fkEntrega, ordenar = false, limite = 10) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDados():", fkEntrega, ordenar, limite);

    var instrucao = `
        SELECT fkEntrega, idRegistro, dht11temperatura, dht11umidade, horario, situacaoTemperatura, situacaoUmidade FROM registro WHERE fkEntrega = ${fkEntrega} 
    `;
    if (ordenar == true) {
        instrucao += `ORDER BY horario DESC`;
    }
    instrucao += ` LIMIT ${limite};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterAlertas(fkEntrega, tipoDado) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterAlertas():", fkEntrega, tipoDado);

    var instrucao;

    if (tipoDado == 'mes') {
        instrucao = `
                    SELECT COUNT(situacaoTemperatura) as 'quantidadeRegistro', (
                            select COUNT(*) from registro r2
                            WHERE (r2.situacaoTemperatura <> 'I' or r2.situacaoUmidade <> 'I') and r2.fkEntrega = 1 and r1.idRegistro = r2.idRegistro) as 'quantidadeAlerta',
                            MONTHNAME(horario) as 'mes'
                    FROM registro r1 WHERE fkEntrega = 1 GROUP BY MONTHNAME(horario) order by horario desc;`;
    } else if (tipoDado == 'nomeDia') {
        instrucao = `
                    SELECT COUNT(situacaoTemperatura) as 'quantidadeRegistro', (
                        select COUNT(*) from registro r2
                        WHERE (r2.situacaoTemperatura <> 'I' or r2.situacaoUmidade <> 'I') and r2.fkEntrega = 1 and r1.idRegistro = r2.idRegistro) as 'quantidadeAlerta',
                        DAYNAME(horario) as 'nomeDia'
                    FROM registro r1 WHERE fkEntrega = 1 AND MONTH(horario) = ${new Date().getMonth()} GROUP BY DAYNAME(horario);`;
    } else if (tipoDado == 'dia') {
        instrucao = `
                    SELECT COUNT(situacaoTemperatura) as 'quantidadeRegistro', (
                        select COUNT(*) from registro r2
                        WHERE (r2.situacaoTemperatura <> 'I' or r2.situacaoUmidade <> 'I') and r2.fkEntrega = 1 and r1.idRegistro = r2.idRegistro) as 'quantidadeAlerta',
                        DAY(horario) as 'dia',
                        MONTH(horario) as 'mes'
                    FROM registro r1 WHERE fkEntrega = 1 GROUP BY DAY(horario) order by horario desc;`;
    } else if (tipoDado == 'tempo') {

    }

    instrucao.replaceAll('\n', '');
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterKPI(fkEntrega) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterKPI():", fkEntrega);

    var instrucao = `
        SELECT MIN(dht11temperatura) as 'temperaturaminima', MAX(dht11temperatura) as 'temperaturamaxima', MIN(dht11umidade) as 'umidademinima', MAX(dht11umidade) as 'umidademaxima', (SELECT COUNT(*) FROM registro WHERE fkEntrega = ${fkEntrega} and (situacaoTemperatura <> 'I' or situacaoUmidade <> 'I')) as 'qtdalertas' FROM registro WHERE fkEntrega = ${fkEntrega} GROUP BY fkEntrega; 
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    obterDados,
    obterAlertas,
    obterKPI
}