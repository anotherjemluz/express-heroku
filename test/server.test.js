const supertest = require('supertest')
const request = supertest('http://localhost:3000')

test('Deve responder na porta 3000', () => {
  // acessar a url http://localhost:3000
  // verificar se a resposta foi 200
  return request.get('/')
    .then(res => expect(res.status).toBe(200))
})