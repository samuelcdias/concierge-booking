const bcrypt = require('bcrypt')

module.exports = app => {
  const encrypter = (password) => {
      const salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(password, salt)
  }

  const compare = (reqPassword, userPassword) => {
    return bcrypt.compareSync(reqPassword, userPassword)
  }

  return { encrypter, compare }
}