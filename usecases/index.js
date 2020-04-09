module.exports = ({
    momentsDB,
    momentBuilder
}) => ({
    addMoment: require("./add-moment")({
        momentsDB,
        momentBuilder
    }),
    deleteMoment: require("./delete-moment")({
        momentsDB
    }),
    listAllMoments: require('./get-all-moments')({
        momentsDB
    }),
    updateMoment: require("./update-moment")({
        momentsDB,
        momentBuilder
    })

})