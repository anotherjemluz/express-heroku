/*
  CREDENCIAIS DO BANCO 
  - test: banco de desenvolvimento
  - production: banco de produção
*/

module.exports = {
  test: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'express-heroku',
      user: 'postgres',
      password: 'admin'
    },
    migrations: {
      diretory: 'src/migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      host: '',
      database: '',
      user: '',
      password: ''
    },
    migrations: {
      diretory: 'src/migrations'
    }
  }
}