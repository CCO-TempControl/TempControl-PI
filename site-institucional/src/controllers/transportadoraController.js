var transportadoraModel = require("../models/transportadoraModel");

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
    transportadoraModel.cadastrar(nome, cnpj, email, telefone, senha).then(function (resultado) {
      response.json(resultado);
    }).catch(function (erro) {
      console.log(erro);
      console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
      );
      
      response.status(500).json(erro.sqlMessage);
    });
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
      
    transportadoraModel.entrar(email, senha).then(function (resultado) {
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
    });
  }

}

module.exports = {
  cadastrar,
  entrar
}
