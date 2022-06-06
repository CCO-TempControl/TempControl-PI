var database = require('../database/config');

function cadastrar(dataEntrega, fkSensor, fkTransportadora) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", dataEntrega, fkSensor, fkTransportadora);

  var instrucao = `
    INSERT INTO entrega (dataEntrega, aprovada, fkSensor, fkTransportadora) VALUES ('${dataEntrega}', 'P', ${fkSensor}, ${fkTransportadora});
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function renderizarEntrega(idFarmaceutica) {
  var instrucao = `
  SELECT cliente.nomeCliente, endereco.*, MAX(m.tempMin) as 'minTemperatura', MIN(m.tempMax) as 'maxTemperatura', 
  MAX(m.umidMin) as 'minUmidade', MIN(m.umidMax) as 'maxUmidade', e.dataEntrega AS 'DataLimite', e.horaChegada AS 'DataEntrega', e.aprovada, medicamento.nome
   FROM entrega e INNER JOIN lote l ON l.fkEntrega = e.idEntrega INNER JOIN
   medicamento m ON m.idMedicamento = l.fkMedicamento INNER JOIN cliente ON idCliente = fkTransportadora INNER JOIN endereco 
   ON endereco.fkEntrega = idEntrega, medicamento INNER JOIN lote on idMedicamento = fkMedicamento WHERE m.fkFarmaceutica = ${idFarmaceutica} GROUP BY endereco;  
   `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function dadosKPI(idCliente, tipoCliente = 'F') {
  var instrucao = '';
  
  if (tipoCliente == 'F') {
    instrucao = `
      SELECT 
        (SELECT COUNT(idSensor) FROM sensor WHERE fkFarmaceutica =  ${idCliente} AND fkTransportadora IS NULL) 
        as 'qtdSensorLivre',
        (SELECT COUNT(DISTINCT idEntrega) FROM entrega e INNER JOIN sensor s ON e.fkSensor = s.idSensor INNER JOIN registro r ON r.fkEntrega = e.idEntrega WHERE (r.situacaoTemperatura <> 'I' OR r.situacaoUmidade <> 'I') AND e.aprovada = 'S' AND s.fkFarmaceutica =  ${idCliente}) 
        as 'qtdEntregasProblema',
        (SELECT ROUND((COUNT(r.idRegistro) / (SELECT COUNT(e.idEntrega) FROM entrega e WHERE e.horaChegada IS NOT NULL)), 2) FROM registro r INNER JOIN entrega e ON r.fkEntrega = e.idEntrega  WHERE (r.situacaoTemperatura <> 'I' OR r.situacaoUmidade <> 'I'))
        as 'mediaAlertaEntrega',	
        (SELECT COUNT(r.idRegistro) FROM entrega e INNER JOIN registro r ON e.idEntrega = r.fkEntrega INNER JOIN sensor s ON s.idSensor = e.fkSensor WHERE (r.situacaoTemperatura <> 'I' OR r.situacaoUmidade <> 'I') AND e.horaChegada IS NOT NULL AND s.fkFarmaceutica =  ${idCliente} GROUP BY e.idEntrega ORDER BY e.horaChegada DESC LIMIT 1) 
        as 'qtdAlertasUltimaEntrega'
      FROM cliente
      WHERE idCliente = ${idCliente};
    `; 
  } else {
    instrucao = `
      SELECT 
        (SELECT COUNT(idSensor) FROM sensor WHERE fkTransportadora = ${idCliente}) 
        as 'qtdSensorLivre',
        (SELECT COUNT(DISTINCT idEntrega) FROM entrega e INNER JOIN registro r ON r.fkEntrega = e.idEntrega WHERE (r.situacaoTemperatura <> 'I' OR r.situacaoUmidade <> 'I') AND e.aprovada = 'S' AND e.fkTransportadora = ${idCliente}) 
        as 'qtdEntregasProblema',
        (SELECT ROUND((COUNT(r.idRegistro) / (SELECT COUNT(e.idEntrega) FROM entrega e WHERE e.horaChegada IS NOT NULL)), 2) FROM registro r INNER JOIN entrega e ON r.fkEntrega = e.idEntrega  WHERE (r.situacaoTemperatura <> 'I' OR r.situacaoUmidade <> 'I'))
        as 'mediaAlertaEntrega',	
        (SELECT COUNT(r.idRegistro) FROM entrega e INNER JOIN registro r ON e.idEntrega = r.fkEntrega WHERE (r.situacaoTemperatura <> 'I' OR r.situacaoUmidade <> 'I') AND e.horaChegada IS NOT NULL AND e.fkTransportadora = ${idCliente} GROUP BY e.idEntrega ORDER BY e.horaChegada DESC LIMIT 1) 
        as 'qtdAlertasUltimaEntrega'
      FROM cliente
      WHERE idCliente = ${idCliente};
    `;
  }

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function obter(fkFarmaceutica) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obter():", fkFarmaceutica);

  var instrucao = `
    SELECT * FROM entrega;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function operacaoInicial(fkFarmaceutica) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function operacaoInicial():", fkFarmaceutica);

  var instrucao = `
    SELECT e.idEntrega, MAX(m.tempMin) as 'minTemperatura', MIN(m.tempMax) as 'maxTemperatura', MAX(m.umidMin) as 'minUmidade', MIN(m.umidMax) as 'maxUmidade' FROM entrega e INNER JOIN lote l ON l.fkEntrega = e.idEntrega INNER JOIN medicamento m ON m.idMedicamento = l.fkMedicamento WHERE (m.fkFarmaceutica = ${fkFarmaceutica} OR e.fkTransportadora = ${fkFarmaceutica}) AND e.horaSaida IS NOT NULL AND e.horaChegada IS NULL AND e.aprovada = 'S' GROUP BY e.idEntrega;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function operacaoKPI(idEntrega){
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function operacaoKpi():", idEntrega);

  var instrucao = ` 
  SELECT e.idEntrega,MIN(r.dht11temperatura) as 'menorTempAlcancada',MAX(r.dht11temperatura) as'maiorTempAlcancada',MIN(r.dht11umidade) as 'menorUmidAlcancada',MAX(r.dht11umidade) as'maiorUmidAlcancada',(SELECT COUNT(idRegistro) FROM registro r INNER JOIN entrega e ON e.idEntrega = r.fkEntrega WHERE r.situacaoTemperatura <> 'I' OR r.situacaoUmidade <> 'I') as 'qtdAlertas' FROM registro r INNER JOIN entrega e ON r.fkEntrega = e.idEntrega INNER JOIN sensor s ON s.fkTransportadora = e.fkTransportadora INNER JOIN cliente f ON f.idCliente = s.fkFarmaceutica WHERE e.idEntrega = ${idEntrega}; `

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarSolicitacoesTransportadora(idTransportadora) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorIdTransportadora():", idTransportadora);

  var instrucao = `
  SELECT entrega.idEntrega, cliente.nomeCliente, endereco.idEndereco, endereco.endereco, endereco.numero, endereco.cidade, endereco.uf, medicamento.idMedicamento, lote.qtd, medicamento.nome, medicamento.tempMin, medicamento.tempMax, medicamento.umidMin, medicamento.umidMax, DATE_FORMAT(entrega.dataEntrega, '%T %d/%m/%Y') AS 'dataEntrega', entrega.aprovada
        FROM entrega 
	INNER JOIN sensor ON entrega.fkSensor = sensor.idSensor 
	INNER JOIN cliente ON sensor.fkFarmaceutica = idCliente 
	INNER JOIN endereco ON entrega.idEntrega = endereco.fkEntrega 
    INNER JOIN lote ON lote.fkEntrega = entrega.idEntrega 
    INNER JOIN medicamento ON lote.fkMedicamento = medicamento.idMedicamento
    WHERE entrega.aprovada = 'P' AND entrega.fkTransportadora = ${idTransportadora} ORDER BY entrega.dataEntrega DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarEntregasTransportadora(idTransportadora) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorIdTransportadora():", idTransportadora);

  var instrucao = `
  SELECT entrega.idEntrega, entrega.horaSaida, entrega.horaChegada, cliente.nomeCliente, endereco.idEndereco, endereco.endereco, endereco.numero, endereco.cidade, endereco.uf, medicamento.idMedicamento, lote.qtd, medicamento.nome, medicamento.tempMin, medicamento.tempMax, medicamento.umidMin, medicamento.umidMax, DATE_FORMAT(entrega.dataEntrega, '%T %d/%m/%Y') AS 'dataEntrega', entrega.aprovada, veiculo.modelo, veiculo.placa
        FROM entrega 
	INNER JOIN sensor ON entrega.fkSensor = sensor.idSensor 
	INNER JOIN cliente ON sensor.fkFarmaceutica = idCliente 
	INNER JOIN endereco ON entrega.idEntrega = endereco.fkEntrega 
    INNER JOIN lote ON lote.fkEntrega = entrega.idEntrega 
    INNER JOIN medicamento ON lote.fkMedicamento = medicamento.idMedicamento 
    INNER JOIN veiculo ON entrega.fkVeiculo = veiculo.idVeiculo 
    WHERE entrega.aprovada = 'S' AND entrega.fkTransportadora = ${idTransportadora} ORDER BY entrega.dataEntrega DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function obterDados(idEntrega, idCliente){
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDados():", idEntrega, idCliente);

  var instrucao = `
    SELECT *, DATE_FORMAT(entrega.dataEntrega, '%Y-%m-%d-%T') AS 'dataFormatada' FROM entrega 
    INNER JOIN sensor ON entrega.fkSensor = sensor.idSensor
    INNER JOIN cliente ON sensor.fkFarmaceutica = idCliente
    INNER JOIN endereco ON entrega.idEntrega = endereco.fkEntrega
    INNER JOIN lote ON lote.fkEntrega = entrega.idEntrega
    INNER JOIN medicamento ON lote.fkMedicamento = medicamento.idMedicamento
    LEFT JOIN veiculo ON veiculo.idVeiculo = entrega.fkVeiculo 
    WHERE entrega.idEntrega = ${idEntrega} AND entrega.fkTransportadora = ${idCliente};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function aprovarEntrega(idEntrega, idCliente, idVeiculo){
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function aprovarEntrega():", idEntrega, idCliente);

  var instrucao = `
  UPDATE entrega SET aprovada = 'S', fkVeiculo = ${idVeiculo} WHERE entrega.idEntrega = ${idEntrega} AND entrega.fkTransportadora = ${idCliente};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function negarEntrega(idEntrega, idCliente){
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function negarEntrega():", idEntrega, idCliente);

  var instrucao = `
  UPDATE entrega SET aprovada = 'N' WHERE entrega.idEntrega = ${idEntrega} AND entrega.fkTransportadora = ${idCliente};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function adicionarHorSaida(horarioSaida, idEntrega){
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarHorarios():", horarioSaida, idEntrega);

  var instrucao = `
  UPDATE entrega SET horaSaida = '${horarioSaida}' WHERE entrega.idEntrega = ${idEntrega};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function adicionarHorChegada(horarioSaida, horarioChegada, idEntrega){
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarHorarios():", horarioSaida, horarioChegada, idEntrega);

  var instrucao = `
  UPDATE entrega SET horaSaida = '${horarioSaida}', horaChegada = '${horarioChegada}' WHERE entrega.idEntrega = ${idEntrega};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function obterMaiorParceira(idCliente) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterMaiorParceira():", idCliente);

  var instrucao = `
    SELECT 
      f.nomeCliente as 'maiorParceira',
        COUNT(e.idEntrega) as 'qtdEntregas'
    FROM entrega e
    INNER JOIN sensor s ON s.idSensor = e.fkSensor
    INNER JOIN cliente f ON s.fkFarmaceutica = f.idCliente
    WHERE e.fkTransportadora = ${idCliente}
    GROUP BY f.nomeCliente
    ORDER BY qtdEntregas DESC
    LIMIT 1;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function obterMaisAfetada(idCliente) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterMaiorParceira():", idCliente);

  var instrucao = `
    SELECT 
      f.nomeCliente as 'maisAfetada',
        COUNT(idRegistro) as 'qtdAlerta'
    FROM entrega e
    INNER JOIN sensor s ON s.fkTransportadora = e.fkTransportadora
    INNER JOIN cliente f ON f.idCliente = s.fkFarmaceutica
    INNER JOIN registro r ON r.fkEntrega = e.idEntrega 
    WHERE e.fkTransportadora = ${idCliente} AND (r.situacaoTemperatura <> 'I' OR situacaoUmidade <> 'I')
    GROUP BY maisAfetada
    ORDER BY qtdAlerta DESC
    LIMIT 1;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarEntregasFarmaceutica(idCliente) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorIdTransportadora():", idCliente);

  var instrucao = `
    SELECT entrega.idEntrega, entrega.horaSaida, entrega.horaChegada, cliente.nomeCliente, endereco.idEndereco, endereco.endereco, endereco.numero, endereco.cidade, endereco.uf, medicamento.idMedicamento, lote.qtd, medicamento.nome, medicamento.tempMin, medicamento.tempMax, medicamento.umidMin, medicamento.umidMax, DATE_FORMAT(entrega.dataEntrega, '%T %d/%m/%Y') AS 'dataEntrega', entrega.aprovada 
        FROM entrega 
	  INNER JOIN sensor ON entrega.fkSensor = sensor.idSensor 
	  INNER JOIN cliente ON entrega.fkTransportadora = idCliente 
	  INNER JOIN endereco ON entrega.idEntrega = endereco.fkEntrega 
    INNER JOIN lote ON lote.fkEntrega = entrega.idEntrega 
    INNER JOIN medicamento ON lote.fkMedicamento = medicamento.idMedicamento 
    WHERE entrega.aprovada = 'S' AND sensor.fkFarmaceutica = ${idCliente} ORDER BY entrega.dataEntrega DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarSolicitacoesFarmaceutica(idCliente) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarSolicitacoesFarmaceutica():", idCliente);

  var instrucao = `
  SELECT entrega.idEntrega, cliente.nomeCliente, endereco.idEndereco, endereco.endereco, endereco.numero, endereco.cidade, endereco.uf, medicamento.idMedicamento, lote.qtd, medicamento.nome, medicamento.tempMin, medicamento.tempMax, medicamento.umidMin, medicamento.umidMax, DATE_FORMAT(entrega.dataEntrega, '%T %d/%m/%Y') AS 'dataEntrega', entrega.aprovada
      FROM entrega 
    INNER JOIN sensor ON entrega.fkSensor = sensor.idSensor 
    INNER JOIN cliente ON entrega.fkTransportadora = idCliente 
    INNER JOIN endereco ON entrega.idEntrega = endereco.fkEntrega 
    INNER JOIN lote ON lote.fkEntrega = entrega.idEntrega 
    INNER JOIN medicamento ON lote.fkMedicamento = medicamento.idMedicamento
    WHERE entrega.aprovada <> 'S' AND sensor.fkFarmaceutica = ${idCliente} ORDER BY entrega.dataEntrega DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar,
  dadosKPI,
  obter,
  renderizarEntrega,
  operacaoInicial,
  operacaoKPI,
  listarSolicitacoesTransportadora,
  listarEntregasTransportadora,
  obterDados,
  aprovarEntrega,
  negarEntrega,
  adicionarHorSaida,
  adicionarHorChegada,
  obterMaiorParceira,
  obterMaisAfetada,
  listarSolicitacoesFarmaceutica,
  listarEntregasFarmaceutica
}