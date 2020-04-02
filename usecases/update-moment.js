const buildUpdateMoment = ({
    momentsDB,
    momentBuilder
}) => async (momentID, newProps) => {
    let getRequest = await momentsDB.findOne(momentID)
    if (getRequest.success) {
        let updatedMomentInfo = Object.assign({}, getRequest.result, newProps)
        let updatedMoment = momentBuilder(updatedMomentInfo)

        return momentsDB.updateOne({
            owner: updatedMoment.getOwner(),
            name: updatedMoment.getName(),
            createdOn: updatedMoment.getCreatedOn(),
            modifiedOn: updatedMoment.getModifiedOn(),
            date: updatedMoment.getDate(),
            tags: updatedMoment.getTags(),
            source: updatedMoment.getSource(),
            isFavourite: updatedMoment.getIsFavourite(),
            id: updatedMoment.getID()
        })
    } else {
        return {
            success: false,
            result: getRequest.result
        }
    }
}

module.exports = buildUpdateMoment