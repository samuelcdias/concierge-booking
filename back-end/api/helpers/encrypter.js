const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
  const encrypter = (password) => {
      const salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(password, salt)
  }

  return { encrypter }
}