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
      console.log(res.body)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('token')
    })
})