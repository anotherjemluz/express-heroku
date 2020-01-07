const app = require('express')()
const consign = require('consign')

// cwd => especifica o diretorio padrao para o consign
// verbose false => omite a inicialização do consign
consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .into(app)

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