module.exports = ({
    addMoment
}) => async (req, res, next) => {

    try {
        const {
            name,
            date,
            tags,
            icon,
            owner

        } = req.body

        //let owner = req.params.userid
        let ip = req.ip
        let client = req.headers["user-agent"]
        let addRequest = await addMoment({
            name,
            owner,
            date: date,
            tags,
            icon,
            source: {
                ip,
                client
            }
        })

        if (addRequest.success) {
            res.json({
                success: true,
                result: addRequest.result
            })
        } else {
            res.json({
                success: false,
                reason: addRequest.reason
            })
        }
    } catch (err) {

        next(err)
    }

}