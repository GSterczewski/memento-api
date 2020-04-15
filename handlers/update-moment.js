module.exports = ({
    updateMoment
}) => async (req, res, next) => {
    try {
        let {
            momentID,
            ...newProps
        } = req.body
        let updateRequest = await updateMoment(momentID, {
            ...newProps
        })
        if (updateRequest.success) {
            res.json({
                success: true,
                result: updateRequest.result
            })
        }
    } catch (err) {
        next(err)
    }
}