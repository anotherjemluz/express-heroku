const express = require('express')
const app = express()

// criação de rota genérica
app.get('/', (req, res) => {
  res.status(200).send()
})

// inicialização do servidor express
app.listen(3000, () => {
  console.log('Backend rodando')
})