var entregaModel = require('../models/entregaModel');
var enderecoModel = require('../models/enderecoModel');
var loteModel = require('../models/loteModel');
var sensorModel = require('../models/sensorModel');

function dadosKPI(request, response){
    var idCliente = request.params.idCliente;
    var tipoCliente = request.params.tipoCliente;

    if (idCliente == undefined) {
        response.status(400).send('Id do cliente está indefinido');
    } else if (tipoCliente == undefined) {
        response.status(400).send('Tipo Cliente está indefinido');
    } else {
        entregaModel.dadosKPI(idCliente, tipoCliente).then(respota => {
            console.log(respota);

            response.json(respota[0]);
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        })
    }
}

function solicitar(request, response) {
    var origem = request.body.origemServer;
    var destino = request.body.destinoServer;
    var carregamento = request.body.carregamentoServer;
    var dataEntrega = request.body.dataEntregaServer;
    var idTransportadora = request.body.idTransportadoraServer;
    var idSensor = request.body.idSensorServer;

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
    } else {
        entregaModel.cadastrar(dataEntrega, idSensor, idTransportadora).then(
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

                sensorModel.atualizar(idSensor, idTransportadora)
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

function obter(request, response) {
    var fkCliente = request.params.fkCliente;

    if (fkCliente == undefined) {
        response.status(400).send("fkCliente está undefined!");
    } else {
        entregaModel.obter(fkCliente).then(
            function (resultado) {

                response.json(resultado);
            }
        ).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        })
    }
}

function operacaoInicial(request, response) {
    var fkCliente = request.params.fkCliente;

    if (fkCliente == undefined) {
        response.status(400).send("fkCliente está undefined!");
    } else {
        entregaModel.operacaoInicial(fkCliente).then(result => {
            response.json(result);
        }).catch(erro => {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function operacaoKPI(request, response) {
    var idEntrega = request.params.idEntrega;

    if (idEntrega == undefined) {
        response.status(400).send("idEntrega está undefined!");
    } else {
        entregaModel.operacaoKPI(idEntrega).then(result => {
            console.log("Resultado Aqui", result);
            response.json(result);
        }).catch(erro => {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function listarSolicitacoesTransportadora(request, response) {
    var idTransportadora = request.body.idTransportadoraServer;
    console.log(`idTransportadora: ${idTransportadora}`);

    if (idTransportadora == undefined) {
        response.status(400).send("idTransportadora está undefined!");
    } else {
        entregaModel.listarSolicitacoesTransportadora(idTransportadora).then(function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length == 0) {
                response.status(403).send("idTransportadora inválido");
            } else {
                response.send(resultado);
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a busca das solicitações! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function listarEntregasTransportadora(request, response) {
    var idTransportadora = request.body.idTransportadoraServer;
    console.log(`idTransportadora: ${idTransportadora}`);

    if (idTransportadora == undefined) {
        response.status(400).send("idTransportadora está undefined!");
    } else {
        entregaModel.listarEntregasTransportadora(idTransportadora).then(function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length == 0) {
                response.status(403).send("idTransportadora inválido");
            } else {
                response.send(resultado);
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a busca das entregas! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function obterDados(request, response) {
    const idCliente = request.body.idClienteServer;
    const idEntrega = request.body.idEntregaServer;

    if (idCliente == undefined) {
        response.status(400).send("idCliente está undefined!");
    } else if (idEntrega == undefined) {
        response.status(400).send("idEntrega está undefined!");
    } else {
        entregaModel.obterDados(idEntrega, idCliente).then(function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length == 0) {
                response.status(403).send("idEntrega ou idCliente inválido");
            } else {
                response.send(resultado);
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a busca das entregas! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function aprovarEntrega(request, response) {
    const idCliente = request.body.idClienteServer;
    const idEntrega = request.body.idEntregaServer;
    const idVeiculo = request.body.idVeiculoServer;

    if (idCliente == undefined) {
        response.status(400).send("idCliente está undefined!");
    } else if (idEntrega == undefined) {
        response.status(400).send("idEntrega está undefined!");
    } else {
        entregaModel.aprovarEntrega(idEntrega, idCliente, idVeiculo).then(function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length == 0) {
                response.status(403).send("idEntrega ou idCliente inválido");
            } else {
                response.send(resultado);
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao aprovar a entrega! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function negarEntrega(request, response) {
    const idCliente = request.body.idClienteServer;
    const idEntrega = request.body.idEntregaServer;

    if (idCliente == undefined) {
        response.status(400).send("idCliente está undefined!");
    } else if (idEntrega == undefined) {
        response.status(400).send("idEntrega está undefined!");
    } else {
        entregaModel.negarEntrega(idEntrega, idCliente).then(function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length == 0) {
                response.status(403).send("idEntrega ou idCliente inválido");
            } else {
                response.send(resultado);
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao negar a entrega! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function renderizarEntrega(request, response) {
    var fkCliente = request.params.fkCliente;

    if (fkCliente == undefined) {
        response.status(400).send("fkCliente está undefined!");
    } else {
        entregaModel.renderizarEntrega(fkCliente).then(
            function (resultado) {

                response.json(resultado);
            }
        ).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        })
    }
}

function adicionarHorSaida(request, response) {
    var horarioSaida = request.body.horarioSaidaServer;
    var idEntrega = request.body.idEntregaServer;

    if (horarioSaida == undefined) {
        response.status(400).send("horarioSaida está undefined!");
    } else if(idEntrega == undefined){
        response.status(400).send("idEntrega está undefined!");
    } else {
        console.log("INDO PARA O MODEL");
        entregaModel.adicionarHorSaida(horarioSaida, idEntrega).then(resultado => {
            response.json(resultado);
        });
    }
}

function adicionarHorChegada(request, response) {
    var horarioSaida = request.body.horarioSaidaServer;
    var horarioChegada = request.body.horarioChegadaServer;
    var idEntrega = request.body.idEntregaServer;

    if (horarioSaida == undefined) {
        response.status(400).send("horarioSaida está undefined!");
    } else if (horarioChegada == undefined) {
        response.status(400).send("horarioChegada está undefined!");
    } else if(idEntrega == undefined){
        response.status(400).send("idEntrega está undefined!");
    } else {
        entregaModel.adicionarHorChegada(horarioSaida, horarioChegada, idEntrega).then(resultado => {
            response.json(resultado);

        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function estrategicoTKPI(request, response) {
    var idCliente = request.params.idCliente;

    if (idCliente == undefined) {
        response.status(400).send("Id do Cliente está indefinido!");
    } else {
        var objResposta = {}

        entregaModel.obterMaiorParceira(idCliente).then(maiorParceira => {
            if (maiorParceira.length > 0) {
                objResposta.maiorParceira = maiorParceira[0].maiorParceira;
            } else {
                objResposta.maiorParceira = '--';
            }

            entregaModel.obterMaisAfetada(idCliente).then(maisAfetada => {
                if (maisAfetada.length > 0) {
                    objResposta.maisAfetada = maisAfetada[0].maisAfetada;
                } else {
                    objResposta.maisAfetada = '--';
                }

                response.json(objResposta);
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                response.status(500).json(erro.sqlMessage);
            });
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        })
    }
}

module.exports = {
    solicitar,
    dadosKPI,
    obter,
    operacaoInicial,
    operacaoKPI,
    listarSolicitacoesTransportadora,
    listarEntregasTransportadora,
    obterDados,
    aprovarEntrega,
    negarEntrega,
    renderizarEntrega,
    adicionarHorSaida,
    adicionarHorChegada,
    estrategicoTKPI
}
