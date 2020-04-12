module.exports = ({
    isIP
}) => ({
    ip,
    client,
    referrer
} = {}) => {
    if (!ip) {
        throw new Error("Moment source must contain ip")
    }
    if (!isIP(ip)) {
        throw new Error("Moment source must contain valid ip")

    }
    return Object.freeze({
        ip,
        client,
        referrer
    })
}