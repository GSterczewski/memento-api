const buildGetAllMoments = ({
    momentsDB
}) => (owner) => {
    return momentsDB.findAll(owner)
}


module.exports = buildGetAllMoments