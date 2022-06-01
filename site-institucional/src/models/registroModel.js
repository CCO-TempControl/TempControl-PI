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

function obterAlertas(fkCliente, tipoDado) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterAlertas():", fkCliente, tipoDado);

    var instrucao;

    if (tipoDado == 'mes') {
        instrucao = `SELECT COUNT(*) as 'quantidadeRegistro', 
        (select COUNT(*) from registro r2  join entrega e1 on idEntrega = fkEntrega and (r2.situacaoTemperatura <> 'I' or r2.situacaoUmidade <> 'I') join sensor on idSensor = fkSensor and fkFarmaceutica = ${fkCliente} and e1.idEntrega  = e2.idEntrega) as 'quantidadeAlerta', MONTHNAME(horario) as 'mes' FROM registro r1 join entrega e2 on idEntrega = fkEntrega join sensor on idSensor = fkSensor and fkFarmaceutica = ${fkCliente} GROUP BY MONTHNAME(horario) order by horario desc;`;
    } else if (tipoDado == 'nomeDia') {
        instrucao = `SELECT COUNT(situacaoTemperatura) as 'quantidadeRegistro', (select COUNT(*) from registro r2 join entrega on idEntrega = fkEntrega join sensor on idSensor = fkSensor and fkFarmaceutica = ${fkCliente} and (r2.situacaoTemperatura <> 'I' or r2.situacaoUmidade <> 'I')  and r1.idRegistro = r2.idRegistro) as 'quantidadeAlerta', DAYNAME(horario) as 'nomeDia' FROM registro r1 WHERE fkEntrega = ${fkCliente} AND MONTH(horario) = ${new Date().getMonth() + 1} GROUP BY DAYNAME(horario);`;
    } else if (tipoDado == 'dia') {
        instrucao = `SELECT COUNT(situacaoTemperatura) as 'quantidadeRegistro', (select COUNT(*) from registro r2 join entrega on idEntrega = fkEntrega join sensor on idSensor = fkSensor and fkFarmaceutica = ${fkCliente} and (r2.situacaoTemperatura <> 'I' or r2.situacaoUmidade <> 'I')  and r1.idRegistro = r2.idRegistro) as 'quantidadeAlerta', DAY(horario) as 'dia', MONTH(horario) as 'mes' FROM registro r1 WHERE fkEntrega = ${fkCliente} GROUP BY DAY(horario) order by horario desc;`;
    } else if (tipoDado == 'tempo') {
        instrucao = `SELECT COUNT(situacaoTemperatura) as 'quantidadeRegistro', (select COUNT(*) from registro r2 join entrega on idEntrega = fkEntrega join sensor on idSensor = fkSensor and fkFarmaceutica = ${fkCliente} and (r2.situacaoTemperatura <> 'I' or r2.situacaoUmidade <> 'I')  and r1.idRegistro = r2.idRegistro) as 'quantidadeAlerta', HOUR(horario) as 'tempo' FROM registro r1 WHERE fkEntrega = ${fkCliente} GROUP BY HOUR(horario) order by horario desc;;`;

    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterKPI(fkEntrega) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterKPI():", fkEntrega);

    var instrucao = `
        SELECT ROUND(MIN(dht11temperatura), 1) as 'temperaturaminima', ROUND(MAX(dht11temperatura), 1) as 'temperaturamaxima', ROUND(MIN(dht11umidade), 1) as 'umidademinima', ROUND(MAX(dht11umidade), 1) as 'umidademaxima', (SELECT COUNT(*) FROM registro WHERE fkEntrega = ${fkEntrega} and (situacaoTemperatura <> 'I' or situacaoUmidade <> 'I')) as 'qtdalertas' FROM registro WHERE fkEntrega = ${fkEntrega} GROUP BY fkEntrega; 
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterKPIEstrategico(fkFarmaceutica) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterKPIEstrategico(): ", fkFarmaceutica);

    var instrucao = `
    select (select count(*) from registro where situacaoTemperatura <> 'I' and fkEntrega = e1.idEntrega) as 'qtdAlertaTemperatura',(select count(*) from registro where situacaoUmidade <> 'I' and fkEntrega = e1.idEntrega) as 'qtdAlertaUmidade', count(*) as 'qtdAlertasTotal' from entrega e1 join registro on (situacaoTemperatura <> 'I' or situacaoUmidade <> 'I') and fkEntrega = idEntrega join sensor on idSensor = fkSensor and fkFarmaceutica = ${fkFarmaceutica};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterTransportadorasAlertas(fkFarmaceutica) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterTransportadorasAlertas(): ", fkFarmaceutica);
    
    var instrucao = `
        select nomeCliente, count(*) as 'qtdViagensTransporadora', (select count(*) from registro where (situacaoTemperatura <> 'I' or situacaoUmidade <> 'I') and fkEntrega = e1.idEntrega group by fkEntrega) as 'qtdAlertasTransporadora' from entrega e1 join cliente on fkTransportadora = idCliente join sensor on fkSensor = idSensor and sensor.fkFarmaceutica = ${fkFarmaceutica} group by e1.fkTransportadora;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);    

}

module.exports = {
    obterDados,
    obterAlertas,
    obterKPI,
    obterKPIEstrategico,
    obterTransportadorasAlertas
}