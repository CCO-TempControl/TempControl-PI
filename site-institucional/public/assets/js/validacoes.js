function validarEmail(email) {
  var resultado = 'OK';

  if (email == undefined) {
    resultado = 'Email está indefinido';
    return resultado;
  }

  if (email == '') {
    resultado = 'Email é obrigatório';
    return resultado;
  }

  if (email.indexOf('@') <= 0 || email.indexOf('.com') <= 2) {
    resultado = 'Email está em formato inválido';
    return resultado;
  }

  return resultado;
}

function validarTelefone(telefone) {
  var resultado = 'OK';

  if (telefone == undefined) {
    resultado = 'Telefone está indefinido';
    return resultado;
  }

  if (telefone == '') {
    resultado = 'Telefone é obrigatório';
    return resultado;
  }

  if (telefone.startsWith('9') == false || telefone.indexOf('-') != 5) {
    resultado = 'Telefone em formate inválido';
    return resultado;
  }

  return resultado;
}

function validarSenha(senha) {
  var resultado = 'OK';

  if (senha == undefined) {
    resultado = 'Senha está indefinido';
    return resultado;
  }

  if (senha == '') {
    resultado = 'Senha é obrigatório';
    return resultado;
  }

  if (senha.length < 8) {
    resultado = 'Senha deve ter no minímo 8 caracteres';
    return resultado;
  }

  return resultado;
}

function validarCNPJ(cnpj) {
  var resultado = 'OK';

  if (cnpj == undefined) {
    resultado = 'CNPJ está indefinido';
    return resultado;
  }

  if (cnpj == '') {
    resultado = 'CNPJ é obrigatório';
    return resultado;
  }

  if (cnpj.length != 14) {
    resultado = 'CNPJ deve ter 14 caracteres';
    return resultado;
  }

  return resultado;
}