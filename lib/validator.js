const {
    isUUID,
    isLength,
    trim,
    escape
} = require("validator")

function validator({
    isUUID,
    isLength,
    trim,
    escape
    //isDate
}) {

    //const _isString = input => isString(input)
    const _toString = input => '' + input

    const _isLength = (input, {
        min = 1,
        max = 100
    }) => isLength(_toString(input), {
        min,
        max
    })
    const _sanitize = input => escape(trim(_toString(input)))
    const _isUUIDv4 = input => isUUID(input, 4)
    const _isDate = input => !isNaN(Date.parse(_toString(input)))
    return {
        sanitize: _sanitize,
        isLength: _isLength,
        isUUIDv4: _isUUIDv4,
        isDate: _isDate

    }
}
module.exports = validator({
    isUUID,
    isLength,
    trim,
    escape
})