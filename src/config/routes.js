/*
  MÒDULO DE ROTAS:
  notação: app.route('nomeDaRota').[metodo](app.pasta.arquivo.funcaoCorrespondente)
*/

module.exports = app => {
  app.route('/auth/signin').post(app.routes.auth.signin)

  app.route('/users')
    .get(app.routes.users.findAll)
    .post(app.routes.users.create)
}