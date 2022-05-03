var usuario = {};

function signOut() {
  sessionStorage.clear();
  window.location.replace('../../sign-in.html');
}

function obterDadosSession(){
  var json = JSON.parse(sessionStorage.USUARIO);
  return json;
}

function verificarAutorizacao(tipoUsuario) {
  var stringUsuario = sessionStorage.USUARIO;

  if (stringUsuario == undefined) {
    window.location.replace('../../sign-in.html');
    return false;
  }
  var usuario = JSON.parse(stringUsuario);

  if (usuario.tipoUsuario != tipoUsuario) {
    window.location.replace(`../${usuario.tipoUsuario}/index.html`);
    return false;
  }

  return usuario;
}

function setUp(tipoUsuario) {
  usuario = verificarAutorizacao(tipoUsuario);
  spanNome.innerHTML = usuario.nomeUsuario;
}