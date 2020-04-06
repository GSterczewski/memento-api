const {
    URLS,
    HTTPMethods
} = require("../config")

const handlers = [{
    url: URLS.home,
    method: HTTPMethods.get,
    fns: [require("./get-home-page")]
}]

module.exports = handlers