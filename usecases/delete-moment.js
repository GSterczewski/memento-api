const buildDeleteMoment = ({
    momentsDB
}) => (momentID) => {
    return momentsDB.deleteOne(momentID)
}

module.exports = buildDeleteMoment