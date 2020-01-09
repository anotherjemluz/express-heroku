/* 
  FUNÇÕES DE ROTAS (para uso no módulo de rotas):
  - findAll:  get /users
  - create: post /users
*/

const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
  const getAll = () => {
    return app.db('users').select(['id', 'name', 'mail'])
  }

  const getOne = (filter = {}) => {
    return app.db('users').where(filter).first()
  }

  const getPassHash = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }

  const save = async (user) => {
    if (!user.name) return { error: 'Nome é um campo obrigatório.' }
    if (!user.mail) return { error: 'Email é um campo obrigatório.' }
    if (!user.password) return { error: 'Senha é um campo obrigatório.' }

    const userDB = await getOne({ mail: user.mail })
    if (userDB) return { error: 'Email já cadastrado.' }

    const newUser = { ...user }
    newUser.password = getPassHash(user.password)

    return app.db('users').insert(newUser, ['id', 'name', 'mail'])
  }

  return { getAll, getOne, save }
}