const request = require('supertest')
const app = require('../src/app')

// expectativas sempre começam pelo res.status

// teste bãsico: realizar uma requisição de /users esperando uma lista como resposta
test('Deve listar todos os usuários', () => {
  return request(app).get('/users')
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(1)
      expect(res.body[0]).toHaveProperty('name', 'Jemima Luz')
    })
})