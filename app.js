module.exports = ({
    server,
    middlewares,
    handlers,

}) => {
    const _server = server
    const _middlewares = middlewares
    const _handlers = handlers
    const _initMiddlewares = () => {
        _middlewares.forEach(({
            url,
            fn
        }) => _server.registerMiddleware({
            url,
            fn
        }))
    }
    const _initHandlers = () => {
        _handlers.forEach(({
            url,
            method,
            fns
        }) => _server.registerHandler({
            method,
            url,
            fns
        }))
    }
    return {
        init: () => {
            _initMiddlewares()
            _initHandlers()
            _server.init()
        }
    }
}