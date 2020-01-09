const request = require('supertest')
const app = require('../../src/app')
const MAIN_ROUTE = '/auth'

const name = 'Jemima Luz'
const mail = 'naoexiste@mail.com'
const password = '123'

for (let i = 0; i < 3; i++) {
  const user = { name, mail, password }
  let campo

  if (i === 0) { campo = 'Nome'; delete user.name }
  if (i === 1) { campo = 'Email'; delete user.mail }
  if (i === 2) { campo = 'Senha'; delete user.password }

  test(`Não deve inserir usuário sem ${campo}`, () => {
    return request(app).post(MAIN_ROUTE)
      .send(user)
      .then(res => {
        // console.log(res.body)
        expect(res.status).toBe(400)
        expect(res.body.error).toBe(`${campo} é um campo obrigatório.`)
      })
  })
} // 4, 5 e 6: realizar um POST no /users enviando um objeto com .send() com ausencia de nome, email ou senha esperando: status 400 e mensagem de erro