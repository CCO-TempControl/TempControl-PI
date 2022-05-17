function validarEmail(email) {
  var resultado = 'OK';

  if (email == undefined) {
    resultado = 'Email está indefinido';
    
  } else if (email == '') {
    resultado = 'Email é obrigatório';

  } else {
    var posicaoAt = email.indexOf('@');

    if (posicaoAt <= 0) {
      resultado = 'Email em formato inválido';

    } else {
      var posicaoDot = email.indexOf('.', posicaoAt)
 
      if (posicaoDot <= 2) {
        resultado = 'Email em formato inválido';

      } else {
        var resto = email.slice(posicaoDot, -1);

        if (resto.length < 1) {
          resultado = 'Email em formato inválido'
        }
      }
    }
  }

  return resultado;
}

function validarTelefone(telefone) {
  var resultado = 'OK';

  if (telefone == undefined) {
    resultado = 'Telefone está indefinido';
  } else if (telefone == '') {
    resultado = 'Telefone é obrigatório';
  } else if (telefone.startsWith('9') == false || telefone.indexOf('-') != 5) {
    resultado = 'Telefone em formate inválido';
  }

  return resultado;
}

function validarSenha(senha) {
  var resultado = 'OK';

  if (senha == undefined) {
    resultado = 'Senha está indefinido';
  } else if (senha == '') {
    resultado = 'Senha é obrigatório';
  } else if (senha.length < 8) {
    resultado = 'Senha deve ter no minímo 8 caracteres';
  }

  return resultado;
}

function validarCNPJ(cnpj) {
  var resultado = 'OK';

  if (cnpj == undefined) {
    resultado = 'CNPJ está indefinido';
  } else if (cnpj == '') {
    resultado = 'CNPJ é obrigatório';
  } else if (cnpj.length != 18) {
    resultado = 'CNPJ deve ter 14 caracteres';
  } else if ((cnpj[2] != '.') || (cnpj[6] != '.') || (cnpj[10] != '/') || (cnpj[15] != '-')) { // 87.608.614/0001-39 
    resultado = 'CNPJ inválido';
  }

  return resultado;
}