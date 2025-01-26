const jwt  = require('jsonwebtoken')
function checkAuthentication(req,res,next){
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; 
const answer = jwt.decode(token)
req.user = answer
return next()
}

function  restrictTo(req,res,next){
        if(!req.user) return res.redirect('/login')
        next();
    }


module.exports={
    checkAuthentication,restrictTo
}