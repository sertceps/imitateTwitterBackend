const jwt = require('koa-jwt')

class AuthMid {
    auth = jwt({ secret: 'secretKey' })
}

module.exports = new AuthMid()