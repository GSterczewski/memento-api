module.exports = ({
    deleteMoment
}) => async (req, res, next) => {
    try {
        let momentID = req.body.momentID
        let deleteRequest = await deleteMoment(momentID)
        res.json(deleteRequest)
    } catch (err) {
        next(err)
    }
}