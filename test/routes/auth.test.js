const request = require('supertest')
const app = require('../../src/app')

const MAIN_ROUTE = '/auth'

const name = 'Jemima Luz'
const mail = `${Date.now()}@mail.com`
const password = '123'

test('Deve receber token ao logar', () => {
  return app.services.user.save({ name, mail, password })
    .then(() => request(app)
      .post(`${MAIN_ROUTE}/signin`)
      .send({ mail, password }))
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('token')
    })
})

test('Não deve autenticar usuário com senha errada', () => {
  return app.services.user.save({ name, mail, password })
    .then(() => request(app)
      .post(`${MAIN_ROUTE}/signin`)
      .send({ mail, password: '321' }))
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Usuário ou senha inválido.')
    })
})

test('Não deve autenticar usuário com email errado', () => {
  return request(app)
    .post(`${MAIN_ROUTE}/signin`)
    .send({ mail: 'aleatorio@mail.com', password: '321' })
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Usuário ou senha inválido.')
    })
})