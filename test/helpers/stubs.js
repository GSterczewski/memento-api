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


        }),
        updateOne: (moment) => new Promise((resolve, reject) => {
            for (let i = 0; i < moments.length; i++) {
                if (moments[i].id === moment.id) {
                    moments[i] = moment

                    resolve({
                        success: true,
                        result: moment.id
                    })
                }
            }


        }),
        findAll: (owner) => new Promise((resolve, reject) => {
            console.log(owner)
            let result = moments.filter(moment => moment.owner === owner)
            resolve({
                success: true,
                result
            })
        }),
        findOne: (momentID) => new Promise((resolve, reject) => {
            let result = moments.filter(moment => moment.id === momentID)[0]
            resolve({
                success: true,
                result
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
/*
const stubValidator = () => ({
    isNameValid: (name) => true,
    isDateValid: (date) => true,
    isIdValid: (id) => true,
    isIconValid: (icon) => true,
    isTagsValid: (tags) => true,
    isSourceValid: (source) => true,
    isOwnerValid: (owner) => true,

})
*/
const stubValidator = () => ({
    isLength: () => true,
    isDate: () => true,
    isUUIDv4: () => true,
    isArray: () => true,
    sanitize: str => str
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
    //sanitize: stubSanitize,
    IDGenerator: stubIDGenerator(),
    momentsDB: stubDB(),
    makeSource: stubMakeSource
}
module.exports = stubs