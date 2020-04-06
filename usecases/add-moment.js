//const buildMoment = require("../moment/moment")
const buildAddMoment = ({
    momentsDB,
    buildMoment
}) => (momentInfo) => {
    const moment = buildMoment(momentInfo)
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