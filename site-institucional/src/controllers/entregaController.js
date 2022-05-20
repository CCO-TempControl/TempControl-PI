var entregaModel = require('../models/entregaModel');
var enderecoModel = require('../models/enderecoModel');
var loteModel = require('../models/loteModel');
var sensorModel = require('../models/sensorModel');

function solicitar(request, response) {
    var origem = request.body.origemServer;
    var destino = request.body.destinoServer;
    var carregamento = request.body.carregamentoServer;
    var dataEntrega = request.body.dataEntregaServer;
    var idTransportadora = request.body.idTransportadoraServer;
    var idSensor = request.body.idSensorServer;
    var idCliente = request.body.idClienteServer;

    if (origem == undefined) {
        response.status(400).send("Origem está undefined!");
    } else if (destino == undefined) {
        response.status(400).send("Destino está undefined!");
    } else if (carregamento == undefined) {
        response.status(400).send("Carregamento está undefined!");
    } else if (dataEntrega == undefined) {
        response.status(400).send("Data de Entrega está undefined!");
    } else if (idTransportadora == undefined) {
        response.status(400).send("idTransportadora está undefined!");
    } else if (idSensor == undefined) {
        response.status(400).send("idSensor está undefined!");
    } else if (idCliente == undefined) {
        response.status(400).send("idCliente está undefined!");
    } else {
        entregaModel.cadastrar(dataEntrega, idCliente, idSensor, idTransportadora).then(
            function (resultado) {
                var idEntrega = resultado.insertId;

                enderecoModel.inserir(
                    idEntrega, 
                    1, 
                    origem.endereco, 
                    origem.bairro, 
                    origem.cidade, 
                    origem.uf, 
                    origem.numero, 
                    origem.cep
                ).catch(function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                    response.status(500).json(erro.sqlMessage);
                })

                enderecoModel.inserir(
                    idEntrega, 
                    2, 
                    destino.endereco, 
                    destino.bairro, 
                    destino.cidade, 
                    destino.uf, 
                    destino.numero, 
                    destino.cep
                ).catch(function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                    response.status(500).json(erro.sqlMessage);
                });

                for (var index = 0; index < carregamento.length; index++) {
                    var lote = carregamento[index];
                    

                    loteModel.inserir(lote.medicamento.idMedicamento, idEntrega, lote.qtd)
                        .catch(function (erro) {
                            console.log(erro);
                            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                            response.status(500).json(erro.sqlMessage);
                        });
                }

                sensorModel.atualizar(idCliente, idSensor, idTransportadora)
                    .catch(function (erro) {
                        console.log(erro);
                        console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                        response.status(500).json(erro.sqlMessage);
                    });

                response.json(resultado);
            }
        ).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        })
    }
}

module.exports = {
    solicitar
}
