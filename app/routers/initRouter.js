const path = require('path')
const fs = require('fs')

const initRouter = app => {
    const routerPath = path.join(__dirname)
    const files = fs.readdirSync(routerPath)
    for (let file of files) {
        if (file === 'initRouter.js') { continue }
        const router = require(`${routerPath}/${file}`)
        app
            .use(router.routes())
            .use(router.allowedMethods())
    }
}

module.exports = initRouter 