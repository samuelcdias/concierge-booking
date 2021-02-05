const jwt = require('jwt-simple')
const { authSecret } = require('../../.env')

module.exports = app => {
  const encode = (payload) => {
      return jwt.encode(payload, authSecret)
  }

  const decode = (token) => {
    return jwt.decode(token, authSecret)
  }

  return { encode, decode }
}