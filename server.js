const {
    Defaults
} = require("./config")

function Server({
    router,
    port = Defaults.port,
    hostname = Defaults.hostname
}) {
    this._middlewares = []
    this._handlers = []
    this._router = router
    this._port = port
    this._hostname = hostname
    this._initMiddlewares = () => {
        this._middlewares.forEach(({
            fn,
            url
        }) => {
            url ? this._router.use(url, fn) : this._router.use(fn)
        })
    }
    this._initHandlers = () => {
        this._handlers.forEach(({
            method,
            url,
            fns
        }) => {
            this._router[method](url, fns)
        })
    }
    this._runServer = () => {
        this._router.listen(this._port, this._hostname, () => {
            console.log(`Server runnning on : http://${this._hostname}:${this._port}`)

        })
    }

}
Server.prototype.registerHandler = function ({
    method,
    url,
    fns
}) {
    this._handlers.push({
        url,
        method,
        fns
    })
}
Server.prototype.registerMiddleware = function ({
    url,
    fn
}) {
    this._middlewares.push({
        url,
        fn
    })
}
Server.prototype.init = function () {
    this._initMiddlewares()
    this._initHandlers()
    this._runServer()
}
module.exports = Server