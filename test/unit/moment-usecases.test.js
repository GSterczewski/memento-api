const test = require("ava");
const stubs = require("../helpers/stubs")

const momentBuilder = require("../../moment/moment")(stubs)
const usecases = require("../../usecases/index")({
    momentsDB: stubs.momentsDB,
    momentBuilder
});


const addMoment = usecases.addMoment
const deleteMoment = usecases.deleteMoment
const getAllMoments = usecases.listAllMoments
const updateMoment = usecases.updateMoment

test.serial("successfully creates new moment and insert it into db", async t => {
    let request = await addMoment({
        name: "Test moment 1",
        date: Date.now(),
        owner: "xyz123",
        sourceData: {
            ip: "::::1",
            client: "mozilla"
        },
        isFavourite: false,
        tags: ["tag1", "tag2"],
        icon: "some icon"
    })
    t.assert(request.success === true)
    t.assert(request.result === "id-0")

})

test.serial("get all moments", async t => {
    let request = await getAllMoments("xyz123")
    t.log(request.result)
    t.assert(request.success === true)
    t.assert(request.result.length === 1)
    t.assert(request.result[0].icon === "some icon")
})
test.serial("updates moment", async t => {
    let updateRequest = await updateMoment("id-0", {
        name: "updatedName"
    })
    let getRequest = await stubs.momentsDB.findOne("id-0")
    t.assert(updateRequest.success === true)
    t.assert(updateRequest.result === "id-0")
    t.assert(getRequest.result.name === "updatedName")
})

test.serial("deletes moment", async t => {
    let request = await deleteMoment("id-0")
    t.assert(request.success === true)
    t.assert(request.result === "id-0")
})