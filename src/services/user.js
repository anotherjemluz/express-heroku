/* 
  FUNÇÕES DE ROTAS (para uso no módulo de rotas):
  - findAll:  get /users
  - create: post /users
*/

module.exports = app => {
  const get = () => {
    return app.db('users').select()
  }

  const save = (user) => {
    if (!user.name) return { error: 'Nome é um campo obrigatório.' }
    if (!user.mail) return { error: 'Email é um campo obrigatório.' }
    if (!user.password) return { error: 'Senha é um campo obrigatório.' }

    return app.db('users').insert(user, '*')
  }

  return { get, save }
}