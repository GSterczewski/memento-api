const Server = require("./server")
const App = require("./app")
const app = App({
    server: new Server({
        router: require("express")()
    }),
    middlewares: require("./middlewares/index"),
    handlers: require("./handlers/index")
})
app.init()