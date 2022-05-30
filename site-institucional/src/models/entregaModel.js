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
  SELECT cliente.nomeCliente, endereco.*,	 MAX(m.tempMin) as 'minTemperatura', MIN(m.tempMax) as 'maxTemperatura', 
  MAX(m.umidMin) as 'minUmidade', MIN(m.umidMax) as 'maxUmidade', e.dataEntrega AS 'DataLimite', e.horaChegada AS 'DataEntrega', e.aprovada, medicamento.nome
   FROM entrega e INNER JOIN lote l ON l.fkEntrega = e.idEntrega INNER JOIN
   medicamento m ON m.idMedicamento = l.fkMedicamento INNER JOIN cliente ON idCliente = fkTransportadora INNER JOIN endereco 
   ON endereco.fkEntrega = idEntrega, medicamento INNER JOIN lote on idMedicamento = fkMedicamento WHERE m.fkFarmaceutica = ${idFarmaceutica} GROUP BY e.idEntrega;
  `;

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

function operacaoInicial(fkCliente) {
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function operacaoInicial():", fkFarmaceutica);

  var instrucao = `
    SELECT e.idEntrega, MAX(m.tempMin) as 'minTemperatura', MIN(m.tempMax) as 'maxTemperatura', MAX(m.umidMin) as 'minUmidade', MIN(m.umidMax) as 'maxUmidade' FROM entrega e INNER JOIN lote l ON l.fkEntrega = e.idEntrega INNER JOIN medicamento m ON m.idMedicamento = l.fkMedicamento WHERE m.fkFarmaceutica = ${fkCliente} GROUP BY e.idEntrega;
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
  SELECT entrega.idEntrega, cliente.nomeCliente, endereco.endereco, endereco.numero, endereco.cidade, endereco.uf, lote.qtd, medicamento.nome, medicamento.tempMin, medicamento.tempMax, medicamento.umidMin, medicamento.umidMax, DATE_FORMAT(entrega.dataEntrega, '%Y-%m-%d-%T') AS 'dataEntrega', entrega.aprovada
        FROM entrega 
	INNER JOIN sensor ON entrega.fkSensor = sensor.idSensor 
	INNER JOIN cliente ON sensor.fkFarmaceutica = idCliente 
	INNER JOIN endereco ON entrega.idEntrega = endereco.fkEntrega 
    INNER JOIN lote ON lote.fkEntrega = entrega.idEntrega 
    INNER JOIN medicamento ON lote.fkMedicamento = medicamento.idMedicamento
    WHERE entrega.aprovada = 'P' AND entrega.fkTransportadora = ${idTransportadora};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function obterDados(idEntrega, idCliente){
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDados():", idEntrega, idCliente);

  var instrucao = `
  SELECT * FROM entrega 
	INNER JOIN sensor ON entrega.fkSensor = sensor.idSensor 
	INNER JOIN cliente ON sensor.fkFarmaceutica = idCliente 
	INNER JOIN endereco ON entrega.idEntrega = endereco.fkEntrega 
    INNER JOIN lote ON lote.fkEntrega = entrega.idEntrega 
    INNER JOIN medicamento ON lote.fkMedicamento = medicamento.idMedicamento
    WHERE entrega.idEntrega = ${idEntrega} AND entrega.fkTransportadora = ${idCliente};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function aprovarEntrega(idEntrega, idCliente){
  console.log("ACESSEI O ENTREGA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function aprovarEntrega():", idEntrega, idCliente);

  var instrucao = `
  UPDATE entrega SET aprovada = 'S' WHERE entrega.idEntrega = ${idEntrega} AND entrega.fkTransportadora = ${idCliente};
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

module.exports = {
  cadastrar,
  obter,
  renderizarEntrega,
  operacaoInicial,
  operacaoKPI,
  listarSolicitacoesTransportadora,
  obterDados,
  aprovarEntrega,
  negarEntrega
}