const dotenv = require("dotenv").config()
const test = require("ava")
const client = require("mongodb").MongoClient

const localMongoURL = process.env.LOCAL_DB_URL;
const localDBName = process.env.LOCAL_DB_NAME;
const mongoDriver = require("../../db/mongo")({
    DBUrl: localMongoURL,
    DBName: localDBName,
    mongoClient: client
})
const momentsDB = require("../../db/mongo-adapter")('test', mongoDriver)
const momentBuilder = require("../../moment/index")
const IDGenerator = require("../../lib/IDGenerator")
const usecases = require("../../usecases/index")({
    momentsDB,
    momentBuilder

})

const testOwner = IDGenerator()
const testID = IDGenerator()
test.after(async t => {
    await mongoDriver.clearCollection('test')
    mongoDriver.disconnect()
})

test.serial('addMoment usecase', async t => {
    let momentInfo = {
        id: testID,
        owner: testOwner,
        source: {
            ip: '127.0.0.1',
            client: "mozilla",
            referrer: null
        },
        name: "Test moment",
        date: "02-04-2020",
        tags: ["tag1", "tag2"],
        icon: "xD"
    }
    let addRequest = await usecases.addMoment(momentInfo)
    t.true(addRequest.success)
    t.assert(addRequest.result === testID)

})
test.serial('listAllMoments usecase', async t => {
    let getRequest = await usecases.listAllMoments(testOwner)
    t.true(getRequest.success)
    t.assert(getRequest.result[0].name === "Test moment")
})
test.serial('updateMoment usecase', async t => {
    let updateRequest = await usecases.updateMoment(testID, {
        name: "Updated moment name",
        date: "03-05-2020"
    })
    let getRequest = await usecases.listAllMoments(testOwner)

    t.true(updateRequest.success)
    t.assert(getRequest.result[0].name === 'Updated moment name')
    t.assert(getRequest.result[0].date === '03-05-2020')
    t.assert(getRequest.result[0].icon === 'xD')

})
test.todo('deleteMoment usecase')