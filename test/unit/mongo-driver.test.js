const test = require("ava");
const client = require("mongodb").MongoClient
const dotenv = require("dotenv").config()

const db = require("../../db/mongo")({
    DBUrl: process.env.LOCAL_DB_URL, //localMongoURL,
    DBName: process.env.LOCAL_DB_NAME,
    mongoClient: client
})

const testCollection = 'test'
let testObject1 = {
    id: 'id-0',
    name: "test object 1",
    age: 20,
    group: 1
}
let testObject2 = {
    id: 'id-1',
    name: "test object 2",
    age: 22,
    group: 1
}
let testObject3 = {
    id: 'id-2',
    name: "test object 3",
    age: 23,
    group: 1
}
test.after(async t => {
    await db.clearCollection(testCollection)
    db.disconnect()
})

test.serial("Insert document to database", async t => {
    let request = await db.insertOne(testCollection, testObject1)
    t.log(request)
    t.assert(request.success === true)
    t.assert(request.result === 'id-0')
})
test.serial("Get one document", async t => {
    let getRequest = await db.findOne(testCollection, {
        name: 'test object 1'
    })
    t.assert(getRequest.success === true)
    t.assert(getRequest.result.age === 20)
})
test.serial("Updates document in database", async t => {
    let updateRequest = await db.updateOne(testCollection, 'id-0', Object.assign({}, testObject1, {
        name: "updated name"
    }))
    t.log(updateRequest)
    t.assert(updateRequest.success === true)
    t.assert(updateRequest.result.id === "id-0")
    t.assert(updateRequest.result.name === "updated name")
})
test.serial("Get documents from database", async t => {
    await db.insertOne(testCollection, testObject2)
    await db.insertOne(testCollection, testObject3)

    let getRequest = await db.find(testCollection, {
        group: 1
    })

    t.assert(getRequest.success === true)
    t.assert(getRequest.result.length === 3)
})
test.serial("Deletes document from database", async t => {
    let deleteRequest = await db.delete(testCollection, {
        id: "id-2"
    })
    let getRequest = await db.find(testCollection, {})
    t.log(deleteRequest)
    t.assert(deleteRequest.success === true)
    t.assert(deleteRequest.result === 'id-2')
    t.assert(getRequest.result.length === 2)
})