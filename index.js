const Server = require("./server")
const express = require("express")
const handlers = require("./handlers/index")
const middlewares = require("./middlewares/index")
const server = new Server({
    router: express()
})

middlewares.forEach(({
    url,
    fn
}) => server.registerMiddleware({
    url,
    fn
}))
handlers.forEach(({
    url,
    method,
    fns
}) => server.registerHandler({
    method,
    url,
    fns
}))

server.init()