const {
    URLS
} = require("../config")

const authenticateUser = require("./authenticate-user")
const errorHandler = require("./error-handler")
const bodyParser = require("body-parser");
const logger = require("./logger");
module.exports = [{
    url: URLS.api,
    fn: authenticateUser
}, {
    fn: errorHandler
}, {
    fn: logger
}, {
    fn: bodyParser.urlencoded({
        extended: true
    })
}, {
    fn: bodyParser.json()
}]