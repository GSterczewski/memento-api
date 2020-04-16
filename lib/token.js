const jwt = require("jsonwebtoken");
const IDGenerator = require("./IDGenerator")
const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7

const refreshTokenOptions = {
    expiresIn: WEEK,
    secret: process.env.JWT_SECRET
}

const accessTokenOptions = {
    expiresIn: 15 * MINUTE,
    admin: false,
    secret: process.env.JWT_SECRET
}

const createAccessToken = ({
    userid,
    admin = accessTokenOptions.admin,
    expiresIn = accessTokenOptions.expiresIn,
    secret = accessTokenOptions.secret
}) => new Promise((resolve, reject) => {
    try {
        let token = jwt.sign({
            userid,
            admin,
            expiresIn
        }, secret)
        resolve({
            success: true,
            token
        })
    } catch (err) {
        reject({
            success: false,
            reason: err
        })
    }
})


const createRefreshToken = ({
    expiresIn = refreshTokenOptions.expiresIn,
    secret = refreshTokenOptions.secret
}) => new Promise((resolve, reject) => {
    try {
        let token = jwt.sign({
            refreshID: IDGenerator(),
            expiresIn
        }, secret)
        resolve({
            success: true,
            token
        })
    } catch (err) {
        reject({
            success: false,
            reason: err
        })
    }
})

const verifyToken = ({
    token,
    secret = jwtOptions.secret
}) => new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, token) => {
        if (err) {
            reject({
                success: false,
                reason: err
            })
        }
        resolve({
            success: true,
            token
        })
    })
})


module.exports = {
    createAccessToken,
    createRefreshToken,
    verifyToken
}