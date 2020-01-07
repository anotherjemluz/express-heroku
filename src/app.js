const app = require('express')()

// criação de rota genérica
app.get('/', (req, res) => {
  res.status(200).send()
})

// exportando o objeto app
module.exports = app