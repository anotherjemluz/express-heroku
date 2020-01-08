const request = require('supertest')
const app = require('../../src/app')

const MAIN_ROUTE = '/users'

// você pode manter os testes independentes, mas em user.test.js foi usado uma versão dinamica para fazer os 3 testes com um for()
test.skip('Não deve inserir usuário sem nome', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ mail: 'naoexiste@mail.com', password: '123' })
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Nome é um campo obrigatório.')
    })
}) 

test.skip('Não deve inserir usuário sem email', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Jemima Luz', password: '123' })
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Email é um campo obrigatório.')
    })
}) // 4

test.skip('Não deve inserir usuário sem senha', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Jemima Luz', mail: 'naoexiste@mail.com' })
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Senha é um campo obrigatório.')
    })
}) // 5