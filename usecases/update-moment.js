const buildUpdateMoment = ({
    momentsDB,
    momentBuilder
}) => async (momentID, newProps) => {
    let getRequest = await momentsDB.findOne({
        id: momentID
    })
    if (getRequest.success) {
        let props = Object.assign(newProps, {
            modifiedOn: Date.now()
        })
        let updatedMomentInfo = Object.assign({}, getRequest.result, props)

        let updatedMoment = momentBuilder(updatedMomentInfo)
        //console.log(updatedMoment)

        return momentsDB.updateOne(momentID, {
            owner: updatedMoment.getOwner(),
            name: updatedMoment.getName(),
            createdOn: updatedMoment.getCreatedOn(),
            modifiedOn: updatedMoment.getModifiedOn(),
            date: updatedMoment.getDate(),
            tags: updatedMoment.getTags(),
            source: updatedMoment.getSource(),
            isFavourite: updatedMoment.getIsFavourite(),
            icon: updatedMoment.getIcon(),
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