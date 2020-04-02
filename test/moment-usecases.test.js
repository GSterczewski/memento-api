const test = require("ava");
const buildAddMoment = require("../usecases/add-moment")
const buildDeleteMoment = require("../usecases/delete-moment")
const buildMoment = require("../moment/moment")
const stubs = require("./helpers/stubs")


const momentBuilder = buildMoment(stubs)
const addMoment = buildAddMoment({
    momentsDB: stubs.momentsDB,
    buildMoment: momentBuilder
})
const deleteMoment = buildDeleteMoment(stubs)
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

test.serial("deletes moment", async t => {
    let request = await deleteMoment("id-0")
    t.assert(request.success === true)
    t.assert(request.result === "id-0")
})
test.todo("updates moment")
test.todo("list moments")