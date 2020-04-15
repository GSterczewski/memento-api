const {
    URLS,
    ErrorTypes
} = require("../config")
module.exports = (req, res, next) => {
    let authenticated = true
    if (authenticated) {
        next()
    } else {
        next(ErrorTypes.auth)
    }

}