const request = require('supertest')
const app = require('../../src/app')

const MAIN_ROUTE = '/users'
// expectativas sempre começam pelo res.status

test('Deve listar todos os usuários', () => {
  return request(app).get(MAIN_ROUTE)
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.length).toBeGreaterThan(0)
    })
}) // 1: realizar um GET no /users esperando: status 200 e uma lista como resposta

test('Deve inserir usuário', () => {
  const mail = `${Date.now()}@mail.com`
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Jemima Luz', mail, password: '123' })
    .then(res => {
      expect(res.status).toBe(201)
      expect(res.body.name).toBe('Jemima Luz')
    })
}) // 2: realizar um POST no /users enviando um objeto com .send() esperando: status 201 de inserção

test('Não deve inserir usuário sem nome', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ mail: 'naoexiste@mail.com', password: '123' })
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Nome é um campo obrigatório.')
    })
}) // 3, 4 e 5: realizar um POST no /users enviando um objeto com .send() com ausenncia de nome, email ou senha esperando: status 400 e mensagem de erro

test('Não deve inserir usuário sem email', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Jemima Luz', password: '123' })
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Email é um campo obrigatório.')
    })
}) // 4

test('Não deve inserir usuário sem senha', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Jemima Luz', mail: 'naoexiste@mail.com' })
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Senha é um campo obrigatório.')
    })
}) // 5