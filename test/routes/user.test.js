const request = require('supertest')
const app = require('../../src/app')

const jwt = require('jwt-simple')
const secret = 'Segredo!'

const MAIN_ROUTE = '/v1/users'

let user
const name = 'Jemima Luz'
const mail = `${Date.now()}@mail.com`
const password = '123'

beforeAll(async () => {
  const res = await app.services.user.save({ name: 'User', mail: `${Date.now()}@mail.com`, password: '123' })
  user = { ...res[0] }
  user.token = jwt.encode(user, secret)
})

// expectativas sempre começam pelo res.status

test('Deve listar todos os usuários', () => {
  return request(app)
    .get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.length).toBeGreaterThan(0)
    })
}) // 1: realizar um GET no /users esperando: status 200 e uma lista como resposta

test('Deve inserir usuário', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ name, mail, password })
    .set('authorization', `bearer ${user.token}`)
    .then(res => {
      expect(res.status).toBe(201)
      expect(res.body.name).toBe('Jemima Luz')
      expect(res.body).not.toHaveProperty('password')
    })
}) // 2: realizar um POST no /users enviando um objeto com .send() esperando: status 201 de inserção

test('Deve armazenar senha criptografada', async () => {
  const res = await request(app)
    .post(MAIN_ROUTE)
    .send({ name, mail: `${Date.now()}@mail.com`, password })
    .set('authorization', `bearer ${user.token}`)

  expect(res.status).toBe(201)

  const { id } = res.body
  const userDB = await app.services.user.getOne({ id })
  expect(userDB.password).not.toBeUndefined()
  expect(userDB.password).not.toBe('123')
}) // 3: realizar um POST no /users enviando um objeto com .send() esperando: status 201 de inserção. Fazer uma seleção no banco com o id da requisição anterior esperando: que haja uma senha e que ela não seja igual ao valor da requisição anterior

test('Não deve inserir usuário sem nome', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ mail, password })
    .set('authorization', `bearer ${user.token}`)
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Nome é um campo obrigatório.')
    })
})

test('Não deve inserir usuário sem email', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ name, password })
    .set('authorization', `bearer ${user.token}`)
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Email é um campo obrigatório.')
    })
})

test('Não deve inserir usuário sem senha', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ name, mail })
    .set('authorization', `bearer ${user.token}`)
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Senha é um campo obrigatório.')
    })
}) // 4, 5 e 6: realizar um POST no /users enviando um objeto com .send() com ausencia de nome, email ou senha esperando: status 400 e mensagem de erro

test('Não deve inserir usuário com email existente', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name, mail, password })
    .set('authorization', `bearer ${user.token}`)
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Email já cadastrado.')
    })
}) // 7: realizar um POST no /users enviando um objeto com .send() com email já presente no banco, esperando: status 400 e uma mensagem de erro
