const {
    Errors,
    ErrorTypes
} = require("../config")
module.exports = (err, req, res, next) => {
    if (err === ErrorTypes.auth) {
        res.statusCode = Errors.auth.code
        res.send(Errors.auth.message)
    } else {
        res.statusCode = 404
        res.send(err)
    }

}