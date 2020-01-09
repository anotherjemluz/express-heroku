const request = require('supertest')
const app = require('../../src/app')

const MAIN_ROUTE = '/users'

const name = 'Jemima Luz'
const mail = `${Date.now()}@mail.com`
const password = '123'

// expectativas sempre começam pelo res.status

test('Deve listar todos os usuários', () => {
  return request(app).get(MAIN_ROUTE)
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.length).toBeGreaterThan(0)
    })
}) // 1: realizar um GET no /users esperando: status 200 e uma lista como resposta

test('Deve inserir usuário', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name, mail, password })
    .then(res => {
      expect(res.status).toBe(201)
      expect(res.body.name).toBe('Jemima Luz')
      expect(res.body).not.toHaveProperty('password')
    })
}) // 2: realizar um POST no /users enviando um objeto com .send() esperando: status 201 de inserção

test('Deve armazenar senha criptografada', async () => {
  const res = await request(app).post(MAIN_ROUTE)
    .send({ name, mail: `${Date.now()}@mail.com`, password })
  expect(res.status).toBe(201)

  const { id } = res.body
  const userDB = await app.services.user.getOne({ id })
  expect(userDB.password).not.toBeUndefined()
  expect(userDB.password).not.toBe('123')
}) // 3: realizar um POST no /users enviando um objeto com .send() esperando: status 201 de inserção. Fazer uma seleção no banco com o id da requisição anterior esperando: que haja uma senha e que ela não seja igual ao valor da requisição anterior

for (let i = 0; i < 3; i++) {
  const user = { name, mail: 'naoexiste@mail.com', password }
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

test('Não deve inserir usuário com email axistente', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name, mail, password })
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Email já cadastrado.')
    })
}) // 7: realizar um POST no /users enviando um objeto com .send() com email já presente no banco, esperando: status 400 e uma mensagem de erro
