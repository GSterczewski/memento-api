const {
    URLS,
    ErrorTypes
} = require("../config")
module.exports = (req, res, next) => {
    let authenticated = false
    if (authenticated) {
        next()
    } else {
        next(ErrorTypes.auth)
    }

}