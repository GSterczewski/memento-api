const {
    URLS,
    HTTPMethods
} = require("../config")

const momentBuilder = require("../moment/index");
const momentsDB = require("../db/index");
const usecases = require("../usecases/index")({
    momentsDB,
    momentBuilder
})

const handlers = [{
    url: URLS.home,
    method: HTTPMethods.get,
    fns: [require("./get-home-page")]
}, {
    url: URLS.moments,
    method: HTTPMethods.get,
    fns: [require("./get-all-moments")(usecases)]
}, {
    url: URLS.moments,
    method: HTTPMethods.post,
    fns: [require("./post-moment")(usecases)]
}, {
    url: URLS.moments,
    method: HTTPMethods.update,
    fns: [require("./update-moment")(usecases)]
}, {
    url: URLS.moments,
    method: HTTPMethods.delete,
    fns: [require("./delete-moment")(usecases)]
}]

module.exports = handlers