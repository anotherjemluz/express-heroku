/* 
  FUNÇÕES DE ROTAS (para uso no módulo de rotas):
  - findAll:  get /users
  - create: post /users
*/

module.exports = app => {
  const get = (filter = {}) => {
    return app.db('users').where(filter).select()
  }

  const save = async (user) => {
    if (!user.name) return { error: 'Nome é um campo obrigatório.' }
    if (!user.mail) return { error: 'Email é um campo obrigatório.' }
    if (!user.password) return { error: 'Senha é um campo obrigatório.' }

    const userDB = await get({ mail: user.mail })
    if (userDB && userDB.length > 0) return { error: 'Email já cadastrado.' }

    return app.db('users').insert(user, '*')
  }

  return { get, save }
}