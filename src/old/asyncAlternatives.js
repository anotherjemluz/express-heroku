const request = require('supertest')
const app = require('../../src/app')

const MAIN_ROUTE = '/users'

// com return
test('Não deve inserir usuário sem senha', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Jemima Luz', mail: 'naoexiste@mail.com' })
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Senha é um campo obrigatório.')
    })
})

// com async await
test('Não deve inserir usuário sem senha', async () => {
  const result = await request(app).post(MAIN_ROUTE)
    .send({ name: 'Jemima Luz', mail: 'naoexiste@mail.com' })
    
  expect(result.status).toBe(400)
  expect(result.body.error).toBe('Senha é um campo obrigatório.')
})

// com done
test('Não deve inserir usuário sem senha', (done) => {
  request(app).post(MAIN_ROUTE)
    .send({ name: 'Jemima Luz', mail: 'naoexiste@mail.com' })
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Senha é um campo obrigatório.')
      done()
    })
    .catch(err => done.fail(err))
})