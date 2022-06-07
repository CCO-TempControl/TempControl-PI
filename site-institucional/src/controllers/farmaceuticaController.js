var clienteModel = require('../models/clienteModel');
var usuarioModel = require('../models/usuarioModel')
var sensorModel = require('../models/sensorModel');
var sha512 = require('js-sha512');

function cadastrar(request, response) {
  var nome = request.body.nomeServer;
  var cnpj = request.body.cnpjServer;
  var qtdSensor = request.body.qtdSensorServer;
  var email = request.body.emailServer;
  var telefone = request.body.telefoneServer;
  var senha = request.body.senhaServer;

  if (nome == undefined) {
    response.status(400).send("Seu nome está undefined!");
  } else if (cnpj == undefined) {
    response.status(400).send("Seu CNPJ está undefined!");
  } else if (qtdSensor == undefined) {
    response.status(400).send("A quantidade de sensores está undefined!");
  } else if (email == undefined) {
    response.status(400).send("Seu email está undefined!");
  } else if (telefone == undefined) {
    response.status(400).send("Seu telefone está undefined!");
  } else if (senha == undefined) {
    response.status(400).send("Sua senha está undefined!");
  } else if (qtdSensor <= 0) {
    response.status(400).send("A quantidade de sensores deve ser maior que 0");
  } else {
    senha = sha512(senha);
    if (process.env.AMBIENTE_PROCESSO == "producao") {
      clienteModel.cadastrar(nome,cnpj,telefone,'F').then(
        function(resultado){
          usuarioModel.cadastrar(cnpj, `Admin ${nome}`, email, senha, 'admin-f', null).then(() => {
            for (var index = 1; index <= qtdSensor; index++) {
              sensorModel.inserir(cnpj);
            }
            response.json(resultado);
        }
      )
    })
  }
    else{
    clienteModel.iniciarTransacao().then( () => {
      clienteModel.cadastrar(nome, cnpj, telefone, 'F').then(
        function (resultado) {
          
          usuarioModel.cadastrar(cnpj, `Admin ${nome}`, email, senha, 'admin-f', null)
            .catch(function (erro) {
              console.log(erro);
              console.log(
                  "\nHouve um erro ao realizar o cadastro! Erro: ",
                  erro.sqlMessage
              );
              clienteModel.cancelarTransacao();
  
              response.status(500).json(erro.sqlMessage);
            }).then(() => {
              for (var index = 1; index <= qtdSensor; index++) {
                sensorModel.inserir(cnpj).catch(function (erro) {
                  console.log(erro);
                  console.log(
                      "\nHouve um erro ao realizar o cadastro! Erro: ",
                      erro.sqlMessage
                  );
                  clienteModel.cancelarTransacao();
                  response.status(500).json(erro.sqlMessage);
                })
              }

              clienteModel.finalizarTransacao().then(_ => {
                response.json(resultado);
              }).catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                clienteModel.cancelarTransacao();
    
                response.status(500).json(erro.sqlMessage);
              })
            }); 
        }
      ).catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
        );
        clienteModel.cancelarTransacao();
        response.status(500).json(erro.sqlMessage);
      });
    });
  }
  }
}

module.exports = {
  cadastrar
}