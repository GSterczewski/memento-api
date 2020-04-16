const test = require("ava");
const jwt = require("../../lib/token");
//const env = require("dotenv").config()

test.serial('creates valid access json web token', async t => {
    let tokenRequest = await jwt.createAccessToken({
        userid: 'user123',
        secret: "testsecret123"
    })
    let verifiedToken = await jwt.verifyToken({
        token: tokenRequest.token,
        secret: "testsecret123"
    })
    t.true(tokenRequest.success)
    t.true(verifiedToken.success)
    t.assert(verifiedToken.token.userid === 'user123')
})

test.serial('creates valid refresh json web token', async t => {
    let refreshTokenRequest = await jwt.createRefreshToken({
        secret: 's123'
    })

    let refreshTokenValidation = await jwt.verifyToken({
        token: refreshTokenRequest.token,
        secret: 's123'
    })

    t.true(refreshTokenRequest.success)
    t.true(refreshTokenValidation.success)
})