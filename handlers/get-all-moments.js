module.exports = ({
    listAllMoments
}) => async (req, res, next) => {
    try {
        let userid = req.param.userid
        let getRequest = await listAllMoments(userid)
        if (getRequest.success) {
            res.json({
                success: true,
                result: getRequest.result
            })
        } else {
            res.json({
                success: false,
                reason: getRequest.reason
            })
        }

    } catch (err) {
        next(err)
    }
}