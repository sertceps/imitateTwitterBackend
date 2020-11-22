const Joi = require('joi')

// user controller
const register = Joi.object({
    username: Joi.string(),
    userid: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().required(),

})
const login = Joi.object({
    userid: Joi.string().required(),
    password: Joi.string().required()
})
const id = Joi.string().required().length(24)
const page = Joi.string().pattern(new RegExp('^[0-9]*$'))
// tweet controller
const content = Joi.object({
    content: {
        text: Joi.string(),
        images: Joi.array(),
        video: Joi.string(),
        retweet: Joi.string().length(24)
    }
})


module.exports = {
    registerValidator: async (ctx, next) => {
        await register.validateAsync(ctx.request.body)
        await next()
    },
    loginValidator: async (ctx, next) => {
        await login.validateAsync(ctx.request.body)
        await next()
    },
    idValidator: async (ctx, next) => {
        await id.validateAsync(ctx.params.id)
        await next()
    },
    pageValidator: async (ctx, next) => {
        await page.validateAsync(ctx.query.page)
        await next()
    },
    contentValidator: async (ctx, next) => {
        await content.validateAsync(ctx.request.body)
        await next()
    }

}