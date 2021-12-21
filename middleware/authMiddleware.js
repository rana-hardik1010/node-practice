var jwt = require('jsonwebtoken')

module.exports = function (req,res,next) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        var token = req.headers.authorization.split(" ")[1];
    } 
    if(!token){
        res.status(401).json({msg:"Authorization Denied"})
    }else{
        try{
            var decoded = jwt.verify(token,'jwtSecretToken')
            req.userId = decoded.userId  //set req.userId for Controller
            next();
        }catch(err){
            res.status(401).json({msg:'Invalid Token'})
        }
    }
}