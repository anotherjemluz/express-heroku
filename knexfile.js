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
      diretory:     'src/migrations'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      diretory: __dirname + 'src/migrations'
    }
  }
}