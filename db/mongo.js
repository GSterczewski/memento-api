module.exports = function MongoDriver({
    DBUrl,
    DBName,
    mongoClient
}) {

    const _client = new mongoClient(DBUrl, {
        useNewUrlParser: true
    })

    const _createErrorResponse = err => ({
        success: false,
        reason: err
    })
    const _createSuccessResponse = result => ({
        success: true,
        result
    })
    let _db = null

    const _connect = async () => {
        if (_db) {
            return
        }

        try {
            await _client.connect()
            _db = _client.db(DBName)
            console.log("Connecting to mongo")
        } catch (err) {
            console.error(err)

        }
    }


    const _disconnect = async () => {
        _client.close()
        _db = null
    }


    const _insertOne = async (collection, object) => {

        try {
            if (!_db) await _connect();
            //const db = await _connect();
            let insertRequest = await _db.collection(collection)
                .insertOne(object)

            if (insertRequest.insertedCount === 1) {
                return {
                    success: true,
                    result: object.id
                }
            } else {
                return {
                    success: false,
                    reason: insertRequest
                }
            }

        } catch (err) {
            return _createErrorResponse(err)

        }

    }
    const _find = async (collection, query) => {
        try {
            if (!_db) await _connect();
            let findRequest = await _db.collection(collection).find(query).toArray()

            return _createSuccessResponse(findRequest)

        } catch (err) {
            return _createErrorResponse(err)
        }
    }
    const _findOne = async (collection, query) => {
        try {
            if (!_db) await _connect();
            let findRequest = await _db.collection(collection).findOne(query)

            return {
                success: true,
                result: findRequest
            }

        } catch (err) {
            console.error(err)
            return _createErrorResponse(err)

        } //finally {}
    }
    const _updateOne = async (collection, id, updatedObject) => {
        try {

            if (!_db) await _connect();
            let updateRequest = await _db.collection(collection).replaceOne({
                id
            }, updatedObject)

            return {
                success: true,
                result: updatedObject
            }

        } catch (err) {
            console.error(err)
            return _createErrorResponse(err)
        } //finally {}

    }
    const _delete = async (collection, query) => {
        try {
            if (!_db) await _connect();
            let toDelete = await _findOne(collection, query)
            if (toDelete) {
                let deleteRequest = await _db.collection(collection).remove(query)
                return _createSuccessResponse(toDelete.result.id)
            } else {
                return {
                    success: false,
                    reason: "not found"
                }
            }



        } catch (err) {
            return _createErrorResponse(err)

        }
    }


    const _clearCollection = async (collection) => {
        try {
            if (!_db) await _connect();

            await _db.collection(collection).remove()


        } catch (err) {
            console.error(err)

        }
    }

    return {
        insertOne: _insertOne,
        findOne: _findOne,
        find: _find,
        clearCollection: _clearCollection,
        updateOne: _updateOne,
        delete: _delete,
        disconnect: _disconnect
    }
}