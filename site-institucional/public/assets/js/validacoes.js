function validarEmail(email) {
  var resultado = 'OK';

  if (email == undefined) {
    resultado = 'Email está indefinido';
  } else if (email == '') {
    resultado = 'Email é obrigatório';
  } else if (email.indexOf('@') <= 0 || email.indexOf('.com') <= 2) {
    resultado = 'Email está em formato inválido';
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
  } else if (cnpj.length != 14) {
    resultado = 'CNPJ deve ter 14 caracteres';
  } else if ((cnpj[2] != '.') || (cnpj[6] != '.') || (cnpj[10] != '/') || (cnpj[15] != '-')) { // 87.608.614/0001-39 
    resultado = 'CNPJ inválido';
  }

  return resultado;
}