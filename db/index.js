const client = require("mongodb").MongoClient
const MongoDriver = require("./mongo");

/**
 * @todo move it to .env
 */

const localMongoURL = "mongodb://localhost:27017"
const localDBName = "MementoDB_test_"

const DBDriver = MongoDriver({
    DBUrl: localMongoURL,
    DBName: localDBName,
    mongoClient: client
})


module.exports = DBDriver