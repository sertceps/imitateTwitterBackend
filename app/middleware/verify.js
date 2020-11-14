class Verify {
    jwtVerify = (ctx, next) => {

        await next()
    }

}

module.exports = new Verify()