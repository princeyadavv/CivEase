const jwt = require('jsonwebtoken')

const secret = process.env.secret

function createToken(user){
    const payload= {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        role: user.role,
        support:user.support,
        issueRaised:user.issueRaised,
        issueGiven:user.issueGiven
    }
    const token = jwt.sign(payload,secret)
    return token
}

function VerifyUser(token){
    const key = jwt.verify(token,secret)
    return key
}



module.exports={
    createToken,VerifyUser
}
