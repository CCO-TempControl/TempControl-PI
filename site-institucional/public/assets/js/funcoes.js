function signOut() {
  sessionStorage.clear();
  window.location.replace('../../sign-in.html');
}

function verificarAutorizacao(tipoUsuario) {
  var stringUsuario = sessionStorage.USUARIO;

  if (stringUsuario == undefined) {
    window.location.replace('../../sign-in.html');
    return;
  }

  var usuario = JSON.parse(stringUsuario);

  if (usuario.tipoUsuario != tipoUsuario) {
    window.location.replace(`../${usuario.tipoUsuario}/index.html`);
    return;
  }

  return;
}