const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');
const sql = require('mssql');

const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;
const HABILITAR_OPERACAO_INSERIR = true;

// escolha deixar a linha 'desenvolvimento' descomentada se quiser conectar seu arduino ao banco de dados local, MySQL Workbench
const AMBIENTE = 'desenvolvimento';

// escolha deixar a linha 'producao' descomentada se quiser conectar seu arduino ao banco de dados remoto, SQL Server
// const AMBIENTE = 'producao';

const serial = async (
    valoresDht11Umidade,
    valoresDht11Temperatura,
    valoresLuminosidade,
    valoresLm35Temperatura,
    valoresChave
) => {
    let poolBancoDados = ''

    if (AMBIENTE == 'desenvolvimento') {
        poolBancoDados = mysql.createPool(
            {
                // CREDENCIAIS DO BANCO LOCAL - MYSQL WORKBENCH
                host: 'localhost',
                user: 'root',
                password: 'Ruaadele210',
                database: 'dbTempControl'
            }
        ).promise();
    } else if (AMBIENTE == 'producao') {

        console.log('Projeto rodando inserindo dados em nuvem. Configure as credenciais abaixo.')

    } else {
        throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
    }


    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        const valores = data.split(';');
        const sensor = parseInt(valores[0]);
        const dht11Umidade = parseFloat(valores[1]);
        const dht11Temperatura = parseFloat(valores[2]);
        const luminosidade = parseFloat(valores[3]);
        const lm35Temperatura = parseFloat(valores[4]);
        const chave = parseInt(valores[5]);

        valoresDht11Umidade.push(dht11Umidade);
        valoresDht11Temperatura.push(dht11Temperatura);
        valoresLuminosidade.push(luminosidade);
        valoresLm35Temperatura.push(lm35Temperatura);
        valoresChave.push(chave);

        if (HABILITAR_OPERACAO_INSERIR) {

            if (AMBIENTE == 'producao') {

                // Este insert irá inserir os dados na tabela "medida" -> altere se necessário
                // Este insert irá inserir dados de fk_aquario id=1 >> você deve ter o aquario de id 1 cadastrado.
                sqlquery = `INSERT INTO medida (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario) VALUES (${dht11Umidade}, ${dht11Temperatura}, ${luminosidade}, ${lm35Temperatura}, ${chave}, CURRENT_TIMESTAMP, 1)`;

                // CREDENCIAIS DO BANCO REMOTO - SQL SERVER
                const connStr = "Server=servidor-acquatec.database.windows.net;Database=bd-acquatec;User Id=usuarioParaAPIArduino_datawriter;Password=#Gf_senhaParaAPI;";

                function inserirComando(conn, sqlquery) {
                    conn.query(sqlquery);
                    console.log("valores inseridos no banco: ", dht11Umidade + ", " + dht11Temperatura + ", " + luminosidade + ", " + lm35Temperatura + ", " + chave)
                }

                sql.connect(connStr)
                    .then(conn => inserirComando(conn, sqlquery))
                    .catch(err => console.log("erro! " + err));

            } else if (AMBIENTE == 'desenvolvimento') {
                if (isNaN(sensor)) {
                    console.log("Sensor não Encontrado");
                    return;
                }
                /* A horaChegada na entrega precisa ser nula! */
                var resultado = await poolBancoDados.query(`SELECT e.idEntrega, MAX(m.tempMin) as 'minTemperatura', MIN(m.tempMax) as 'maxTemperatura', MAX(m.umidMin) as 'minUmidade', MIN(m.umidMax) as 'maxUmidade' FROM entrega e INNER JOIN lote l ON l.fkEntrega = e.idEntrega INNER JOIN medicamento m ON m.idMedicamento = l.fkMedicamento WHERE e.fkSensor = ${sensor} AND e.horaSaida IS NOT NULL AND e.horaChegada IS NULL GROUP BY e.idEntrega ORDER BY e.horaSaida DESC LIMIT 1;`);
                
                var dadosSelect = resultado[0][0];
                
                if (dadosSelect == undefined) {
                    console.log("Problema ao encontrar a entrega");
                    return;
                }

                console.log(dadosSelect);

                var minTemp = parseFloat(dadosSelect.minTemperatura);
                var maxTemp = parseFloat(dadosSelect.maxTemperatura);

                var medianaTemp = (minTemp + maxTemp) / 2;
                var q1Temp = (minTemp + medianaTemp) / 2;
                var q3Temp = (maxTemp + medianaTemp) / 2;

                var situacaoTemperatura = 'I'

                if (
                    dht11Temperatura <= minTemp 
                    || dht11Temperatura >= maxTemp
                ) {
                    situacaoTemperatura = 'C';

                } else if (
                    dht11Temperatura <= q1Temp 
                    || dht11Temperatura >= q3Temp
                ) {
                    situacaoTemperatura = 'A';

                }

                var minUmid = parseFloat(dadosSelect.minUmidade);
                var maxUmid = parseFloat(dadosSelect.maxUmidade);

                var medianaUmid = (minUmid + maxUmid) / 2;
                var q1Umid = (minUmid + medianaUmid) / 2;
                var q3Umid = (maxUmid + medianaUmid) / 2;

                var situacaoUmidade = 'I'

                if (
                    dht11Umidade <= minUmid 
                    || dht11Umidade >= maxUmid
                ) {
                    situacaoUmidade = 'C';

                } else if (
                    dht11Umidade <= q1Umid 
                    || dht11Umidade >= q3Umid
                ) {
                    situacaoUmidade = 'A';

                }

                var insert = `
                    INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (${isNaN(dht11Temperatura) ? null : dht11Temperatura}, ${isNaN(dht11Umidade) ? null : dht11Umidade}, ${isNaN(luminosidade) ? null : luminosidade}, ${isNaN(lm35Temperatura) ? null : lm35Temperatura}, ${isNaN(chave) ? null : chave}, ${isNaN(dht11Temperatura) ? 'C' : `'${situacaoTemperatura}'`}, ${isNaN(dht11Umidade) ? 'C' : `'${situacaoUmidade}'`}, now(), ${dadosSelect.idEntrega});
                `;

                // Este insert irá inserir os dados na tabela "medida" -> altere se necessário
                // Este insert irá inserir dados de fk_aquario id=1 >> você deve ter o aquario de id 1 cadastrado.
                await poolBancoDados.execute(insert);
                console.log("Insert no banco: ", insert);

            } else {
                throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
            }

        }

    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

const servidor = (
    valoresDht11Umidade,
    valoresDht11Temperatura,
    valoresLuminosidade,
    valoresLm35Temperatura,
    valoresChave
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresDht11Umidade);
    });
    app.get('/sensores/dht11/temperatura', (_, response) => {
        return response.json(valoresDht11Temperatura);
    });
    app.get('/sensores/luminosidade', (_, response) => {
        return response.json(valoresLuminosidade);
    });
    app.get('/sensores/lm35/temperatura', (_, response) => {
        return response.json(valoresLm35Temperatura);
    });
    app.get('/sensores/chave', (_, response) => {
        return response.json(valoresChave);
    });
}

(async () => {
    const valoresDht11Umidade = [];
    const valoresDht11Temperatura = [];
    const valoresLuminosidade = [];
    const valoresLm35Temperatura = [];
    const valoresChave = [];
    await serial(
        valoresDht11Umidade,
        valoresDht11Temperatura,
        valoresLuminosidade,
        valoresLm35Temperatura,
        valoresChave
    );
    servidor(
        valoresDht11Umidade,
        valoresDht11Temperatura,
        valoresLuminosidade,
        valoresLm35Temperatura,
        valoresChave
    );
})();
