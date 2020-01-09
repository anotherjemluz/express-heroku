const request = require('supertest')
const app = require('../../src/app')

const MAIN_ROUTE = '/auth'

const name = 'Jemima Luz'
const mail = `${Date.now()}@mail.com`
const password = '123'

test('Deve criar usuário via signup', () => {
  return request(app).post('/auth/signup')
    .send({ name, mail, password })
    .then(res => {
      expect(res.status).toBe(201)
      expect(res.body.name).toBe('Jemima Luz')
      expect(res.body).toHaveProperty('mail')
      expect(res.body).not.toHaveProperty('password')
    })
}) // 1: realizar um POST em /auth/signup enviando um objeto com send() esperando: status 201, um nome, email e nenhuma senha

test('Deve receber token ao logar', () => {
  return app.services.user.save({ name, mail: `${Date.now()}@mail.com`, password })
    .then(() => request(app)
      .post(`${MAIN_ROUTE}/signin`)
      .send({ mail, password }))
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('token')
    })
}) // 2: inserir um novo usuario, em seguida realizar um POST no /auth/signin enviando um objeto com send()esperando: status 200 e um token

test('Não deve autenticar usuário com senha errada', () => {
  return app.services.user.save({ name, mail: `${Date.now()}@mail.com`, password })
    .then(() => request(app)
      .post(`${MAIN_ROUTE}/signin`)
      .send({ mail, password: '321' }))
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Usuário ou senha inválido.')
    })
}) // 3: inserir um novo usuario, realizar um POST no /auth/signin enviando um objeto com send()com senha errada esperando: status 400 e mensagem de erro

test('Não deve autenticar usuário com email errado', () => {
  return request(app)
    .post(`${MAIN_ROUTE}/signin`)
    .send({ mail: 'aleatorio@mail.com', password: '321' })
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Usuário ou senha inválido.')
    })
}) // 4: inserir um novo usuario, realizar um POST no /auth/signin enviando um objeto com send()com email errado esperando: status 400 e mensagem de erro

test('Não deve acessar uma rota protegida sem token', () => {
  return request(app).get('/v1/users')
    .then(res => {
      expect(res.status).toBe(401)
    })
}) // 5: realizar um GET em uma rota protegida esperando: status 401 (alguem não autenticado tentando acessar a aplicação)
