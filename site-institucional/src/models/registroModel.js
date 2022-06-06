var database = require('../database/config');

function obterDados(fkEntrega, ordenar = false, limite = 10) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDados():", fkEntrega, ordenar, limite);

    var instrucao = `
        SELECT fkEntrega, idRegistro, dht11temperatura, dht11umidade, horario, situacaoTemperatura, situacaoUmidade FROM registro WHERE registro.fkEntrega = ${fkEntrega} 
    `;
    if (ordenar == true) {
        instrucao += `ORDER BY horario DESC`;
    }
    instrucao += ` LIMIT ${limite};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterAlertas(fkCliente, tipoDado,tipoCliente) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterAlertas():", fkCliente, tipoDado, tipoCliente);

    var instrucao;

    if (tipoDado == 'mes') {
        instrucao = `SELECT COUNT(*) as 'quantidadeRegistro', 
        (select COUNT(*) from registro r2  join entrega e1 on idEntrega = fkEntrega 
        and (r2.situacaoTemperatura <> 'I' or r2.situacaoUmidade <> 'I') 
        join sensor on idSensor = fkSensor and e1.idEntrega  = e2.idEntrega) as 
        'quantidadeAlerta', MONTHNAME(horario) as 'mes' FROM registro r1 join entrega e2 on idEntrega = fkEntrega join sensor on idSensor = fkSensor`; 
        
      if (tipoCliente == 'F') {
        instrucao += ` AND fkFarmaceutica = ${fkCliente} `;
    } else {
        instrucao += ` AND e2.fkTransportadora = ${fkCliente} `;
    }
    instrucao +=` GROUP BY MONTHNAME(horario) order by horario desc;`;
    


    } else if (tipoDado == 'nomeDia') {
        instrucao = `SELECT COUNT(situacaoTemperatura) as 'quantidadeRegistro', (select count(*) from registro r2 where (r2.situacaoTemperatura <> 'I' or r2.situacaoUmidade <> 'I') and r2.fkEntrega = r1.fkEntrega group by fkEntrega) as 'quantidadeAlerta', DAYNAME(horario) as 'nomeDia' FROM registro r1 join entrega on fkEntrega = idEntrega join Sensor on fkSensor = idSensor`;
        
        if (tipoCliente == 'F') {
            instrucao += ` AND fkFarmaceutica = ${fkCliente} `;
        } else {
            instrucao += ` AND entrega.fkTransportadora = ${fkCliente} `;
        }
        instrucao +=` AND MONTH(horario) in (${new Date().getMonth()}, ${new Date().getMonth() + 1 }) GROUP BY DAYNAME(horario);`;


    } else if (tipoDado == 'dia') {
        instrucao = `SELECT COUNT(situacaoTemperatura) as 'quantidadeRegistro', (select count(*) from registro r2 where (r2.situacaoTemperatura <> 'I' or r2.situacaoUmidade <> 'I') and r2.fkEntrega = r1.fkEntrega group by fkEntrega) as 'quantidadeAlerta', DAY(horario) as 'dia', MONTH(horario) as 'mes' FROM registro r1 JOIN entrega on fkEntrega = idEntrega JOIN Sensor on fkSensor = idSensor`;

        if(tipoCliente == 'F'){
            instrucao += ` AND sensor.fkFarmaceutica = ${fkCliente} `;
        }
        else{
            instrucao += ` AND entrega.fkTransportadora = ${fkCliente} `;
        }
        instrucao +=` GROUP BY DAY(horario) order by horario desc;`;
        
    } else if (tipoDado == 'tempo') {
        instrucao = `SELECT COUNT(situacaoTemperatura) as 'quantidadeRegistro', HOUR(horario) as 'tempo' FROM registro r1 join entrega on fkEntrega = idEntrega join Sensor on fkSensor = idSensor `;

        if(tipoCliente == 'F'){
            instrucao += ` AND sensor.fkFarmaceutica = ${fkCliente} `;
        }
        else{
            instrucao += ` AND entrega.fkTransportadora = ${fkCliente} `;
        }
        instrucao +=` GROUP BY HOUR(horario) order by horario desc;`;

    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterAlertasTempo(fkCliente, tipoCliente) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterAlertasTempo():", fkCliente, tipoCliente);

    var instrucao;

    

        instrucao = `select count(*) as 'quantidadeAlerta', Hour(horario) as 'tempo' from registro r2  
        join entrega on fkEntrega = idEntrega join Sensor on fkSensor = idSensor `;

        if(tipoCliente == 'F'){
            instrucao += ` AND sensor.fkFarmaceutica = ${fkCliente} `;
        }
        else{
            instrucao += ` AND entrega.fkTransportadora = ${fkCliente} `;
        }
        instrucao +=`where (r2.situacaoTemperatura <> 'I' or r2.situacaoUmidade <> 'I') group by HOUR(horario) order by horario desc;`;


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

function obterKPIEstrategico(fkFarmaceutica, tipoCliente) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterKPIEstrategico(): ", fkFarmaceutica);

    var instrucao = `
    select (select count(*) from registro where situacaoTemperatura <> 'I' and fkEntrega = e1.idEntrega) as 'qtdAlertaTemperatura',(select count(*) from registro where situacaoUmidade <> 'I' and fkEntrega = e1.idEntrega) as 'qtdAlertaUmidade', count(*) as 'qtdAlertasTotal' from entrega e1 join registro on (situacaoTemperatura <> 'I' or situacaoUmidade <> 'I') and fkEntrega = idEntrega join sensor on idSensor = fkSensor
    `;

    if(tipoCliente == 'F'){
        instrucao += ` and sensor.fkFarmaceutica = ${fkFarmaceutica};`;
    }
    else{
        instrucao += ` and e1.fkTransportadora = ${fkFarmaceutica};`;
    }
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterTransportadorasAlertas(fkFarmaceutica) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterTransportadorasAlertas(): ", fkFarmaceutica);
    
    var instrucao = `
        select 
            nomeCliente,
            (SELECT COUNT(idEntrega) FROM entrega WHERE aprovada = 'S' AND horaChegada IS NOT NULL AND fkTransportadora = idCliente) as 'qtdEntregas',
            (SELECT COUNT(idRegistro) FROM registro INNER JOIN entrega ON idEntrega = fkEntrega WHERE idCliente = fkTransportadora AND (situacaoTemperatura <> 'I' OR situacaoUmidade <> 'I')) as 'qtdAlerta'
        FROM cliente
        WHERE tipoCliente = 'T'
        ORDER BY qtdAlerta ASC, qtdEntregas DESC;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);    

}

function monitorarEntregas(fkCliente, tipoCliente) {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function monitorarEntregas():", fkCliente, tipoCliente)

    var instrucao = `
        SELECT 
            e.idEntrega, 
            (SELECT dht11temperatura FROM registro INNER JOIN entrega ON idEntrega = fkEntrega ORDER BY horario DESC LIMIT 1) 
            as 'temperaturaAtual', 
            (SELECT dht11umidade FROM registro INNER JOIN entrega ON idEntrega = fkEntrega ORDER BY horario DESC LIMIT 1) 
            as 'umidadeAtual',
            (SELECT situacaoTemperatura FROM registro INNER JOIN entrega ON idEntrega = fkEntrega ORDER BY horario DESC LIMIT 1)
            as 'situacaoTemperatura', 
            (SELECT situacaoUmidade FROM registro INNER JOIN entrega ON idEntrega = fkEntrega ORDER BY horario DESC LIMIT 1)
            as 'situacaoUmidade'
        FROM entrega e 
        INNER JOIN sensor s ON s.idSensor = e.fkSensor 
        INNER JOIN registro r ON r.fkEntrega = e.idEntrega 
        WHERE e.horaSaida IS NOT NULL AND e.horaChegada IS NULL
    `;

    if (tipoCliente == 'F') {
        instrucao += ` AND s.fkFarmaceutica = ${fkCliente} `;
    } else {
        instrucao += ` AND e.fkTransportadora = ${fkCliente} `;
    }

    instrucao += ` GROUP BY e.idEntrega;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);        
}

function situacaoRegistro(fkCliente, tipoCliente) {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function situacaoRegistro():", fkCliente, tipoCliente)

    var instrucao = `SELECT registro.situacaoTemperatura, registro.situacaoUmidade  FROM registro INNER JOIN entrega ON registro.fkEntrega = entrega.idEntrega INNER JOIN sensor ON sensor.idSensor = entrega.fkSensor 
    WHERE entrega.horaSaida IS NOT NULL AND entrega.horaChegada IS NULL`;

      if (tipoCliente == 'F') {
        instrucao += ` AND entrega.fkFarmaceutica = ${fkCliente} `;
    } else {
        instrucao += ` AND entrega.fkTransportadora = ${fkCliente} `;
    }

    instrucao += `ORDER BY idRegistro DESC LIMIT 1;`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);        
}


module.exports = {
    obterDados,
    obterAlertas,
    obterKPI,
    obterKPIEstrategico,
    obterTransportadorasAlertas,
    monitorarEntregas,
    situacaoRegistro,
    obterAlertasTempo
}