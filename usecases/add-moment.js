const buildAddMoment = ({
    momentsDB,
    momentBuilder
}) => (momentInfo) => {
    const moment = momentBuilder(momentInfo)

    return momentsDB.insert({
        owner: moment.getOwner(),
        name: moment.getName(),
        createdOn: moment.getCreatedOn(),
        modifiedOn: moment.getModifiedOn(),
        date: moment.getDate(),
        tags: moment.getTags(),
        source: moment.getSource(),
        isFavourite: moment.getIsFavourite(),
        id: moment.getID(),
        icon: moment.getIcon()
    })
}

module.exports = buildAddMoment