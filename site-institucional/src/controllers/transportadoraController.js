var clienteModel = require('../models/clienteModel');
var usuarioModel = require('../models/usuarioModel');

function cadastrar(request, response) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = request.body.nomeServer;
  var cnpj = request.body.cnpjServer;
  var email = request.body.emailServer;
  var telefone = request.body.telefoneServer;
  var senha = request.body.senhaServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    response.status(400).send("Seu nome está undefined!");
  } else if (cnpj == undefined) {
    response.status(400).send("Seu CNPJ está undefined!");
  } else if (email == undefined) {
    response.status(400).send("Seu email está undefined!");
  } else if (telefone == undefined) {
    response.status(400).send("Seu telefone está undefined!");
  } else if (senha == undefined) {
    response.status(400).send("Sua senha está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo transportadoraModel.js
    clienteModel.cadastrar(nome, cnpj, telefone, 'T').then(
      function (resultado) {
        var idTransportadora = resultado.insertId;

        usuarioModel.cadastrar(idTransportadora, `Admin ${nome}`, email, senha, 'admin t', null)
          .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            
            response.status(500).json(erro.sqlMessage);
          });

        response.json(resultado);
      }
    ).catch(function (erro) {
      console.log(erro);
      console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
      );
      
      response.status(500).json(erro.sqlMessage);
    });
  }
}

module.exports = {
  cadastrar
}
