const jwt = require("jsonwebtoken")
const privateKey = 'bhupendra'

const generateToken = (id)=>{
    return jwt.sign({id}, privateKey, {expiresIn:'24h'})
}

const verifyToken = (req, res, next)=>{
    const auth = req.headers.cookie
    if(!auth){
        return res.send("cookies are expired")
    }
    console.log();
    const token = auth.split("=")[1]
    const decode = jwt.verify(token, privateKey)
    console.log(decode)
    req.id = decode.id
    next()
}

module.exports = {generateToken, verifyToken}   