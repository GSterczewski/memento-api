module.exports = (req, res, next) => {
    let method = req.method
    let url = req.url
    let ip = req.ip
    let agent = req.headers["user-agent"]
    console.log(`${method} : ${url} from ip : ${ip} agent : ${agent}`)
    next()
}