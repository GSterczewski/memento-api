const HTTPMethods = {
    get: "get",
    post: "post",
    update: "put",
    delete: "delete"
}

const URLS = {
    home: "/",
    api: "/api",
    moments: "/api/moments"
}

const Defaults = {
    port: "3000",
    hostname: "127.0.0.1"
}
const Errors = {
    auth: {
        message: "Not authorized",
        code: 401
    }
}
const ErrorTypes = {
    auth: "auth"
}
module.exports = {
    HTTPMethods,
    URLS,
    Defaults,
    Errors,
    ErrorTypes
}