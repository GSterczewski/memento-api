const {
    URLS,
    ErrorTypes
} = require("../config")
const tokens = require("../lib/token");
const verifyAuthHeader = (req) => {
    if (!req.headers.authorization) {
        return false
    }
    let headers = req.headers.authorization.split(" ")
    if (headers[0] !== 'Bearer') {
        return false
    }
    return true
}
const verifyToken = req => tokens.verifyToken({
    token: req.headers.authorization.split(" ")[1]
})
module.exports = async (req, res, next) => {
    //check for auth header
    try {

        if (!(verifyAuthHeader(req) && await verifyToken(req))) {
            return next(ErrorTypes.auth)
        }
    } catch (err) {

        return next(ErrorTypes.auth)
    }
    next()
}