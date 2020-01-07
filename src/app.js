const app = require('express')()

// criação de rota genérica
app.get('/', (req, res) => {
  res.status(200).send()
})

// criação de rota genérica
app.get('/users', (req, res) => {
  const users = [
    { name: 'Jemima Luz', mail: 'jemima@mail.com' },
  ]
  res.status(200).json(users)
})

// exportando o objeto app
module.exports = app