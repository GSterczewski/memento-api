const validator = require("../lib/validator")
const makeSource = require("../lib/source")({
    isIP: validator.isIP
})
const IDGenerator = require("../lib/IDGenerator")

const momentBuilder = require("./moment")({
    validator,
    makeSource,
    IDGenerator
})

module.exports = momentBuilder