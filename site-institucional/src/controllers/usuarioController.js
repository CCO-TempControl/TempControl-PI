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
    senha = sha512(senha);
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


function cadastrarUsuario(request, response) {
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
    senha = sha512(senha);
    usuarioModel.cadastrarUsuario(nome, email, senha, tipoUsuario,admin,cliente).then(
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
    senha = sha512(senha);
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


function alterarSenha(request, response) {
  let senhaAntiga = request.body.senhaAntiga;
  let idUsuario = request.body.idUsuario;
  let senhaUsuario = request.body.senhaNova;
  usuarioModel.buscarPorIdUsuario(idUsuario).then(function (resultado) {
    console.log(`\nResultados encontrados: ${resultado.length}`);
    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

    if (resultado.length == 0) {
      response.status(403).send("idUsuario inválido");
    } 
    if(resultado[0].senhaUsuario == sha512(senhaAntiga)) {
      senhaUsuario = sha512(senhaUsuario);
      usuarioModel.atualizarSenha(idUsuario, senhaUsuario).then(setTimeout(() =>{
        usuarioModel.buscarPorIdUsuario(idUsuario).then(function (resultado) {
          console.log(`\nResultados encontrados: ${resultado.length}`);
          console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
    
          if (resultado.length == 0) {
            response.status(403).send("idUsuario inválido");
          } else {
            response.send(resultado);
          }
        }).catch(function (erro) {
          console.log(erro);
          console.log("\nHouve um erro ao realizar a busca de usuários! Erro: ", erro.sqlMessage);
          response.status(500).json(erro.sqlMessage);
        })
      },1000));

    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("\nHouve um erro ao realizar a busca de usuários! Erro: ", erro.sqlMessage);
    response.status(500).json(erro.sqlMessage);
  });
  

}

function alterarDados(request, response) {
  let idUsuario = request.body.idUsuario;
  let nomeUsuario = request.body.nomeUsuario;
  let emailUsuario = request.body.emailUsuario;
  
  usuarioModel.atualizar(idUsuario, nomeUsuario, emailUsuario).then(setTimeout(() =>{
    usuarioModel.buscarPorIdUsuario(idUsuario).then(function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

      if (resultado.length == 0) {
        response.status(403).send("idUsuario inválido");
      } else {
        response.send(resultado);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("\nHouve um erro ao realizar a busca de usuários! Erro: ", erro.sqlMessage);
      response.status(500).json(erro.sqlMessage);
    })
  },1000));
}


function listarPorCliente(request, response) {
  let idCliente = request.params.idCliente;

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
  cadastrarUsuario,
  entrar,
  listarPorCliente,
  alterarSenha,
  alterarDados
}