const {
    URLS
} = require("../config")

const authenticateUser = require("./authenticate-user")
const errorHandler = require("./error-handler")
module.exports = [{
    url: URLS.api,
    fn: authenticateUser
}, {
    fn: errorHandler
}]