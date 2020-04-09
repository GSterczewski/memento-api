const test = require("ava")
const IDGenerator = require("../../lib/IDGenerator")
const momentBuilder = require("../../moment/index")

test("momentBuilder", t => {
    let momentInfo = {
        owner: IDGenerator(),
        sourceData: {
            ip: '127.0.0.1',
            client: "mozilla",
            referrer: null
        },
        name: "Test moment",
        date: "02-04-2020",
        tags: ["tag1", "tag2"],
        icon: "xD"
    }
    let invalidMomentInfo = {
        owner: IDGenerator(),
        sourceData: {
            ip: '127',
            client: "mozilla",
            referrer: null
        },
        name: "Test moment 2",
        date: "02-04-2020",
        tags: ["tag1", "tag2"],
        icon: "xD"
    }
    let moment = momentBuilder(momentInfo)

    t.assert(moment.getName() === "Test moment")
    t.assert(momentBuilder(invalidMomentInfo) === true)
})