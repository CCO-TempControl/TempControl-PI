var usuarioModel = require('../models/usuarioModel');

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
        console.log(resultado);
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

function editar(request, response) {
  var id = request.params.idUsuario;

  var nome = request.body.nomeServer;
  var cnpj = request.body.cnpjServer;
  var email = request.body.emailServer;
  var telefone = request.body.telefoneServer;
  var senha = request.body.senhaServer;

  if (id < 1000 || id == undefined) {
    response.status(400).send("Id inválido!");
  } else if (nome == undefined) {
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
    usuarioModel.editar(id, nome, email, senha, cnpj, telefone).then(function (resposta) {
      if (resposta.affectedRows < 1) {
        response.status(404).send('Houve um erro ao atualizar os dados')
      } else if (resposta.affectedRows > 1) {
        response.status(500).send('Houve um erro ao atualizar os dados')
      } else {
        usuarioModel.buscarPorId(id).then(function (usuario) {
          console.log(usuario);
          response.json(usuario[0]);
        }).catch(function (erro) {
          console.log(erro);
          console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
          response.status(500).json(erro.sqlMessage);
        })
      }

    }).catch(function (erro) {
      console.log(erro);
      console.log(
          "\nHouve um erro ao realizar o atualizar! Erro: ",
          erro.sqlMessage
      );
      
      response.status(500).json(erro.sqlMessage);
    })
  }
}

module.exports = {
  entrar
}