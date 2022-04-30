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

  var posicaoPontoDominio = email.indexOf('.')

  if (
    email.indexOf('@') <= 0 
    || (
      posicaoPontoDominio <= 2 
      && (email.length - 1) <= posicaoPontoDominio
    )
  ) {
    resultado = 'Email está em formato inválido';
    return resultado;
  }

  return resultado;
}