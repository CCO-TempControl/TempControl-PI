var usuarioModel = require('../models/usuarioModel');
var sha512 = require('js-sha512');

function cadastrar(request, response) {
  var nome = request.body.nomeServer;
  var email = request.body.emailServer;
  var senha = request.body.senhaServer;
  var tipoUsuario = request.body.tipoUsuarioServer;
  var cliente = request.body.clienteServer;
  var admin = request.body.adminServer;

  if (nome == undefined) {
    response.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    response.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    response.status(400).send("Sua senha está undefined!");
  } else if (tipoUsuario == undefined) {
    response.status(400).send("Seu tipo de usuário está undefined!");
  } else if (cliente == undefined) {
    response.status(400).send("Cliente está undefined!");
  } else if (admin == undefined) {
    response.status(400).send("Admin está undefined!");
  } else {
    usuarioModel.cadastrar(cliente, nome, email, senha, tipoUsuario, admin).then(
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

function entrar(request, response) {
  var email = request.body.emailServer;
  var senha = request.body.senhaServer;

  if (email == undefined) {
    response.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    response.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel.entrar(email, senha).then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

      if (resultado.length == 1) {
        console.log(resultado[0]);
        response.json(resultado[0]);
      } else if (resultado.length == 0) {
        response.status(403).send("Email e/ou senha inválido(s)");
      } else {
        response.status(403).send("Mais de um usuário com o mesmo login e senha!");
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
      response.status(500).json(erro.sqlMessage);
    })
  }
}

function confirmarSenha(request, response) {
  let idUsuario = request.body.idUsuario;
  var senhaUsuario = request.body.senhaUsuario;
  var nomeUsuario = request.body.nomeUsuario;
  var emailUsuario = request.body.emailUsuario;
  var senhaNova = request.body.senhaNovaUsuario;

  if (idUsuario == undefined) {
    response.status(400).send("Seu email está undefined!");
  } else {
    usuarioModel.buscarPorId(idUsuario).then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

      if (resultado.length == 0) {
        response.status(403).send("idUsuario inválido");
        response.json(resultado[0]);
      } else {
        response.send(resultado);
        if (resultado[0].senhaUsuario == sha512(senhaUsuario)) {
          console.log("Senha Correta");

          if (emailUsuario == undefined) {
            response.status(400).send("Seu email está undefined!");
          } else if (senhaNova == undefined) {
            response.status(400).send("Sua senha está indefinida!");
          } else if (senhaNova == undefined) {
            response.status(400).send("Seu nome está indefinido!");
          } else {
            usuarioModel.atualizar(idUsuario, nomeUsuario, emailUsuario, senhaNova);
            
          }
        }
      }
    })
  }
}


function listarPorCliente(request, response) {
  let idCliente = request.body.idClienteServer;

  if (idCliente == undefined) {
    response.status(400).send("Seu email está undefined!");
  } else {
    usuarioModel.buscarPorIdCliente(idCliente).then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

      if (resultado.length == 0) {
        response.status(403).send("idCliente inválido");
      } else {
        response.send(resultado);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("\nHouve um erro ao realizar a busca de usuários! Erro: ", erro.sqlMessage);
      response.status(500).json(erro.sqlMessage);
    })
  }
}

module.exports = {
  cadastrar,
  entrar,
  listarPorCliente,
  confirmarSenha,
}