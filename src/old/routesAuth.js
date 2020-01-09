const ValidationError = require('../errors/validationError')

const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')
const secret = 'Segredo!'

module.exports = app => {
  const signin = (req, res, next) => {
    app.services.user.getOne({ mail: req.body.mail })
      .then(user => {
        if (!user) throw new ValidationError('Usuário ou senha inválido.')
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            id: user.id,
            name: user.name,
            mail: user.mail
          }

          const token = jwt.encode(payload, secret)
          res.status(200).json({ token })
        } else throw new ValidationError('Usuário ou senha inválido.')
      }).catch(err => next(err))
  }

  return { signin }
}