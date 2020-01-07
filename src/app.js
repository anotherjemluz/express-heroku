const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// criação de rota genérica
app.get('/', (req, res) => {
  res.status(200).send()
})

// criação de rotas:
// 1. get /users
// 1. post /users
app.get('/users', (req, res) => {
  const users = [
    { name: 'Jemima Luz', mail: 'jemima@mail.com' },
  ]
  res.status(200).json(users)
})

app.post('/users', (req, res) => {
  res.status(201).json(req.body)
})

// exportando o objeto app
module.exports = app