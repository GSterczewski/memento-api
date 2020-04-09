const test = require("ava")
const mongoDriver = require("../../db/index")
const momentsDB = require("../../db/mongo-adapter")('test', mongoDriver)
const momentBuilder = require("../../moment/index")

const usecases = require("../../usecases/index")({
    momentsDB,
    momentBuilder

})
/*
test.after(async t => {
    await mongoDriver.clearCollection()
})
*/
test.todo('addMoment usecase')
test.todo('deleteMoment usecase')
test.todo('updateMoment usecase')
test.todo('getAllMoments usecase')