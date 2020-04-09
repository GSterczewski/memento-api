module.exports = function mongoAdapter(collection, mongoDriver) {
    const _collection = collection
    const _insert = mongoDriver.insertOne.bind(null, _collection)
    const _deleteOne = mongoDriver.delete.bind(null, _collection)
    const _findAll = mongoDriver.find.bind(null, _collection)
    const _updateOne = mongoDriver.updateOne.bind(null, _collection)
    return {
        insert: _insert,
        deleteOne: _deleteOne,
        findAll: _findAll,
        updateOne: _updateOne
    }
}