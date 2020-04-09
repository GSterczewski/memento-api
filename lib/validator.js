const {
    isUUID,
    isLength,
    trim,
    escape,
    isIP
} = require("validator")

function validator({
    isUUID,
    isLength,
    trim,
    escape,
    isIP
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
    const _isIPv4 = input => isIP(input, 4)
    const _isIPv6 = input => isIP(input, 6)
    const _isIP = input => _isIPv4(input) || _isIPv6(input)
    const _isArray = input => input instanceof Array
    return {
        sanitize: _sanitize,
        isLength: _isLength,
        isUUIDv4: _isUUIDv4,
        isDate: _isDate,
        isIP: _isIP,
        isArray: _isArray

    }
}
module.exports = validator({
    isUUID,
    isLength,
    trim,
    escape,
    isIP
})