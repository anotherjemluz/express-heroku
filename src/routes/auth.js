const express = require('express')

const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')
const secret = 'Segredo!'

module.exports = app => {
  const signin = (req, res, next) => {
    app.services.user.getOne({ mail: req.body.mail })
      .then(user => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            id: user.id,
            name: user.name,
            mail: user.mail
          }

          const token = jwt.encode(payload, secret)
          res.status(200).json({ token })
        }
      }).catch(err => next(err))
  }

  return { signin }
}