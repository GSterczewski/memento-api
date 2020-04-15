const client = require("mongodb").MongoClient
const MongoDriver = require("./mongo");
const mongoAdapter = require("./mongo-adapter")


/**
 * @todo move it to .env
 */

const localMongoURL = "mongodb://localhost:27017"
const localDBName = "MementoDB_test_"
//const momentsCollectionName_test_ = "test"

const DBDriver = MongoDriver({
    DBUrl: localMongoURL,
    DBName: localDBName,
    mongoClient: client
})
const momentsCollection = process.env.MODE === 'TEST' ? process.env.MOMENTS_COLLECTION_TEST : process.env.MOMENTS_COLLECTION_DEV;
const momentsDB = mongoAdapter(momentsCollection, DBDriver)
module.exports = momentsDB