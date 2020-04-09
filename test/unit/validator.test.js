const test = require('ava');
const validator = require("../../lib/validator")
const IDGenerator = require('../../lib/IDGenerator')

test("isLength", t => {
    t.assert(validator.isLength('long enough', {
        min: 1,
        max: 100
    }) === true)

    t.assert(validator.isLength('', {
        min: 1,
        max: 100
    }) === false)
    t.assert(validator.isLength(123, {
        min: 1,
        max: 100
    }) === true)
    t.assert(validator.isLength('too long string', {
        min: 1,
        max: 10
    }) === false)
    t.assert(validator.isLength('too short string', {
        min: 50,
        max: 100
    }) === false)
})
test('isDate', t => {
    t.assert(validator.isDate(new Date()) === true)

    t.assert(validator.isDate('12-04-2020') === true)
    t.assert(validator.isDate(new Date(Date.now())) === true)
    t.assert(validator.isDate('14-14-2020') === false)
})

test('isUUIDv4', t => {
    t.assert(validator.isUUIDv4('123-45-544') === false)
    t.assert(validator.isUUIDv4(IDGenerator()) === true)

})
test('sanitize', t => {
    t.assert(validator.sanitize(' booom ') === 'booom')
    t.assert(validator.sanitize('>') === '&gt;')
    t.log(validator.sanitize('<script>console.log("boom")</script>'))
    t.assert(validator.sanitize('<script>console.log("boom")</script>') === '&lt;script&gt;console.log(&quot;boom&quot;)&lt;&#x2F;script&gt;')
})