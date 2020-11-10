
class UserCtl {
    register = async (ctx) => {
        ctx.body = { "message": "register success" }
    }
    login = async (ctx) => {
        ctx.body = { "message": "login success" }
    }
}

module.exports = new UserCtl()