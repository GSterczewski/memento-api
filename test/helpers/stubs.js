// stub database driver 
const stubDB = () => {

    let moments = []
    return {
        insert: moment => new Promise((resolve, reject) => {
            moments.push(moment)
            resolve({
                success: true,
                result: moment.id
            })
        }),
        deleteOne: (momentID) => new Promise((resolve, reject) => {
            let toDelete = moments.filter(moment => moment.id === momentID)[0]
            moments = moments.filter(moment => moment.id !== momentID)
            resolve({
                success: true,
                result: toDelete.id
            })


        })
    }
}

const stubIDGenerator = () => {
    let counter = 0
    return {
        generate: () => {
            let id = `id-${counter}`
            counter++
            return id
        }
    }
}


const stubSanitize = str => str
const stubValidator = () => ({
    isNameValid: (name) => true,
    isDateValid: (date) => true,
    isIdValid: (id) => true,
    isIconValid: (icon) => true,
    isTagsValid: (tags) => true,
    isSourceValid: (source) => true,
    isOwnerValid: (owner) => true,

})
const stubMakeSource = source => source
/*
const momentBuilder = buildMoment({
    IDGenerator: stubIDGenerator(),
    sanitize: stubSanitize,
    validator: stubValidator(),
    makeSource: stubMakeSource
})
*/
const stubs = {
    validator: stubValidator(),
    sanitize: stubSanitize,
    IDGenerator: stubIDGenerator(),
    momentsDB: stubDB(),
    makeSource: stubMakeSource
}
module.exports = stubs